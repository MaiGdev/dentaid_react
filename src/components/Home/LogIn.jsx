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
} from "@mui/material/";
import logoImg from "../../media/logofooter.png";
import styled from "styled-components";
import { Box } from "@mui/system";
import { useEffect, useContext } from "react";
import FormControl from "@mui/material/FormControl";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSubmitForm } from "../../hooks/useSubmitForm";
// eslint-disable-next-line no-unused-vars
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";

const SignIn = () => {
  const navigate = useNavigate();
  const { saveUser } = useContext(UserContext);
  const { user, decodeToken, autorize } = useContext(UserContext);
  /*  const [userData, setUserData] = useState(decodeToken()); */
  const [userData, setUserData] = useState(null);

  // Esquema de validación
  const loginSchema = yup.object({
    /*     email: yup
      .string()
      .required("El email es requerido")
      .email("Formato email"),
    password: yup.string().required("El password es requerido"), */
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // Valores iniciales
    defaultValues: {
      correo: "",
      contrasena: "",
    },
    // Asignación de validaciones
    resolver: yupResolver(loginSchema),
  });

  // Valores de formulario
  const [formData, setData] = useState(null);
  // Booleano para establecer si se envia la informacion al API
  const [start, setStart] = useState(false);
  // Obtener la respuesta de la solicitud de crear o actualizar en el API
  // eslint-disable-next-line no-unused-vars
  const { responseData, errorData, loadedData } = useSubmitForm({
    endpoint: "usuario/login",
    action: "POST",
    formData,
    start,
  });
  // Accion submit
  const onSubmit = (DataForm) => {
    try {
      console.log(DataForm);
      setData(DataForm);
      // Indicar que se puede realizar la solicitud al API
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
    if (
      responseData != null &&
      responseData != "Usuario o contraseña incorrecta"
    ) {
      saveUser(responseData);
      setTimeout(() => {
        return navigate("/dashboard/");
      }, 100);
    }
  }, [responseData, userData]);

  useEffect(() => {
    if (responseData == "Usuario o contraseña incorrecta") {
      toast.error(responseData, {
        duration: 4000,
        position: "top-center",
      });
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
      <div>
        <ImgContainer
          sx={
            {
              /* background: "#000000", */
            }
          }
        >
          <img
            src={logoImg}
            alt=""
            style={{
              /* minWidth: "100%", */
              /* maxwidth: "30rem", */
              height: "60px",
              margin: "0",
              padding: "0",
            }}
          />
        </ImgContainer>

        {/*         <form style={{ padding: "1rem 2rem 2rem 2rem" }}>
          <TextField
            fullWidth
            autoFocus
            color="primary"
            margin="normal"
            variant="outlined"
            label="Nombre"
            name="nickname"
            value={body.nickname}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            type="password"
            color="primary"
            margin="normal"
            variant="outlined"
            label="Contraseña"
            name="password"
            value={body.password}
            onChange={handleChange}
          />
          <Button
            fullWidth
            href="/dashboard"
            sx={{
              marginTop: "2rem",
              backgroundColor: "#0F1B4C",
              color: "#fff",
              fontWeight: "700",
              fontSize: "14px",
              cursor: "pointer",
              borderRadius: "7px",
              textTransform: "none",
              textAlign: "center",
              display: "block",
              border: "2px solid transparent",
              "&:hover": {
                backgroundColor: "#08486c",
                color: "#fff",
              },
            }}
          >
            Iniciar sesión
          </Button>
        </form> */}
        <Toaster />
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          noValidate
          sx={{
            padding: ".5rem",
          }}
        >
          <Grid
            container
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormControl
              variant="standard"
              fullWidth
              sx={{ m: 1, width: "400px" }}
            >
              <Controller
                name="correo"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="correo"
                    label="Correo"
                    error={Boolean(errors.email)}
                    helperText={errors.email ? errors.email.message : " "}
                  />
                )}
              />
            </FormControl>

            <FormControl
              variant="standard"
              fullWidth
              sx={{ m: 1, width: "400px" }}
            >
              <Controller
                name="contrasena"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="contrasena"
                    label="Contraseña"
                    type="password"
                    error={Boolean(errors.password)}
                    helperText={errors.password ? errors.password.message : " "}
                  />
                )}
              />
            </FormControl>
            <Box>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                /*  sx={{ m: 1, width: "150px" }} */
                fullWidth
                /* href="/dashboard" */
                sx={{
                  width: "150px",
                  marginTop: "1rem",
                  backgroundColor: "#0F1B4C",
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: "14px",
                  cursor: "pointer",
                  borderRadius: "7px",
                  textTransform: "none",
                  textAlign: "center",
                  display: "block",
                  border: "2px solid transparent",
                  "&:hover": {
                    backgroundColor: "#08486c",
                    color: "#fff",
                  },
                }}
              >
                Ingresar
              </Button>
            </Box>

            {/*             <Grid item xs={12} sm={12}>
            </Grid> */}
          </Grid>
        </form>
      </div>
    </>
  );
};

export default SignIn;
