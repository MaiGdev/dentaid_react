import React, { useContext, useEffect, useState } from "react";
import Dash from "./Dash";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { UserContext } from "../../../context/UserContext";
import { Avatar, Button, CircularProgress } from "@mui/material";
import { useCallApi } from "../../../hooks/useCallApi";
import { useForm, Controller } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import { CssVarsProvider, Input } from "@mui/joy";
import { useSubmitForm } from "../../../hooks/useSubmitForm";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Panel() {
  const [formInput, setFormInput] = useState(false);
  function handleForm(params) {}
  const [value, setValue] = React.useState(0);
  const { user, decodeToken, autorize } = useContext(UserContext);
  const [userData, setUserData] = useState(decodeToken());

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data, error, loaded } = useCallApi({
    endpoint: `usuario/${userData.id}`,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      correo: "",
      nombre: "",
      primerApellido: "",
      segundoApellido: "",
      contrasena: "",
      confirmContra: "",
    },
  });
  //Valores del formulario
  const [formData, setData] = useState(null);
  //Accion POST o PUT
  const [action, setAction] = useState("POST");
  //Boolean indica el submit
  const [start, setStart] = useState(false);

  const [correo, setCorreo] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [primerApellido, setPrimerApellido] = useState(null);
  const [segundoApellido, setSegundoApellido] = useState(null);
  const [telefono, setTelefono] = useState(null);
  const [telEmergencia, setTelEmergencia] = useState(null);
  const [usuarioUpdate, setUsuarioUpdate] = useState({});
  const navigate = useNavigate();

  //Enviar los valores al API
  const { responseData } = useSubmitForm({
    endpoint: "usuario",
    action,
    formData,
    start,
  });

  function handleCorreo(params) {
    setCorreo(params.target.value);
    /*     console.log(correo); */
  }
  function handleNombre(params) {
    setNombre(params.target.value);
  }
  function handlePrimerApellido(params) {
    setPrimerApellido(params.target.value);
  }
  function handleSegundoApellido(params) {
    setSegundoApellido(params.target.value);
  }
  function handleTelefono(params) {
    setTelefono(params.target.value);
  }
  function handleTelEmergencia(params) {
    setTelEmergencia(params.target.value);
  }

  useEffect(() => {
    if (data != null) {
      setCorreo(data.correo);
      setNombre(data.nombre);
      setPrimerApellido(data.primerApellido);
      setSegundoApellido(data.segundoApellido);
      setTelefono(data.telefono);
      setTelEmergencia(data.telefonoEmergencia);
    }
  }, [data]);

  function update() {
    return {
      idUsuario: userData.id,
      correo: correo,
      nombre: nombre,
      contrasena: userData.contrasena,
      estado: "Activo",
      primerApellido: primerApellido,
      segundoApellido: segundoApellido,
      telefono: telefono,
      telefonoEmergencia: telEmergencia,
    };
  }

  //Submit del formulario
  const onSubmit = (DataForm) => {
    try {
      /*       usuarioUpdate({
        id: userData.id,
        correo: correo,
        nombre: nombre,
        primerApellido: primerApellido,
        segundoApellido: segundoApellido,
        telefono: telefono,
        telefonoEmergencia: telEmergencia,
      }); */

      /* console.log(update()); */
      setData(update());
      setAction("PUT");
      setStart(true);
      /*       toast.success("Perfil actualizado", {
        duration: 4000,
        position: "top-center",
      }); */
      /*   return navigate("/perfil/"); */
      /*    setFormInput(!formInput); */

      /* setData(DataForm); */
      /*     setStart(true); */
      /*       if (esCrear) {
        setAction("POST");
      } else {
        setAction("PUT");
      } */
    } catch (e) {
      console.log(e);
    }
  };

  const onError = (errors, e) => console.log(errors, e);

  useEffect(() => {
    if (responseData != null) {
      toast.success(responseData, {
        duration: 4000,
        position: "top-center",
      });
      // Si hay respuesta se creo o modifico lo redirecciona
      localStorage.removeItem("user");
      return navigate("/");
    }
  }, [responseData]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Dash />
        <Box
          component="main"
          /* #edeff1 */
          sx={{
            flexGrow: 1,
            p: 10,
            background: "#fff",
            height: "100vh",
          }}
        >
          <Box sx={{ width: "750px !important" }}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                marginTop: "2rem",
              }}
            >
              <h1
                sx={{
                  color: "#afb1c4",
                }}
              >
                Cuenta
              </h1>
              <Tabs
                sx={{ marginTop: "1rem" }}
                value={value}
                onChange={handleChange}

                /* aria-label="basic tabs example" */
              >
                <Tab
                  label="Información personal"
                  {...a11yProps(0)}
                  sx={{
                    backgroundColor: value === 0 ? "#e9ecef" : "initial",
                    fontWeight: "700",
                    color: "#afb1c4",
                    fontSize: "14px",
                    textTransform: "none",
                    textAlign: "center",
                    display: "block",
                    borderRadius: value === 0 ? "7px" : "none",
                    border: value === 0 ? "2px solid transparent" : "none",

                    "&:hover": {
                      backgroundColor: "#0a58ca",
                      color: "#fff",
                      borderRadius: "7px",
                      border: "2px solid transparent",
                    },
                  }}
                />
                {user && autorize({ allowedRoles: ["Médico"] }) && (
                  <Tab
                    label="Servicios"
                    {...a11yProps(1)}
                    sx={{
                      backgroundColor: value === 1 ? "#e9ecef" : "initial",
                      fontWeight: "700",
                      fontSize: "14px",
                      textTransform: "none",
                      textAlign: "center",
                      display: "block",
                      borderRadius: value === 1 ? "7px" : "none",
                      border: value === 1 ? "2px solid transparent" : "none",
                      "&:hover": {
                        backgroundColor: "#0a58ca",
                        color: "#fff",
                        borderRadius: "7px",
                        border: "2px solid transparent",
                      },
                    }}
                  />
                )}

                {/*  <Tab label="Item Three" {...a11yProps(2)} /> */}
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              {/* icono y botones */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: " .5rem 0",
                }}
              >
                <Box
                  sx={{
                    padding: "1rem 1rem 1rem 0",
                  }}
                >
                  <Avatar
                    size="large"
                    id="basic-button"
                    sx={{
                      background: "#064588",
                      display: "flex",
                      width: "42px",
                      height: "42px",
                      alignItems: "center",
                    }}
                  >
                    U
                  </Avatar>
                </Box>
                <Box
                  sx={{
                    padding: "1rem 0 1rem 1rem",
                    display: "flex",
                  }}
                >
                  {!formInput && (
                    <Button
                      onClick={() => setFormInput(!formInput)}
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
                  {formInput && (
                    <>
                      <Box
                        sx={{
                          marginRight: ".5rem",
                        }}
                      >
                        <Button
                          onClick={() => setFormInput(!formInput)}
                          type="submit"
                          variant="contained"
                          color="secondary"
                          fullWidth
                          sx={{
                            width: "90px",
                            backgroundColor: "#fff",
                            color: "red",
                            fontWeight: "700",
                            fontSize: "14px",
                            cursor: "pointer",
                            borderRadius: "7px",
                            textTransform: "none",
                            textAlign: "center",
                            display: "block",
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
                      </Box>
                      <Box>
                        <Button
                          onClick={onSubmit}
                          type="submit"
                          variant="contained"
                          color="secondary"
                          fullWidth
                          sx={{
                            width: "90px",
                            backgroundColor: "#fff",
                            color: "green",
                            fontWeight: "700",
                            fontSize: "14px",
                            cursor: "pointer",
                            borderRadius: "7px",
                            textTransform: "none",
                            textAlign: "center",
                            display: "block",
                            border: "2px solid green",
                            "&:hover": {
                              backgroundColor: "initial ",
                              border: "2px solid green",
                              color: "green",
                            },
                          }}
                        >
                          Guardar
                        </Button>
                      </Box>
                    </>
                  )}
                </Box>
              </Box>
              {!userData && !data && (
                <Box
                  sx={{
                    height: 400,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0 !important",
                  }}
                  marginTop="1.5rem"
                >
                  <CircularProgress />
                </Box>
              )}
              {userData && data && (
                <>
                  {!formInput && (
                    <TableContainer
                      sx={{
                        width: "750px !important",
                        /* marginTop: "2rem", */
                        padding: "0 24px 0 0",
                        boxShadow: "none",
                        border: "1px solid #e9ecef",
                      }}
                      component={Paper}
                    >
                      <Table
                        aria-label="simple table"
                        sx={{ padding: "0 !important" }}
                      >
                        <TableBody>
                          <TableRow key={1}>
                            <TableCell sx={{ color: "#8f97ad" }}>
                              Correo
                            </TableCell>
                            <TableCell>{data.correo}</TableCell>
                          </TableRow>
                          <TableRow key={2}>
                            <TableCell sx={{ color: "#8f97ad" }}>
                              Nombre
                            </TableCell>
                            <TableCell>{data.nombre}</TableCell>
                          </TableRow>
                          <TableRow key={3}>
                            <TableCell sx={{ color: "#8f97ad" }}>
                              Primer Apellido
                            </TableCell>
                            <TableCell>{data.primerApellido}</TableCell>
                          </TableRow>
                          <TableRow key={4}>
                            <TableCell sx={{ color: "#8f97ad" }}>
                              Segundo Apellido
                            </TableCell>
                            <TableCell>{data.segundoApellido}</TableCell>
                          </TableRow>
                          <TableRow key={5}>
                            <TableCell sx={{ color: "#8f97ad" }}>
                              Teléfono
                            </TableCell>
                            <TableCell>+{data.telefono}</TableCell>
                          </TableRow>
                          <TableRow key={6}>
                            <TableCell sx={{ color: "#8f97ad" }}>
                              Teléfono de emergencia
                            </TableCell>
                            <TableCell>+{data.telefonoEmergencia}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </>
              )}

              {userData && data && (
                <>
                  {formInput && (
                    <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                      {/* Correo */}
                      <Grid item xs={12} sm={6}>
                        <TableContainer
                          sx={{
                            width: "750px !important",
                            /* marginTop: "2rem", */
                            padding: "0 24px 0 0",
                            boxShadow: "none",
                            border: "1px solid #e9ecef",
                          }}
                          component={Paper}
                        >
                          <Table
                            aria-label="simple table"
                            sx={{ padding: "0 !important" }}
                          >
                            <TableBody>
                              <TableRow key={1}>
                                <TableCell sx={{ color: "#8f97ad" }}>
                                  Correo
                                </TableCell>
                                <TableCell>
                                  {" "}
                                  {/* Correo */}
                                  <FormControl variant="standard" fullWidth>
                                    <Controller
                                      name="correo"
                                      control={control}
                                      //field empaquea las propiedades
                                      render={({ field }) => (
                                        <>
                                          <CssVarsProvider>
                                            <Input
                                              {...field}
                                              color="neutral"
                                              id="correo"
                                              variant="outlined"
                                              label="Correo"
                                              size="md"
                                              value={correo}
                                              onChange={handleCorreo}
                                              /* error={Boolean(errors.nombre)} */
                                            />
                                          </CssVarsProvider>
                                        </>
                                      )}
                                    />
                                  </FormControl>
                                </TableCell>
                              </TableRow>
                              <TableRow key={2}>
                                <TableCell sx={{ color: "#8f97ad" }}>
                                  Nombre
                                </TableCell>
                                <TableCell>
                                  {" "}
                                  <FormControl variant="standard" fullWidth>
                                    <Controller
                                      name="correo"
                                      control={control}
                                      //field empaquea las propiedades
                                      render={({ field }) => (
                                        <>
                                          <CssVarsProvider>
                                            <Input
                                              {...field}
                                              color="neutral"
                                              id="correo"
                                              variant="outlined"
                                              label="Correo"
                                              size="md"
                                              value={nombre}
                                              onChange={handleNombre}
                                              /* error={Boolean(errors.nombre)} */
                                            />
                                          </CssVarsProvider>
                                        </>
                                      )}
                                    />
                                  </FormControl>
                                </TableCell>
                              </TableRow>
                              <TableRow key={3}>
                                <TableCell sx={{ color: "#8f97ad" }}>
                                  Primer Apellido
                                </TableCell>
                                <TableCell>
                                  {" "}
                                  <FormControl variant="standard" fullWidth>
                                    <Controller
                                      name="correo"
                                      control={control}
                                      //field empaquea las propiedades
                                      render={({ field }) => (
                                        <>
                                          <CssVarsProvider>
                                            <Input
                                              {...field}
                                              color="neutral"
                                              id="correo"
                                              variant="outlined"
                                              label="Correo"
                                              size="md"
                                              value={primerApellido}
                                              onChange={handlePrimerApellido}
                                              /* error={Boolean(errors.nombre)} */
                                            />
                                          </CssVarsProvider>
                                        </>
                                      )}
                                    />
                                  </FormControl>
                                </TableCell>
                              </TableRow>
                              <TableRow key={4}>
                                <TableCell sx={{ color: "#8f97ad" }}>
                                  Segundo Apellido
                                </TableCell>
                                <TableCell>
                                  {" "}
                                  <FormControl variant="standard" fullWidth>
                                    <Controller
                                      name="correo"
                                      control={control}
                                      //field empaquea las propiedades
                                      render={({ field }) => (
                                        <>
                                          <CssVarsProvider>
                                            <Input
                                              {...field}
                                              color="neutral"
                                              id="correo"
                                              variant="outlined"
                                              label="Correo"
                                              size="md"
                                              value={segundoApellido}
                                              onChange={handleSegundoApellido}
                                              /* error={Boolean(errors.nombre)} */
                                            />
                                          </CssVarsProvider>
                                        </>
                                      )}
                                    />
                                  </FormControl>
                                </TableCell>
                              </TableRow>
                              <TableRow key={5}>
                                <TableCell sx={{ color: "#8f97ad" }}>
                                  Teléfono
                                </TableCell>
                                <TableCell>
                                  {" "}
                                  <FormControl variant="standard" fullWidth>
                                    <Controller
                                      name="correo"
                                      control={control}
                                      //field empaquea las propiedades
                                      render={({ field }) => (
                                        <>
                                          <CssVarsProvider>
                                            <Input
                                              {...field}
                                              color="neutral"
                                              id="correo"
                                              variant="outlined"
                                              label="Correo"
                                              size="md"
                                              value={telefono}
                                              onChange={handleTelefono}
                                              /* error={Boolean(errors.nombre)} */
                                            />
                                          </CssVarsProvider>
                                        </>
                                      )}
                                    />
                                  </FormControl>
                                </TableCell>
                              </TableRow>
                              <TableRow key={6}>
                                <TableCell sx={{ color: "#8f97ad" }}>
                                  Teléfono de emergencia
                                </TableCell>
                                <TableCell>
                                  <FormControl variant="standard" fullWidth>
                                    <Controller
                                      name="correo"
                                      control={control}
                                      //field empaquea las propiedades
                                      render={({ field }) => (
                                        <>
                                          <CssVarsProvider>
                                            <Input
                                              {...field}
                                              color="neutral"
                                              id="correo"
                                              variant="outlined"
                                              label="Correo"
                                              size="md"
                                              value={telEmergencia}
                                              onChange={handleTelEmergencia}
                                              /* error={Boolean(errors.nombre)} */
                                            />
                                          </CssVarsProvider>
                                        </>
                                      )}
                                    />
                                  </FormControl>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                    </form>
                  )}
                </>
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {/* icono y botones */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: " .5rem 0",
                }}
              >
                <Box
                  sx={{
                    padding: "1rem 1rem 1rem 0",
                  }}
                >
                  <Avatar
                    size="large"
                    id="basic-button"
                    sx={{
                      background: "#064588",
                      display: "none",
                      width: "42px",
                      height: "42px",
                      alignItems: "center",
                    }}
                  >
                    U
                  </Avatar>
                </Box>
                <Box
                  sx={{
                    padding: "1rem 0 1rem 1rem",
                    display: "flex",
                  }}
                >
                  {!formInput && (
                    <Button
                      onClick={() => setFormInput(!formInput)}
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
                  {formInput && (
                    <>
                      <Box
                        sx={{
                          marginRight: ".5rem",
                        }}
                      >
                        <Button
                          onClick={() => setFormInput(!formInput)}
                          type="submit"
                          variant="contained"
                          color="secondary"
                          fullWidth
                          sx={{
                            width: "90px",
                            backgroundColor: "#fff",
                            color: "red",
                            fontWeight: "700",
                            fontSize: "14px",
                            cursor: "pointer",
                            borderRadius: "7px",
                            textTransform: "none",
                            textAlign: "center",
                            display: "block",
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
                      </Box>
                      <Box>
                        <Button
                          onClick={onSubmit}
                          type="submit"
                          variant="contained"
                          color="secondary"
                          fullWidth
                          sx={{
                            width: "90px",
                            backgroundColor: "#fff",
                            color: "green",
                            fontWeight: "700",
                            fontSize: "14px",
                            cursor: "pointer",
                            borderRadius: "7px",
                            textTransform: "none",
                            textAlign: "center",
                            display: "block",
                            border: "2px solid green",
                            "&:hover": {
                              backgroundColor: "initial ",
                              border: "2px solid green",
                              color: "green",
                            },
                          }}
                        >
                          Guardar
                        </Button>
                      </Box>
                    </>
                  )}
                </Box>
              </Box>
              {!userData && !data && (
                <Box
                  sx={{
                    height: 400,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0 !important",
                  }}
                  marginTop="1.5rem"
                >
                  <CircularProgress />
                </Box>
              )}
              {userData && data && (
                <>
                  {!formInput && (
                    <TableContainer
                      sx={{
                        width: "750px !important",
                        /* marginTop: "2rem", */
                        padding: "0 24px 0 0",
                        boxShadow: "none",
                        border: "1px solid #e9ecef",
                      }}
                      component={Paper}
                    >
                      <Table
                        aria-label="simple table"
                        sx={{ padding: "0 !important" }}
                      >
                        <TableBody>
                          <TableRow key={1}>
                            <TableCell sx={{ color: "#8f97ad" }}>
                              Especialidad
                            </TableCell>
                            <TableCell>Odontología general</TableCell>
                          </TableRow>
                          <TableRow key={2}>
                            <TableCell sx={{ color: "#8f97ad" }}>
                              Precio por consulta
                            </TableCell>
                            <TableCell>&cent;60000</TableCell>
                          </TableRow>

                          <TableRow key={3}>
                            <TableCell sx={{ color: "#8f97ad" }}>
                              Ubicación
                            </TableCell>
                            <TableCell>
                              Plaza Itskatzu, San Rafael de Escazú, Costa Rica
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </>
              )}

              {userData && data && (
                <>
                  {formInput && (
                    <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                      {/* Correo */}
                      <Grid item xs={12} sm={6}>
                        <TableContainer
                          sx={{
                            width: "750px !important",
                            /* marginTop: "2rem", */
                            padding: "0 24px 0 0",
                            boxShadow: "none",
                            border: "1px solid #e9ecef",
                          }}
                          component={Paper}
                        >
                          <Table
                            aria-label="simple table"
                            sx={{ padding: "0 !important" }}
                          >
                            <TableBody>
                              <TableRow key={1}>
                                <TableCell sx={{ color: "#8f97ad" }}>
                                  Correo
                                </TableCell>
                                <TableCell>
                                  {" "}
                                  {/* Correo */}
                                  <FormControl variant="standard" fullWidth>
                                    <Controller
                                      name="correo"
                                      control={control}
                                      //field empaquea las propiedades
                                      render={({ field }) => (
                                        <>
                                          <CssVarsProvider>
                                            <Input
                                              {...field}
                                              color="neutral"
                                              id="correo"
                                              variant="outlined"
                                              label="Correo"
                                              size="md"
                                              value={correo}
                                              onChange={handleCorreo}
                                              /* error={Boolean(errors.nombre)} */
                                            />
                                          </CssVarsProvider>
                                        </>
                                      )}
                                    />
                                  </FormControl>
                                </TableCell>
                              </TableRow>
                              <TableRow key={2}>
                                <TableCell sx={{ color: "#8f97ad" }}>
                                  Nombre
                                </TableCell>
                                <TableCell>
                                  {" "}
                                  <FormControl variant="standard" fullWidth>
                                    <Controller
                                      name="correo"
                                      control={control}
                                      //field empaquea las propiedades
                                      render={({ field }) => (
                                        <>
                                          <CssVarsProvider>
                                            <Input
                                              {...field}
                                              color="neutral"
                                              id="correo"
                                              variant="outlined"
                                              label="Correo"
                                              size="md"
                                              value={nombre}
                                              onChange={handleNombre}
                                              /* error={Boolean(errors.nombre)} */
                                            />
                                          </CssVarsProvider>
                                        </>
                                      )}
                                    />
                                  </FormControl>
                                </TableCell>
                              </TableRow>
                              <TableRow key={3}>
                                <TableCell sx={{ color: "#8f97ad" }}>
                                  Primer Apellido
                                </TableCell>
                                <TableCell>
                                  {" "}
                                  <FormControl variant="standard" fullWidth>
                                    <Controller
                                      name="correo"
                                      control={control}
                                      //field empaquea las propiedades
                                      render={({ field }) => (
                                        <>
                                          <CssVarsProvider>
                                            <Input
                                              {...field}
                                              color="neutral"
                                              id="correo"
                                              variant="outlined"
                                              label="Correo"
                                              size="md"
                                              value={primerApellido}
                                              onChange={handlePrimerApellido}
                                              /* error={Boolean(errors.nombre)} */
                                            />
                                          </CssVarsProvider>
                                        </>
                                      )}
                                    />
                                  </FormControl>
                                </TableCell>
                              </TableRow>
                              <TableRow key={4}>
                                <TableCell sx={{ color: "#8f97ad" }}>
                                  Segundo Apellido
                                </TableCell>
                                <TableCell>
                                  {" "}
                                  <FormControl variant="standard" fullWidth>
                                    <Controller
                                      name="correo"
                                      control={control}
                                      //field empaquea las propiedades
                                      render={({ field }) => (
                                        <>
                                          <CssVarsProvider>
                                            <Input
                                              {...field}
                                              color="neutral"
                                              id="correo"
                                              variant="outlined"
                                              label="Correo"
                                              size="md"
                                              value={segundoApellido}
                                              onChange={handleSegundoApellido}
                                              /* error={Boolean(errors.nombre)} */
                                            />
                                          </CssVarsProvider>
                                        </>
                                      )}
                                    />
                                  </FormControl>
                                </TableCell>
                              </TableRow>
                              <TableRow key={5}>
                                <TableCell sx={{ color: "#8f97ad" }}>
                                  Teléfono
                                </TableCell>
                                <TableCell>
                                  {" "}
                                  <FormControl variant="standard" fullWidth>
                                    <Controller
                                      name="correo"
                                      control={control}
                                      //field empaquea las propiedades
                                      render={({ field }) => (
                                        <>
                                          <CssVarsProvider>
                                            <Input
                                              {...field}
                                              color="neutral"
                                              id="correo"
                                              variant="outlined"
                                              label="Correo"
                                              size="md"
                                              value={telefono}
                                              onChange={handleTelefono}
                                              /* error={Boolean(errors.nombre)} */
                                            />
                                          </CssVarsProvider>
                                        </>
                                      )}
                                    />
                                  </FormControl>
                                </TableCell>
                              </TableRow>
                              <TableRow key={6}>
                                <TableCell sx={{ color: "#8f97ad" }}>
                                  Teléfono de emergencia
                                </TableCell>
                                <TableCell>
                                  <FormControl variant="standard" fullWidth>
                                    <Controller
                                      name="correo"
                                      control={control}
                                      //field empaquea las propiedades
                                      render={({ field }) => (
                                        <>
                                          <CssVarsProvider>
                                            <Input
                                              {...field}
                                              color="neutral"
                                              id="correo"
                                              variant="outlined"
                                              label="Correo"
                                              size="md"
                                              value={telEmergencia}
                                              onChange={handleTelEmergencia}
                                              /* error={Boolean(errors.nombre)} */
                                            />
                                          </CssVarsProvider>
                                        </>
                                      )}
                                    />
                                  </FormControl>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                    </form>
                  )}
                </>
              )}
            </TabPanel>
            {/*             <TabPanel value={value} index={2}>
              Item Three
            </TabPanel> */}
          </Box>
        </Box>
      </Box>
    </>
  );
}
