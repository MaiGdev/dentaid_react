import React, { useContext, useEffect } from "react";
import Dash from "../Dash";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import SelectAlergia from "./SelectAlergia";
import SelectEnfermedad from "./SelectEnfermedad";
import SelectMedicamento from "./SelectMedicamento";
import SelectCirugia from "./SelectCirugia";
import { CssVarsProvider, Input, Textarea } from "@mui/joy";
import FormLabel from "@mui/joy/FormLabel";
import {
  Button,
  Divider,
  MenuItem,
  Select,
  Table,
  TableContainer,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import moment from "moment";
import toast from "react-hot-toast";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { UserContext } from "../../../../context/UserContext";
import { useCallApi } from "../../../../hooks/useCallApi";
import { useSubmitForm } from "../../../../hooks/useSubmitForm";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const Expediente = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState("panel1");
  const { user, decodeToken, autorize } = useContext(UserContext);
  const [userData, setUserData] = useState(decodeToken());

  const { data, error, loaded } = useCallApi({
    endpoint: `expediente/${userData.id}`,
  });

  const [dataAlergia, setDataAlergia] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:81/dentaid/expediente/getAlergiaExpediente/${userData.id}`
      );
      const dataF = await response.json();
      setDataAlergia(dataF);
      if (dataF.results == "No hay registros") {
        setDataAlergia(null);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (dataAlergia != null) {
      console.log(dataAlergia);
    }
  }, [dataAlergia]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [formInput, setFormInput] = useState(false);
  const [expedInput, setExpedInput] = useState(false);

  /* espediente */

  const [yearsDiff, setYearsDiff] = useState(0);

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    calcAños();
  };

  function calcAños() {
    if (selectedDate) {
      const birthDate = selectedDate.toLocaleString("en-US");
      const specificDate = new Date(birthDate);
      const now = new Date();
      const diff = now.getTime() - specificDate.getTime();
      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
      setYearsDiff(years);
    }
  }
  function aniosExpediente(param) {
    if (param) {
      const birthDate = param.toLocaleString("en-US");
      const specificDate = new Date(birthDate);
      const now = new Date();
      const diff = now.getTime() - specificDate.getTime();
      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
      return years;
    }
  }

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      correo: "",
      nombre: "",
      primerApellido: "",
      segundoApellido: "",
      telefono: "",
      telEmergencia: "",
      contrasena: "",
      confirmContra: "",
    },
  });
  const [formData, setData] = useState(null);
  //Accion POST o PUT
  const [action, setAction] = useState("POST");
  //Boolean indica el submit
  const [start, setStart] = useState(false);
  const [endpoint, setEndpoint] = useState(false);

  const [sexo, setSexo] = useState(null);
  const [tipoSangre, setTipoSangre] = useState(null);
  const [residencia, setResidencia] = useState(null);
  /* Alergia */
  const [selectedAlergias, setSelectedAlergias] = React.useState([]); //agregamos el estado para almacenar los valores seleccionados

  const handleAlergia = (selectedValues) => {
    setSelectedAlergias(selectedValues); //actualizamos el estado con el valor seleccionado de SelectAlergia
  };

  function handleSexo(params) {
    setSexo(params.target.value);
  }
  function handleTipoSangre(params) {
    setTipoSangre(params.target.value);
  }
  function handleResidencia(params) {
    setResidencia(params.target.value);
  }

  const handleExpedInput = () => {
    setExpedInput(!expedInput);

    if (data != null) {
      setSexo(data.sexo);
      setTipoSangre(data.tipoSangre);
      setResidencia(data.residencia);
    }
  };

  const options = [
    { id: 1, sexo: "masculino" },
    { id: 2, sexo: "femenino" },
  ];

  const optionSangre = [
    { id: 1, tipo: "A+" },
    { id: 2, tipo: "A-" },
    { id: 3, tipo: "B+" },
    { id: 4, tipo: "B-" },
    { id: 5, tipo: "AB+" },
    { id: 6, tipo: "AB-" },
    { id: 7, tipo: "O+" },
    { id: 8, tipo: "O-" },
  ];

  //Enviar los valores al API
  const { responseData, errorData, loadedData } = useSubmitForm({
    endpoint,
    action,
    formData,
    start,
  });
  const onSubmit = () => {
    try {
      // Establecer valores del formulario
      setData({
        idUsuario: userData.id,
        sexo: sexo,
        fechaNacimiento: new Date(selectedDate).toLocaleString("en-US"),
        tipoSangre: tipoSangre,
        residencia: residencia,
      });
      if (formData != null) {
        setStart(true);
        setEndpoint("expediente");
      }
      setAction("POST");
    } catch (e) {
      // handle your error
    }
  };
  const onSubmitAlergia = () => {
    try {
      // Establecer valores del formulario
      setData({
        Alergias: selectedAlergias,
        idUsuario: userData.id,
      });
      if (formData != null) {
        setStart(true);
        setEndpoint("expediente/createAlergia");
      }
      setAction("POST");
    } catch (e) {
      // handle your error
    }
  };

  useEffect(() => {
    if (responseData != null) {
      toast.success(responseData, {
        duration: 4000,
        position: "top-center",
      });
      // Si hay respuesta se creo o modifico lo redirecciona
      return navigate("/dashboard");
    }
  }, [responseData]);

  const handleCompartirExpediente = () => {
    return navigate(`/expediente/compartir`);
  };
  const handleVistaPrevia = () => {
    return navigate(`/expediente/${userData.id}`);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Dash />
        <Box
          component="main"
          /* #edeff1 */
          sx={{
            flexGrow: 1,
            /*    p: 10, */
            /* width: "50%", */
            /*  background: "red", */
            /* height: "100vh", */
            display: "flex",
          }}
        >
          {/* left */}
          <Box
            sx={{
              width: "50%",
              padding: 10,
            }}
          >
            <Box
              sx={{
                background: "#eeeeee",
                borderRadius: "3px",
                padding: 2,
                marginTop: "2rem",
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    paddingBottom: "1rem",
                  }}
                >
                  <Avatar
                    size="large"
                    id="basic-button"
                    sx={{
                      background: "#064588",
                      display: "flex",
                      width: "45px",
                      height: "45px",
                      alignItems: "center",
                      fontSize: "20px",
                      /* padding: "1rem", */
                    }}
                  >
                    U
                  </Avatar>
                  <Box
                    sx={{
                      display: "flex",

                      justifyContent: "center",
                      flexDirection: "column",
                      paddingLeft: "1rem",
                      flexGrow: 1,
                    }}
                  >
                    {userData && <h2>{userData.nombre}</h2>}
                    {expedInput && selectedDate && (
                      <span
                        style={{
                          color: "#8f97ad",
                        }}
                      >
                        {moment(selectedDate).format("DD/MM/YYYY")} -{" "}
                        {yearsDiff} años
                      </span>
                    )}
                    {!expedInput && data && (
                      <span
                        style={{
                          color: "#8f97ad",
                        }}
                      >
                        {moment(data.fechaNacimiento).format("DD/MM/YYYY")} -{" "}
                        {aniosExpediente(data.fechaNacimiento)} años
                      </span>
                    )}
                  </Box>

                  {!expedInput && (
                    <Button
                      onClick={handleExpedInput}
                      type="submit"
                      variant="contained"
                      color="secondary"
                      fullWidth
                      sx={{
                        width: "70px",
                        backgroundColor: "#fff",
                        color: "#1a82fe",
                        fontWeight: "700",
                        fontSize: "14px",
                        cursor: "pointer",
                        borderRadius: "7px",
                        textTransform: "none",
                        textAlign: "center",
                        display: "block",
                        border: "2px solid #1a82fe",
                        "&:hover": {
                          backgroundColor: "#08486c",
                          border: "2px solid #08486c",
                          color: "#fff",
                        },
                      }}
                    >
                      Editar
                    </Button>
                  )}
                  {expedInput && (
                    <>
                      <Button
                        onClick={() => setExpedInput(!expedInput)}
                        type="submit"
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{
                          width: "60px",
                          height: "35px",
                          backgroundColor: "#fff",
                          color: "red",
                          fontWeight: "700",
                          fontSize: "10px",
                          cursor: "pointer",
                          borderRadius: "7px",
                          textTransform: "none",
                          textAlign: "center",
                          border: "2px solid red",

                          "&:hover": {
                            backgroundColor: "initial",
                            border: "2px solid red",
                            color: "#red",
                          },
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button
                        onClick={onSubmit}
                        type="submit"
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{
                          width: "60px",
                          height: "35px",
                          backgroundColor: "#fff",
                          color: "green",
                          fontWeight: "700",
                          fontSize: "10px",
                          cursor: "pointer",
                          borderRadius: "7px",
                          textTransform: "none",
                          textAlign: "center",
                          border: "2px solid green",
                          "&:hover": {
                            backgroundColor: "initial ",
                            border: "2px solid green",
                            color: "green",
                          },
                          marginLeft: ".5rem",
                        }}
                      >
                        Guardar
                      </Button>
                    </>
                  )}
                </Box>
                <Divider style={{ backgroundColor: "#fff" }}></Divider>
              </Box>
              <TableContainer component={Paper}>
                <Table
                  aria-label="simple table"
                  sx={{
                    padding: "0 !important",
                    width: "90%",
                    backgroundColor: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {/* tabla inicial cuando hay expediente */}
                  {!expedInput && data && (
                    <TableBody
                      sx={{
                        paddingLeft: "4rem  !important",
                      }}
                    >
                      <TableRow key={1}>
                        <TableCell
                          sx={{
                            color: "#8f97ad",
                            border: "none",
                            textAlign: "right",
                          }}
                        >
                          Sexo
                        </TableCell>
                        <TableCell sx={{ border: "none", textAlign: "left" }}>
                          {data.sexo}
                        </TableCell>
                      </TableRow>
                      <TableRow key={2}>
                        <TableCell
                          sx={{
                            color: "#8f97ad",
                            border: "none",
                            textAlign: "right",
                          }}
                        >
                          Correo
                        </TableCell>
                        <TableCell sx={{ border: "none", textAlign: "left" }}>
                          {userData.correo}
                        </TableCell>
                      </TableRow>
                      <TableRow key={3}>
                        <TableCell
                          sx={{
                            color: "#8f97ad",
                            border: "none",
                            textAlign: "right",
                          }}
                        >
                          Teléfono
                        </TableCell>
                        <TableCell sx={{ border: "none", textAlign: "left" }}>
                          {userData.telefonos.telefono}
                        </TableCell>
                      </TableRow>
                      <TableRow key={4}>
                        <TableCell
                          sx={{
                            color: "#8f97ad",
                            border: "none",
                            textAlign: "right",
                            /*           fontSize: "1px", */
                          }}
                        >
                          Tipo de sangre
                        </TableCell>
                        <TableCell sx={{ border: "none", textAlign: "left" }}>
                          {data.tipoSangre}
                        </TableCell>
                      </TableRow>
                      <TableRow key={5}>
                        <TableCell
                          sx={{
                            color: "#8f97ad",
                            border: "none",
                            textAlign: "right",
                          }}
                        >
                          Dirección
                        </TableCell>
                        <TableCell sx={{ border: "none", textAlign: "left" }}>
                          {data.residencia}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                  {/* tabla inicial cuando no hay expediente */}
                  {!expedInput && !data && (
                    <TableBody
                      sx={{
                        paddingLeft: "4rem  !important",
                      }}
                    >
                      <TableRow key={1}>
                        <TableCell
                          sx={{
                            color: "#8f97ad",
                            border: "none",
                            textAlign: "right",
                          }}
                        >
                          Sexo
                        </TableCell>
                        <TableCell sx={{ border: "none", textAlign: "left" }}>
                          vacio
                        </TableCell>
                      </TableRow>
                      <TableRow key={2}>
                        <TableCell
                          sx={{
                            color: "#8f97ad",
                            border: "none",
                            textAlign: "right",
                          }}
                        >
                          Correo
                        </TableCell>
                        <TableCell sx={{ border: "none", textAlign: "left" }}>
                          {userData.correo}
                        </TableCell>
                      </TableRow>
                      <TableRow key={3}>
                        <TableCell
                          sx={{
                            color: "#8f97ad",
                            border: "none",
                            textAlign: "right",
                          }}
                        >
                          Teléfono
                        </TableCell>
                        <TableCell sx={{ border: "none", textAlign: "left" }}>
                          {userData.telefonos.telefono}
                        </TableCell>
                      </TableRow>
                      <TableRow key={4}>
                        <TableCell
                          sx={{
                            color: "#8f97ad",
                            border: "none",
                            textAlign: "right",
                            /*           fontSize: "1px", */
                          }}
                        >
                          Tipo de sangre
                        </TableCell>
                        <TableCell sx={{ border: "none", textAlign: "left" }}>
                          vacio
                        </TableCell>
                      </TableRow>
                      <TableRow key={5}>
                        <TableCell
                          sx={{
                            color: "#8f97ad",
                            border: "none",
                            textAlign: "right",
                          }}
                        >
                          Dirección
                        </TableCell>
                        <TableCell sx={{ border: "none", textAlign: "left" }}>
                          vacio
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                  {/* Cuando el usuario con expediente actualiza */}
                  {expedInput && data && (
                    <TableBody
                      sx={{
                        paddingLeft: "2rem  !important",
                      }}
                    >
                      <TableRow key={1}>
                        <TableCell
                          sx={{
                            color: "#8f97ad",
                            border: "none",
                            textAlign: "right",
                          }}
                        >
                          Sexo
                        </TableCell>
                        <TableCell sx={{ border: "none", textAlign: "left" }}>
                          {/* <SelectSexo onChange={handleSexo}></SelectSexo> */}
                          <Select
                            onChange={handleSexo}
                            sx={{
                              borderRadius: "10px",
                              background: "#fff",
                              height: "40px",
                              width: "12.3rem",
                              /*     padding: "0.5rem", */
                              /* position: "absolute", */
                            }}
                            value={sexo}
                          >
                            {options.map((op) => (
                              <MenuItem value={op.sexo} key={op.id}>
                                {op.sexo}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                      </TableRow>
                      <TableRow key={3}>
                        <TableCell
                          sx={{
                            color: "#8f97ad",
                            border: "none",
                            textAlign: "right",
                          }}
                        >
                          Fecha de nacimiento
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "none",
                            textAlign: "left",
                          }}
                        >
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                              value={selectedDate}
                              onChange={handleDateChange}
                              inputFormat="MM/dd/yyyy hh:mm a"
                            />
                          </LocalizationProvider>
                        </TableCell>
                      </TableRow>
                      <TableRow key={4}>
                        <TableCell
                          sx={{
                            color: "#8f97ad",
                            border: "none",
                            textAlign: "right",
                            /*           fontSize: "1px", */
                          }}
                        >
                          Tipo de sangre
                        </TableCell>
                        <TableCell sx={{ border: "none", textAlign: "left" }}>
                          {/* <SelectTipoSangre></SelectTipoSangre> */}
                          <Select
                            onChange={handleTipoSangre}
                            sx={{
                              borderRadius: "10px",
                              background: "#fff",
                              height: "40px",
                              width: "12.3rem",

                              /* position: "absolute", */
                            }}
                            value={tipoSangre}
                          >
                            {optionSangre.map((op) => (
                              <MenuItem value={op.tipo} key={op.id}>
                                {op.tipo}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                      </TableRow>
                      <TableRow key={5}>
                        <TableCell
                          sx={{
                            color: "#8f97ad",
                            border: "none",
                            textAlign: "right",
                          }}
                        >
                          Dirección
                        </TableCell>
                        <TableCell sx={{ border: "none", textAlign: "left" }}>
                          <CssVarsProvider>
                            <Textarea
                              onChange={handleResidencia}
                              value={residencia}
                              color="primary"
                              minRows={3}
                              placeholder="Digite la dirección"
                              size="lg"
                            />
                          </CssVarsProvider>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}

                  {/* cuando el usuario sin expediente actualiza */}
                  {expedInput && !data && (
                    <TableBody
                      sx={{
                        paddingLeft: "2rem  !important",
                      }}
                    >
                      <TableRow key={1}>
                        <TableCell
                          sx={{
                            color: "#8f97ad",
                            border: "none",
                            textAlign: "right",
                          }}
                        >
                          Sexo
                        </TableCell>
                        <TableCell sx={{ border: "none", textAlign: "left" }}>
                          {/* <SelectSexo onChange={handleSexo}></SelectSexo> */}
                          <Select
                            onChange={handleSexo}
                            sx={{
                              borderRadius: "10px",
                              background: "#fff",
                              height: "40px",
                              width: "12.3rem",
                              /*     padding: "0.5rem", */
                              /* position: "absolute", */
                            }}
                          >
                            {options.map((op) => (
                              <MenuItem value={op.sexo} key={op.id}>
                                {op.sexo}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                      </TableRow>
                      <TableRow key={3}>
                        <TableCell
                          sx={{
                            color: "#8f97ad",
                            border: "none",
                            textAlign: "right",
                          }}
                        >
                          Fecha de nacimiento
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "none",
                            textAlign: "left",
                          }}
                        >
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                              value={selectedDate}
                              onChange={handleDateChange}
                              inputFormat="MM/dd/yyyy hh:mm a"
                            />
                          </LocalizationProvider>
                        </TableCell>
                      </TableRow>
                      <TableRow key={4}>
                        <TableCell
                          sx={{
                            color: "#8f97ad",
                            border: "none",
                            textAlign: "right",
                            /*           fontSize: "1px", */
                          }}
                        >
                          Tipo de sangre
                        </TableCell>
                        <TableCell sx={{ border: "none", textAlign: "left" }}>
                          {/* <SelectTipoSangre></SelectTipoSangre> */}
                          <Select
                            onChange={handleTipoSangre}
                            sx={{
                              borderRadius: "10px",
                              background: "#fff",
                              height: "40px",
                              width: "12.3rem",

                              /* position: "absolute", */
                            }}
                          >
                            {optionSangre.map((op) => (
                              <MenuItem value={op.tipo} key={op.id}>
                                {op.tipo}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                      </TableRow>
                      <TableRow key={5}>
                        <TableCell
                          sx={{
                            color: "#8f97ad",
                            border: "none",
                            textAlign: "right",
                          }}
                        >
                          Dirección
                        </TableCell>
                        <TableCell sx={{ border: "none", textAlign: "left" }}>
                          <CssVarsProvider>
                            <Textarea
                              onChange={handleResidencia}
                              color="primary"
                              minRows={3}
                              placeholder="Digite la dirección"
                              size="lg"
                            />
                          </CssVarsProvider>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
              <Button
                onClick={handleVistaPrevia}
                sx={{
                  marginTop: "2rem !important",
                  width: "410px",
                  backgroundColor: "#fff",
                  color: "#1a82fe",
                  fontWeight: "700",
                  fontSize: "14px",
                  cursor: "pointer",
                  borderRadius: "7px",
                  textTransform: "none",
                  textAlign: "center",
                  display: "block",
                  border: "2px solid #1a82fe",
                  "&:hover": {
                    backgroundColor: "#08486c",
                    border: "2px solid #08486c",
                    color: "#fff",
                  },
                }}
              >
                Vista previa
              </Button>
            </Box>
          </Box>
          {/* Antecedentes side */}
          <Box
            sx={{
              width: "50%",
              padding: 10,
            }}
          >
            <CssVarsProvider>
              <FormLabel
                sx={{
                  marginBottom: ".5rem",
                  marginTop: "1.5rem",
                  fontSize: "1.5rem",
                }}
              >
                Antecedentes
              </FormLabel>
            </CssVarsProvider>
            <Divider></Divider>
            <Box
              sx={{
                /*  width: "50%", */
                height: "60vh",
                /* background: "blue", */
                /*  background: "#fff", */
                padding: "1rem 0",
                borderRadius: "5px",
              }}
            >
              {/* Alergias */}
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
                /*   style={{ backgroundColor: "white" }} */
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography
                    sx={{
                      color: "#1a82fe",
                    }}
                  >
                    Alergias
                  </Typography>
                </AccordionSummary>
                {formInput && (
                  <AccordionDetails>
                    <SelectAlergia onChange={handleAlergia}></SelectAlergia>
                  </AccordionDetails>
                )}
                <Box
                  sx={{
                    display: "flex",

                    justifyContent: "center",
                    flexDirection: "row",
                    paddingLeft: "1rem",
                    /*      flexGrow: 1, */
                    padding: "1rem",
                  }}
                >
                  <Typography
                    sx={{ margin: ".5rem 1rem 1rem 1rem", flexGrow: 1 }}
                  >
                    {/*                     <div>
                      {selectedAlergias.length > 0 ? (
                        selectedAlergias.map((op) => (
                          <>
                            <span>{op}</span>
                            <br />
                          </>
                        ))
                      ) : (
                        <p>No hay alergias registradas</p>
                      )}
                    </div> */}
                    {!dataAlergia && <p>No hay alergias registradas</p>}
                    {dataAlergia && (
                      <>
                        {dataAlergia.results.map((op) => (
                          <p>
                            <span>{op.nombre}</span>
                            <br />
                          </p>
                        ))}
                      </>
                    )}
                  </Typography>
                  {!formInput && (
                    <Button
                      onClick={() => setFormInput(!formInput)}
                      type="submit"
                      variant="contained"
                      color="secondary"
                      fullWidth
                      sx={{
                        width: "60px",
                        height: "35px",
                        backgroundColor: "#fff",
                        color: "#1a82fe",
                        fontWeight: "700",
                        fontSize: "10px",
                        cursor: "pointer",
                        borderRadius: "7px",
                        textTransform: "none",
                        textAlign: "center",
                        border: "2px solid #1a82fe",
                        "&:hover": {
                          backgroundColor: "#08486c",
                          border: "2px solid #08486c",
                          color: "#fff",
                        },
                      }}
                    >
                      Agregar
                    </Button>
                  )}
                  {formInput && (
                    <>
                      <Button
                        onClick={() => setFormInput(!formInput)}
                        type="submit"
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{
                          width: "60px",
                          height: "35px",
                          backgroundColor: "#fff",
                          color: "red",
                          fontWeight: "700",
                          fontSize: "10px",
                          cursor: "pointer",
                          borderRadius: "7px",
                          textTransform: "none",
                          textAlign: "center",
                          border: "2px solid red",

                          "&:hover": {
                            backgroundColor: "initial",
                            border: "2px solid red",
                            color: "#red",
                          },
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button
                        onClick={onSubmitAlergia}
                        type="submit"
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{
                          width: "60px",
                          height: "35px",
                          backgroundColor: "#fff",
                          color: "green",
                          fontWeight: "700",
                          fontSize: "10px",
                          cursor: "pointer",
                          borderRadius: "7px",
                          textTransform: "none",
                          textAlign: "center",
                          border: "2px solid green",
                          "&:hover": {
                            backgroundColor: "initial ",
                            border: "2px solid green",
                            color: "green",
                          },
                          marginLeft: ".5rem",
                        }}
                      >
                        Guardar
                      </Button>
                    </>
                  )}
                </Box>
              </Accordion>
              {/* Enfermedades */}
              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography
                    sx={{
                      color: "#1a82fe",
                    }}
                  >
                    Enfermedades
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <SelectEnfermedad></SelectEnfermedad>
                </AccordionDetails>
                <Typography sx={{ margin: ".5rem 1rem 1rem 1rem" }}>
                  No hay enfermedades registradas
                </Typography>
              </Accordion>
              {/* Medicamentos */}
              <Accordion
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography
                    sx={{
                      color: "#1a82fe",
                    }}
                  >
                    Medicamentos
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <SelectMedicamento></SelectMedicamento>
                </AccordionDetails>
                <Typography sx={{ margin: ".5rem 1rem 1rem 1rem" }}>
                  No hay medicamentos registradas
                </Typography>
              </Accordion>
              {/* Cirugias */}
              <Accordion
                expanded={expanded === "panel4"}
                onChange={handleChange("panel4")}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography
                    sx={{
                      color: "#1a82fe",
                    }}
                  >
                    Cirugias
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <>
                    <CssVarsProvider>
                      <FormLabel sx={{ margin: ".5rem 0" }}>
                        Seleccione una cirugia
                      </FormLabel>
                    </CssVarsProvider>
                    <SelectCirugia></SelectCirugia>
                    <CssVarsProvider>
                      <FormLabel sx={{ margin: ".5rem 0" }}>
                        Observaciones
                      </FormLabel>
                      <Textarea
                        color="primary"
                        disabled={false}
                        minRows={3}
                        placeholder="Digite las observaciones"
                        size="lg"
                        variant="outlined"
                      />
                    </CssVarsProvider>
                    <CssVarsProvider>
                      <FormLabel sx={{ margin: ".5rem" }}>
                        Fecha y hora final
                      </FormLabel>
                    </CssVarsProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        sx={{ width: "100%" }}
                        inputFormat="MM/dd/yyyy hh:mm a"
                        /*                         value={dayjs(selectedDateEnd)}
                        onChange={handleDateEndChange} */
                      />
                    </LocalizationProvider>
                  </>
                </AccordionDetails>
                <Typography sx={{ margin: ".5rem 1rem 1rem 1rem" }}>
                  No hay cirugias registradas
                </Typography>
              </Accordion>
              <Button
                onClick={handleCompartirExpediente}
                sx={{
                  marginTop: "2rem !important",
                  width: "410px",
                  backgroundColor: "#fff",
                  color: "#1a82fe",
                  fontWeight: "700",
                  fontSize: "14px",
                  cursor: "pointer",
                  borderRadius: "7px",
                  textTransform: "none",
                  textAlign: "center",
                  display: "block",
                  border: "2px solid #1a82fe",
                  "&:hover": {
                    backgroundColor: "#08486c",
                    border: "2px solid #08486c",
                    color: "#fff",
                  },
                }}
              >
                Compartir expediente
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Expediente;
