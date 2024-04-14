import React, { useState } from "react";
import {
  Grid,
  Container,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  CssBaseline,
  createTheme,
  FormHelperText,
} from "@mui/material/";
import logoImg from "../../../media/logofooter.png";
import styled from "styled-components";
import { Box } from "@mui/system";
import { useEffect, useContext } from "react";
import FormControl from "@mui/material/FormControl";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSubmitForm } from "../../../hooks/useSubmitForm";
// eslint-disable-next-line no-unused-vars
import { useNavigate, useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Select } from "@mui/joy";
import SelectEstado from "./selectEstado";
import Dash from "./Dash";
import { useCallApi } from "../../../hooks/useCallApi";
import toast from "react-hot-toast";

const FormEstado = () => {
  const navigate = useNavigate();
  const routeParams = useParams();
  const id = routeParams.id;
  const esCrear = !id;
  const { data, error, loaded } = useCallApi({
    endpoint: `usuario/${id}`,
  });

  // Esquema de validación
  const estadoSchema = yup.object({
    /*     email: yup
      .string()
      .required("El email es requerido")
      .email("Formato email"),
    password: yup.string().required("El password es requerido"), */
    estado: yup.string().required("Debes seleccionar una opción"),
  });
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // Valores iniciales
    defaultValues: {
      estado: "",
    },
    // Asignación de validaciones
    resolver: yupResolver(estadoSchema),
  });

  // Valores de formulario
  const [formData, setData] = useState(null);
  // Booleano para establecer si se envia la informacion al API
  const [start, setStart] = useState(false);
  // Obtener la respuesta de la solicitud de crear o actualizar en el API
  // eslint-disable-next-line no-unused-vars
  const { responseData, errorData, loadedData } = useSubmitForm({
    endpoint: "usuario/update",
    action: "POST",
    formData,
    start,
  });
  // Accion submit
  const onSubmit = (DataForm) => {
    try {
      DataForm.estado =
        DataForm.estado == "1"
          ? "Activo"
          : DataForm.estado == "2"
          ? "Pendiente"
          : DataForm.estado == "3"
          ? "Inactivo"
          : "";
      data.estado = DataForm.estado;
      data.idTipoUsuario = data.rol.idTipoUsuario;
      setData(data);
      console.log(data);
      console.log(DataForm);
      setStart(true);
    } catch (e) {
      // handle your error
    }
  };
  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);
  // Ejecutar si hay algun cambio en:
  // - la respuesta del API al crea o actualizar
  // - si hay datos de la pelicula que se debe precargar
  // - cambia el booleano que indica si es Crear o Modificar
  // - cambia el tipo de accion POST o PUT
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

  const ImgContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "8rem",
    margin: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    /*       [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }, */
  }));

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Dash />
        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            p: 10,
            background: "#fff",
            height: "100vh",
            width: "100%",
          }}
        >
          <Box
            sx={{
              /*  height: 600, */
              margin: "0 auto",
              width: "60%",
              padding: "3rem",
              background: "#e9ecef",
              borderRadius: "20px",
            }}
          >
            {/* <Grid container spacing={4}> */}
            {data && (
              <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                <>
                  <FormControl
                    variant="standard"
                    sx={{ margin: "1.3rem 0 0 0.5rem" }}
                  >
                    <Controller
                      name="estado"
                      control={control}
                      render={({ field }) => (
                        <>
                          <SelectEstado
                            /* defaultValues={data.estado} */
                            /*                           value={
                            data.estado === "Activo"
                              ? { id: 1, estado: data.estado }
                              : data.estado === "Pendiente"
                              ? { id: 2, estado: data.estado }
                              : { id: 3, estado: data.estado }
                          } */
                            field={field}
                            onChange={(e) =>
                              setValue("estado", e.target.value, {
                                shouldValidate: true,
                              })
                            }
                            error={Boolean(errors.estado)}
                          ></SelectEstado>
                          {errors.estado ? (
                            <FormHelperText sx={{ color: "red" }}>
                              {errors.estado.message}
                            </FormHelperText>
                          ) : (
                            ""
                          )}
                        </>
                      )}
                    />
                  </FormControl>
                  <Grid>
                    {/* guardar */}
                    <Grid item xs={12} sm={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="info"
                        sx={{ m: 1 }}
                      >
                        Guardar
                      </Button>
                    </Grid>
                  </Grid>
                </>
              </form>
            )}
          </Box>
        </Box>
      </Box>
      <Toaster />
    </>
  );
};

export default FormEstado;
