import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useCallApi } from "../../../hooks/useCallApi";
import React from "react";
import { CssVarsProvider } from "@mui/joy";
import FormLabel from "@mui/joy/FormLabel";
import { Box } from "@mui/material";

export default function SelectCategoria(field, data) {
  /*   const { data, error, loaded } = useCallApi({
    endpoint: "alergia/categorias",
  }); */

  const estados = [
    { id: 1, estado: "Activo" },
    { id: 2, estado: "Pendiente" },
    { id: 3, estado: "Inactivo" },
  ];
  /*   const estados = ["Pendiente", "Activo", "Inactivo"]; */

  return (
    <>
      {/*   {loaded && ( */}
      <>
        <h2 style={{ marginBottom: "2rem" }}>Seleccione un estado</h2>
        <Box
          sx={{
            position: "relative",
          }}
        >
          <CssVarsProvider>
            <FormLabel
              sx={{
                position: "absolute",
                bottom: "65px",
              }}
            >
              Estado
            </FormLabel>
          </CssVarsProvider>
          <Select
            sx={{
              borderRadius: "10px",
              background: "#fff",
              height: "40px",
              width: "30.75rem",
              padding: "0.5rem",
              marginBottom: "1rem",

              /* position: "absolute", */
            }}
            {...field}
            id="estado"
            labelId="estado"
            label="estado"
            value={field.field.value.id}
          >
            {estados.map((est, index) => (
              <MenuItem value={est.id} key={est.id}>
                {est.estado}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </>
      {/* )} */}
    </>
  );
}
