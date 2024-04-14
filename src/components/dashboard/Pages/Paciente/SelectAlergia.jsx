import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useCallApi } from "../../../../hooks/useCallApi";
import React from "react";
import { CssVarsProvider } from "@mui/joy";
import FormLabel from "@mui/joy/FormLabel";
import { Box } from "@mui/material";

export default function SelectAlergia({ onChange }) {
  //pasamos la funcion onChange como prop al componente
  const { data, error, loaded } = useCallApi({
    endpoint: "alergia/categorias",
  });
  const [selectedValues, setSelectedValues] = React.useState([]); //agregamos el estado para almacenar los valores seleccionados

  const handleChange = (event) => {
    setSelectedValues(event.target.value); //actualizamos el estado cuando cambia el valor seleccionado
    onChange(event.target.value); //ejecutamos la funcion onChange para pasar el valor seleccionado al componente Expediente
  };
  return (
    <>
      {loaded && (
        <>
          <Box
            sx={{
              position: "relative",
            }}
          >
            <Select
              sx={{
                borderRadius: "10px",
                background: "#fff",
                height: "40px",
                width: "23.75rem",
                maxWidth: "23.75rem",
                padding: "0.5rem",
                /* position: "absolute", */
              }}
              multiple
              value={selectedValues} //pasamos el estado como valor seleccionado
              onChange={handleChange} //pasamos la funcion handleChange como manejador de cambios
            >
              {data.map((cat) => (
                <MenuItem
                  value={cat.idcategoriaAlergia}
                  key={cat.idcategoriaAlergia}
                >
                  {cat.categoria}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </>
      )}
    </>
  );
}
