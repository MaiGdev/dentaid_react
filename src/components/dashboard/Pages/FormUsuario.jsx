import * as React from "react";
import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
/* import { Box } from "@mui/material"; */
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSubmitForm } from "../../../hooks/useSubmitForm";
import { useCallApi } from "../../../hooks/useCallApi";
import { useNavigate, useParams } from "react-router-dom";
//valida como tal
import * as yup from "yup";
//intermedio que permite mostrar los errores en el formulario
import { yupResolver } from "@hookform/resolvers/yup";
// elementos para definor el formulario y elementos
import { useForm, Controller } from "react-hook-form";
import Dash from "./Dash";
import { CssVarsProvider } from "@mui/joy";
import Input from "@mui/joy/Input";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Option from "@mui/joy/Option";
import MenuItem from "@mui/material/MenuItem";
import Textarea from "@mui/joy/Textarea";
/* import Button from "@mui/joy/Button"; */
import Box from "@mui/joy/Box";
import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import InputMask from "react-input-mask";

const FormUsuario = () => {
  const navigate = useNavigate();
  const routeParams = useParams();
  const id = routeParams.id;
  const esCrear = !id;
  // Valores a precarga al actualizar
  const [values, setValues] = useState(null);

  const { user, decodeToken, autorize } = useContext(UserContext);
  const [userData, setUserData] = useState(decodeToken());

  //Esquema de validación
  const usuarioSchema = yup.object({
    /*     nombre: yup
      .string()
      .required("El nombre es requerido")
      .min(5, "El nombre de usuario debe tener al menos 5 caracteres")
      .matches(/^[a-zA-Z]+$/, 'Ingrese solo letras en el campo "nombre"')
      .max(20, "El nombre de usuario no puede tener más de 20 caracteres"),
    observaciones: yup
      .string()
      .required("Las observaciones son requeridas")
      .min(30, "El nombre de usuario debe tener al menos 30 caracteres")
      .max(150, "El nombre de usuario no puede tener más de 150 caracteres"), */

    contrasena: yup
      .string()
      .required("La contraseña es requerida")
      .test("match", "Las contraseñas no coinciden", function (value) {
        return value === this.parent.confirmContra;
      }),
    confirmContra: yup
      .string()
      .required("La confirmación de contraseña es requerida"),
  });

  //Establecer formulario
  //valores defecto, valores de carga y validación

  //Establecer formulario
  //valores defecto, valores de carga y validación
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
    // valores a precargar
    values,

    resolver: yupResolver(usuarioSchema),
  });

  //Valores del formulario
  const [formData, setData] = useState(null);
  //Accion POST o PUT
  const [action, setAction] = useState("POST");
  //Boolean indica el submit
  const [start, setStart] = useState(false);
  /*  */
  const [telefono, setTelefono] = useState(null);
  const [telEmergencia, setTelEmergencia] = useState(null);

  const { data, error, loaded } = useCallApi({
    endpoint: `usuario/${id}`,
  });

  function handleTelefono(params) {
    setTelefono(params.target.value);
  }
  function handleTelEmergencia(params) {
    setTelEmergencia(params.target.value);
  }

  //Enviar los valores al API
  const { responseData, errorData, loadedData } = useSubmitForm({
    endpoint: "usuario",
    action,
    formData,
    start,
  });

  //Submit del formulario
  const onSubmit = (DataForm) => {
    try {
      // Establecer valores del formulario
      DataForm.idTipoUsuario = 3;
      DataForm.estado = "Activo";
      DataForm.telefono = telefono;
      DataForm.telEmergencia = telEmergencia;
      if (window.location.href === "http://localhost:5173/medico/signup") {
        DataForm.idTipoUsuario = 2;
      }
      /* console.log(DataForm); */
      setData(DataForm);
      setStart(true);
      if (esCrear) {
        setAction("POST");
      } else {
        setAction("PUT");
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
        if (user && autorize({ allowedRoles: ["Administrador"] })) {
          if (window.location.href === "http://localhost:5173/medico/signup") {
            return navigate("/medicos");
          }
          if (
            window.location.href === "http://localhost:5173/paciente/signup"
          ) {
            return navigate("/pacientes");
          }
        } else {
          return navigate("/");
        }
      }, 1000);
    }
    if (!esCrear && data) {
      // Si es modificar establece los valores a precargar en el formulario
      setValues(data);
      /* console.log(data); */
    }
  }, [responseData, data, esCrear, action]);

  /*  */
  return (
    <>
      {/* <Box sx={{ background: "#ebf2fc", height: "100vh" }} /> */}
      <Box
        sx={{
          display: "flex",
          background: "#ebf2fc",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 10,
            background: "#fff",
            height: "90vh",

            width: "45%",
            padding: "3rem",
            /* background: "#e9ecef", */
            borderRadius: "15px",
          }}
        >
          <Box>
            <h1
              style={{
                fontWeight: "500",
                paddingBottom: "2rem",
              }}
            >
              Crea tu perfil
            </h1>
          </Box>
          <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
            <Grid container spacing={3}>
              {/* Correo */}
              <Grid item xs={12} sm={6}>
                {/* Correo */}
                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                  <Controller
                    name="correo"
                    control={control}
                    //field empaquea las propiedades
                    render={({ field }) => (
                      <>
                        <CssVarsProvider>
                          <FormLabel
                            sx={{ marginBottom: ".5rem", color: "#afb1c4" }}
                          >
                            Correo
                          </FormLabel>
                          <Input
                            {...field}
                            color="neutral"
                            id="correo"
                            variant="outlined"
                            label="Correo"
                            size="md"
                            /* error={Boolean(errors.nombre)} */
                          />

                          {errors.nombre ? (
                            <FormHelperText sx={{ color: "red" }}>
                              {errors.nombre.message}
                            </FormHelperText>
                          ) : (
                            ""
                          )}
                        </CssVarsProvider>
                      </>
                    )}
                  />
                </FormControl>
              </Grid>

              {/* nombre */}
              <Grid item xs={12} sm={6}>
                {/* nombre */}
                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                  <Controller
                    name="nombre"
                    control={control}
                    //field empaquea las propiedades
                    render={({ field }) => (
                      <>
                        <CssVarsProvider>
                          <FormLabel
                            sx={{ marginBottom: ".5rem", color: "#afb1c4" }}
                          >
                            Nombre
                          </FormLabel>
                          <Input
                            {...field}
                            color="neutral"
                            id="nombre"
                            variant="outlined"
                            label="Nombre"
                            size="md"

                            /* error={Boolean(errors.nombre)} */
                          />

                          {errors.nombre ? (
                            <FormHelperText sx={{ color: "red" }}>
                              {errors.nombre.message}
                            </FormHelperText>
                          ) : (
                            ""
                          )}
                        </CssVarsProvider>
                      </>
                    )}
                  />
                </FormControl>
              </Grid>

              {/* primer apellido */}
              <Grid item xs={12} sm={6}>
                {/* primer apellido */}
                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                  <Controller
                    name="primerApellido"
                    control={control}
                    //field empaquea las propiedades
                    render={({ field }) => (
                      <>
                        <CssVarsProvider>
                          <FormLabel
                            sx={{ marginBottom: ".5rem", color: "#afb1c4" }}
                          >
                            Primer Apellido
                          </FormLabel>
                          <Input
                            {...field}
                            color="neutral"
                            id="primerApellido"
                            variant="outlined"
                            label="Primer Apellido"
                            size="md"
                            /* error={Boolean(errors.nombre)} */
                          />

                          {errors.nombre ? (
                            <FormHelperText sx={{ color: "red" }}>
                              {errors.nombre.message}
                            </FormHelperText>
                          ) : (
                            ""
                          )}
                        </CssVarsProvider>
                      </>
                    )}
                  />
                </FormControl>
              </Grid>
              {/* segundo apellido */}
              <Grid item xs={12} sm={6}>
                {/* segundo apellido */}
                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                  <Controller
                    name="segundoApellido"
                    control={control}
                    //field empaquea las propiedades
                    render={({ field }) => (
                      <>
                        <CssVarsProvider>
                          <FormLabel
                            sx={{ marginBottom: ".5rem", color: "#afb1c4" }}
                          >
                            Segundo Apellido
                          </FormLabel>
                          <Input
                            {...field}
                            color="neutral"
                            id="segundoApellido"
                            variant="outlined"
                            label="Primer Apellido"
                            size="md"
                            /* error={Boolean(errors.nombre)} */
                          />

                          {errors.nombre ? (
                            <FormHelperText sx={{ color: "red" }}>
                              {errors.nombre.message}
                            </FormHelperText>
                          ) : (
                            ""
                          )}
                        </CssVarsProvider>
                      </>
                    )}
                  />
                </FormControl>
              </Grid>

              {/* Telefono */}
              <Grid item xs={12} sm={6}>
                {/* Telefono */}
                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                  <Controller
                    name="telefono"
                    control={control}
                    //field empaquea las propiedades
                    render={({ field }) => (
                      <>
                        <CssVarsProvider>
                          <FormLabel
                            sx={{ marginBottom: ".5rem", color: "#afb1c4" }}
                          >
                            Telefono
                          </FormLabel>
                          <InputMask
                            mask="506-9999-9999"
                            onChange={handleTelefono}
                          >
                            {() => (
                              <Input
                                color="neutral"
                                id="telefono"
                                variant="outlined"
                                label="Teléfono"
                                size="md"
                              />
                            )}
                          </InputMask>
                        </CssVarsProvider>
                      </>
                    )}
                  />
                </FormControl>
              </Grid>

              {/* telEmergencia */}
              <Grid item xs={12} sm={6}>
                {/* telEmergencia */}
                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                  <Controller
                    name="telEmergencia"
                    control={control}
                    //field empaquea las propiedades
                    render={({ field }) => (
                      <>
                        <CssVarsProvider>
                          <FormLabel
                            sx={{ marginBottom: ".5rem", color: "#afb1c4" }}
                          >
                            Teléfono de emergencia
                          </FormLabel>

                          <InputMask
                            mask="506-9999-9999"
                            onChange={handleTelEmergencia}
                          >
                            {() => (
                              <Input
                                color="neutral"
                                id="telEmergencia"
                                variant="outlined"
                                label="Teléfono de emergencia"
                                size="md"
                              />
                            )}
                          </InputMask>
                        </CssVarsProvider>
                      </>
                    )}
                  />
                </FormControl>
              </Grid>

              {/* contraseña */}
              <Grid item xs={12} sm={6}>
                {/* contraseña */}
                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                  <Controller
                    name="contrasena"
                    control={control}
                    //field empaquea las propiedades
                    render={({ field }) => (
                      <>
                        <CssVarsProvider>
                          <FormLabel
                            sx={{ marginBottom: ".5rem", color: "#afb1c4" }}
                          >
                            Contraseña
                          </FormLabel>
                          <Input
                            {...field}
                            color="neutral"
                            id="contrasena"
                            variant="outlined"
                            label="Contraseña"
                            size="md"
                            type={"password"}
                            error={Boolean(errors.contrasena)}
                          />

                          {errors.contrasena ? (
                            <FormHelperText sx={{ color: "red" }}>
                              {errors.contrasena.message}
                            </FormHelperText>
                          ) : (
                            ""
                          )}
                        </CssVarsProvider>
                      </>
                    )}
                  />
                </FormControl>
              </Grid>
              {/*confirmar contraseña */}
              <Grid item xs={12} sm={6}>
                {/* contraseña */}
                <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                  <Controller
                    name="confirmContra"
                    control={control}
                    //field empaquea las propiedades
                    render={({ field }) => (
                      <>
                        <CssVarsProvider>
                          <FormLabel
                            sx={{ marginBottom: ".5rem", color: "#afb1c4" }}
                          >
                            Confirmar contraseña
                          </FormLabel>
                          <Input
                            {...field}
                            color="neutral"
                            id="confirmContra"
                            variant="outlined"
                            label="Confirmar contraseña"
                            size="md"
                            type={"password"}
                            error={Boolean(errors.confirmContra)}
                          />

                          {errors.confirmContra ? (
                            <FormHelperText sx={{ color: "red" }}>
                              {errors.confirmContra.message}
                            </FormHelperText>
                          ) : (
                            ""
                          )}
                        </CssVarsProvider>
                      </>
                    )}
                  />
                </FormControl>
              </Grid>

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
          </form>
        </Box>
      </Box>
    </>
  );
};

export default FormUsuario;
