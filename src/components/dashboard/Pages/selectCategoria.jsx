import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useCallApi } from "../../../hooks/useCallApi";
import React from "react";
import { CssVarsProvider } from "@mui/joy";
import FormLabel from "@mui/joy/FormLabel";
import { Box } from "@mui/material";

export default function SelectCategoria(field) {
  const { data, error, loaded } = useCallApi({
    endpoint: "alergia/categorias",
  });
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <>
      {loaded && (
        <>
          {/*           <InputLabel id="categoria">
            <strong>Categoria</strong>
          </InputLabel> */}
          <Box
            sx={{
              position: "relative",
            }}
          >
            <CssVarsProvider>
              <FormLabel sx={{ position: "absolute", bottom: "50px" }}>
                Categoria
              </FormLabel>
            </CssVarsProvider>
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
              {...field}
              id="idcategoriaAlergia"
              labelId="idcategoriaAlergia"
              label="idcategoriaAlergia"
              /* multiple */
              /* defaultValue={[]} */
              value={field.field.value}
            >
              {data.map((cat) => (
                <MenuItem
                  value={cat.idcategoriaAlergia}
                  key={cat.idcategoriaAlergia}
                >
                  {cat.categoria}
                </MenuItem>
              ))}
              {/*             <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
          </Box>
        </>
      )}
    </>
  );
}
