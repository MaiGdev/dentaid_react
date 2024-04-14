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
import SelectCategoria from "./selectCategoria";
import toast from "react-hot-toast";
const FormAlergia = () => {
  const navigate = useNavigate();
  const routeParams = useParams();
  const id = routeParams.id;
  const esCrear = !id;
  // Valores a precarga al actualizar
  const [values, setValues] = useState(null);

  //Esquema de validación
  const enfermedadSchema = yup.object({
    nombre: yup
      .string()
      .required("El nombre es requerido")
      .min(5, "El nombre de usuario debe tener al menos 5 caracteres")
      .matches(/^[a-zA-Z]+$/, 'Ingrese solo letras en el campo "nombre"')
      .max(20, "El nombre de usuario no puede tener más de 20 caracteres"),
    observaciones: yup
      .string()
      .required("Las observaciones son requeridas")
      .min(30, "El nombre de usuario debe tener al menos 30 caracteres")
      .max(150, "El nombre de usuario no puede tener más de 150 caracteres"),
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
      nombre: "",
      observaciones: "",
    },
    // valores a precargar
    values,

    resolver: yupResolver(enfermedadSchema),
  });

  //Valores del formulario
  const [formData, setData] = useState(null);
  //Accion POST o PUT
  const [action, setAction] = useState("POST");
  //Boolean indica el submit
  const [start, setStart] = useState(false);

  const { data, error, loaded } = useCallApi({
    endpoint: `enfermedad/${id}`,
  });

  //Enviar los valores al API
  const { responseData, errorData, loadedData } = useSubmitForm({
    endpoint: "enfermedad",
    action,
    formData,
    start,
  });

  //Submit del formulario
  const onSubmit = (DataForm) => {
    try {
      // Establecer valores del formulario
      console.log(DataForm);
      setData(DataForm);
      // Indicar que se puede realizar la solicitud al API
      setStart(true);
      // Establecer el tipo de métod HTTP
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
      // Si hay respuesta se creo o modifico lo redirecciona
      return navigate("/enfermedad");
    }
    if (!esCrear && data) {
      // Si es modificar establece los valores a precargar en el formulario
      setValues(data);
      console.log(data);
    }
  }, [responseData, data, esCrear, action]);

  /*  */
  return (
    <>
      <Box height={30} />
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
              width: "80%",
              padding: "3rem",
              background: "#e9ecef",
              borderRadius: "20px",
            }}
          >
            <h1 style={{ fontWeight: "500" }}>
              {esCrear ? "Crear" : "Modificar"} Enfermedad
            </h1>
            <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
              <Grid container spacing={3}>
                {/* nombre */}
                <Grid item xs={12} sm={12}>
                  {/* nombre */}
                  <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                    <Controller
                      name="nombre"
                      control={control}
                      //field empaquea las propiedades
                      render={({ field }) => (
                        <>
                          <CssVarsProvider>
                            <FormLabel sx={{ marginBottom: ".5rem" }}>
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
                              placeholder="Digite el nombre"
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

                {/* observaciones */}
                <Grid item xs={12} sm={12}>
                  {/* observaciones */}
                  <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                    <Controller
                      name="observaciones"
                      control={control}
                      //field empaquea las propiedades
                      render={({ field }) => (
                        <>
                          <CssVarsProvider>
                            <FormLabel sx={{ marginBottom: ".5rem" }}>
                              Observaciones
                            </FormLabel>
                            <Textarea
                              {...field}
                              color="primary"
                              disabled={false}
                              minRows={3}
                              placeholder="Digite las observaciones"
                              size="lg"
                              variant="outlined"
                            />
                            {errors.observaciones ? (
                              <FormHelperText sx={{ color: "red" }}>
                                {errors.observaciones.message}
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
      </Box>
    </>
  );
};

export default FormAlergia;
