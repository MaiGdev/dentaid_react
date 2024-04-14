import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dateFnsLocalizer from "react-big-calendar/lib/localizers/date-fns";
import es from "date-fns/locale/es";
import { useState } from "react";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { useEffect } from "react";
import "./CalendarStyles.css";
import Modal from "../../../components/Home/Modal";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { CssVarsProvider, FormLabel, Input } from "@mui/joy";
import { Controller, useForm } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import { useNavigate, useParams } from "react-router-dom";
import { useSubmitForm } from "../../../hooks/useSubmitForm";
import { toast } from "react-hot-toast";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
/* import dayjs from "dayjs"; */
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DnDCalendar = withDragAndDrop(Calendar);

/* La idea es que el titulo = Cita disponible cambie automaticamente cuando el 
paciente selecione una cita o la cancele a Cita pendiente
*/

const myCalendar = (props) => {
  const navigate = useNavigate();
  const routeParams = useParams();
  const id = routeParams.id;
  const esCrear = !id;

  const currentDate = new Date().getDay();
  /* controlar si el modal está visible o no */
  const [modalStatus, setModalStatus] = useState(false);

  /*  almacenar el titulo */
  const [eventInput, setEventInput] = useState("");
  /* almacenar la fecha de inicio del evento que el usuario ha seleccionado */
  const [startDate, setStartDate] = useState("");
  /* almacenar la fecha de finalización del evento que el usuario ha seleccionado. */
  const [endDate, setEndDate] = useState("");
  //state for on select event
  /* almacenar el ID del evento que el usuario ha seleccionado */
  const [eventId, setEventId] = useState("");

  const [update, setUpdate] = useState(false);

  const [estadoModal1, cambiarEstadoModal1] = useState(false);

  const [horarioNuevo, sethorarioNuevo] = useState({});
  const [horarioActuzalizado, setHorarioActualizado] = useState(null);

  const [selectedDateStart, setSelectedDateStart] = useState(
    dayjs(props.startDate)
  );
  const [selectedDateEnd, setSelectedDateEnd] = useState(dayjs(props.endDate));

  const handleDateStartChange = (newDate) => {
    setSelectedDateStart(newDate);
  };
  const handleDateEndChange = (newDate) => {
    setSelectedDateEnd(newDate);
  };

  const formats = {
    dateFormat: "dd",
    dayFormat: (date, culture, localizer) =>
      localizer.format(date, "EEEE", culture),
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales: { es },
    ...formats,
  });
  moment.locale("es");

  /* modal y valores */

  /* data del horario por cliente */
  const [data, setData] = useState([]);

  const eventos = data.map(
    ({ idHorario, titulo, fechaHoraInicial, fechaHoraFinal }) => ({
      id: idHorario,
      title: titulo,
      start: new Date(fechaHoraInicial),
      end: new Date(fechaHoraFinal),
    })
  );

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:81/dentaid/medico/getHorarioPorMedico/${id}`
      );
      const dataF = await response.json();
      setData(dataF.results);
      console.log(dataF.results);
      /* setData([]); */
    }
    fetchData();
  }, []);

  /* handle al precionar espacio en blanco */
  const handleSlotSelectEvent = (slotInfo) => {
    setEventId("");
    setStartDate(new Date(`${slotInfo.start}`));
    setEndDate(new Date(`${slotInfo.end}`));

    /* Si se selecciona una hora menor a la actual aunque sea el mismo dia va a entrar al if*/
    if (new Date(slotInfo.start) <= new Date()) {
      toast.error(
        "No se puede registrar un horario anterior a la fecha u hora actual",
        {
          duration: 4000,
          position: "top-center",
        }
      );
    } else {
      const overlap = eventos.some(
        (horario) =>
          (slotInfo.start >= horario.start && slotInfo.start < horario.end) ||
          (slotInfo.end > horario.start && slotInfo.end <= horario.end) ||
          (slotInfo.start <= horario.start && slotInfo.end >= horario.end)
      );

      if (overlap) {
        console.log("supersuesto");
        toast.error(
          "El horario seleccionado esta interfiriendo con otro previamente creado",
          {
            duration: 4000,
            position: "top-center",
          }
        );
      } else {
        // Si no hay superposición, agregar el nuevo evento a la lista de eventos
        console.log("no supersuesto");
        cambiarEstadoModal1(!estadoModal1);
        sethorarioNuevo({
          titulo: "Cita disponible",
          inicio: slotInfo.start.toLocaleString("en-US"),
          final: slotInfo.end.toLocaleString("en-US"),
          disponible: 1,
          idMedicoConsulta: id,
        });
      }
    }
  };

  /* handle al precionar un evento */
  const hanldeOnSelectEvent = (e) => {
    setEventId(e.id);
    setEventInput(e.title);
    setStartDate(new Date(`${e.start}`));
    setEndDate(new Date(`${e.end}`));

    setSelectedDateStart(new Date(`${e.start}`));
    setSelectedDateEnd(new Date(`${e.end}`));

    setUpdate(true);
    cambiarEstadoModal1(!estadoModal1);
  };

  /* formulario */
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      titulo: "",
      inicio: "",
      final: "",
      disponible: 1,
      idMedicoConsulta: id,
    },
  });

  //Accion POST o PUT
  const [action, setAction] = useState("POST");
  //Boolean indica el submit
  const [start, setStart] = useState(false);
  const [formData, setDataForm] = useState(null);

  //Enviar los valores al API
  const { responseData, errorData, loadedData } = useSubmitForm({
    endpoint: "horario",
    action,
    formData,
    start,
  });

  //Submit del formulario
  const onSubmit = (DataForm) => {
    try {
      if (!update) {
        setAction("POST");
        setDataForm(horarioNuevo);
        setStart(true);
      } else {
        if (eventId !== "") {
          setHorarioActualizado({
            idHorario: eventId,
            titulo: "Cita disponible",
            inicio: new Date(selectedDateStart).toLocaleString("en-US"),
            final: new Date(selectedDateEnd).toLocaleString("en-US"),
            disponible: 1,
            idMedicoConsulta: id,
          });

          if (horarioActuzalizado != null) {
            console.log(horarioActuzalizado);
            setDataForm(horarioActuzalizado);
            setAction("PUT");
            setStart(true);
          }
        }
      }
    } catch (e) {
      // handle your error
    }
  };

  const onError = (errors, e) => console.log(errors, e);

  useEffect(() => {
    if (responseData != null) {
      toast.success(responseData, {
        duration: 4000,
        position: "top-center",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [responseData, data, esCrear, action]);

  const fechaYHora = new Date("2023-04-11T13:30:00.000Z");

  return (
    <>
      <div>
        <DnDCalendar
          localizer={localizer}
          events={eventos}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: "50px" }}
          defaultView="week"
          onSelectSlot={handleSlotSelectEvent}
          onSelectEvent={hanldeOnSelectEvent}
          selectable
        />

        <Modal
          estado={estadoModal1}
          cambiarEstado={cambiarEstadoModal1}
          titulo="Alerta"
          mostrarHeader={false}
          mostrarOverlay={true}
          calendario={true}
        >
          <>
            <Box>
              {!update && (
                <>
                  <Box style={{ padding: "1.2rem .8rem .5rem 1.4rem" }}>
                    <h2>Crear cita</h2>
                    <hr />
                  </Box>
                  <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                    <Grid item xs={12} sm={5}></Grid>
                    <Grid item xs={12} sm={5} sx={{ padding: "1rem" }}>
                      {/* titulo */}
                      <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                        <Controller
                          name="titulo"
                          control={control}
                          render={({ field }) => (
                            <>
                              <CssVarsProvider>
                                <FormLabel sx={{ marginBottom: ".5rem" }}>
                                  Título
                                </FormLabel>
                                <Input
                                  value={"Cita disponible"}
                                  color="neutral"
                                  id="titulo"
                                  variant="outlined"
                                  label="titulo"
                                  size="md"
                                  disabled
                                />
                              </CssVarsProvider>
                            </>
                          )}
                        />
                      </FormControl>
                      {/* Fecha y hora de inicio */}
                      <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                        <Controller
                          name="inicio"
                          control={control}
                          //field empaquea las propiedades
                          render={({ field }) => (
                            <>
                              <CssVarsProvider>
                                <FormLabel sx={{ marginBottom: ".5rem" }}>
                                  Fecha y hora de inicio
                                </FormLabel>
                                <Input
                                  /* es-CR */
                                  value={startDate.toLocaleString("en-US")}
                                  color="neutral"
                                  id="inicio"
                                  variant="soft"
                                  label="Fecha y hora de inicio"
                                  size="md"
                                  disabled

                                  /* placeholder={startDate.toLocaleString("en-US")} */
                                />
                              </CssVarsProvider>
                            </>
                          )}
                        />
                      </FormControl>
                      {/* Fecha y hora final */}
                      <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                        <Controller
                          name="final"
                          control={control}
                          //field empaquea las propiedades
                          render={({ field }) => (
                            <>
                              <CssVarsProvider>
                                <FormLabel sx={{ marginBottom: ".5rem" }}>
                                  Fecha y hora final
                                </FormLabel>
                                <Input
                                  /* es-CR */
                                  value={endDate.toLocaleString("en-US")}
                                  color="neutral"
                                  id="final"
                                  variant="soft"
                                  label="Fecha y hora final"
                                  size="md"
                                  disabled
                                />
                              </CssVarsProvider>
                            </>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    {/* guardar */}
                    <Grid item xs={12} sm={5}>
                      <Box sx={{ display: "flex", justifyContent: "end" }}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="info"
                          sx={{ m: 1 }}
                        >
                          Guardar
                        </Button>
                      </Box>
                    </Grid>
                  </form>
                </>
              )}
              {eventId && (
                <>
                  <Box style={{ padding: "1.2rem .8rem .5rem 1.4rem" }}>
                    <h2>Modificar cita</h2>
                    <hr />
                  </Box>
                  <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                    <Grid item xs={12} sm={5}></Grid>
                    <Grid item xs={12} sm={5} sx={{ padding: "1rem" }}>
                      {/* titulo */}
                      <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                        <Controller
                          name="titulo"
                          control={control}
                          render={({ field }) => (
                            <>
                              <CssVarsProvider>
                                <FormLabel sx={{ marginBottom: ".5rem" }}>
                                  Título
                                </FormLabel>
                                <Input
                                  {...field}
                                  value={"Cita disponible"}
                                  color="neutral"
                                  id="titulo"
                                  variant="outlined"
                                  label="titulo"
                                  size="md"
                                  disabled
                                />
                              </CssVarsProvider>
                            </>
                          )}
                        />
                      </FormControl>
                      {/* Fecha y hora de inicio */}
                      <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                        <Controller
                          name="inicio"
                          control={control}
                          //field empaquea las propiedades
                          render={({ field }) => (
                            <>
                              <CssVarsProvider>
                                <FormLabel sx={{ marginBottom: ".5rem" }}>
                                  Fecha y hora inicial
                                </FormLabel>
                              </CssVarsProvider>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                  inputFormat="MM/dd/yyyy hh:mm a"
                                  value={dayjs(selectedDateStart)}
                                  onChange={handleDateStartChange}
                                />
                              </LocalizationProvider>
                              {/*                               <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                  inputFormat="MM/dd/yyyy hh:mm a"
                                  value={startDate}
                                  onChange={handleDateChange}
                                />
                              </LocalizationProvider> */}
                            </>
                          )}
                        />
                      </FormControl>
                      {/* Fecha y hora final */}
                      <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                        <Controller
                          name="final"
                          control={control}
                          //field empaquea las propiedades
                          render={({ field }) => (
                            <>
                              <CssVarsProvider>
                                <FormLabel sx={{ marginBottom: ".5rem" }}>
                                  Fecha y hora final
                                </FormLabel>
                              </CssVarsProvider>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                  inputFormat="MM/dd/yyyy hh:mm a"
                                  value={dayjs(selectedDateEnd)}
                                  onChange={handleDateEndChange}
                                />
                              </LocalizationProvider>
                            </>
                          )}
                        />
                      </FormControl>
                    </Grid>

                    {/* guardar */}
                    <Grid item xs={12} sm={5}>
                      <Box sx={{ display: "flex", justifyContent: "end" }}>
                        <Button
                          type=""
                          variant="contained"
                          color="info"
                          sx={{ m: 1 }}
                        >
                          Guardar
                        </Button>
                      </Box>
                    </Grid>
                  </form>
                </>
              )}
            </Box>
          </>
        </Modal>
      </div>
    </>
  );
};

export default myCalendar;
