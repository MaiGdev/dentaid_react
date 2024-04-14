import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useCallApi } from "../../../../hooks/useCallApi";
import React from "react";
import { CssVarsProvider } from "@mui/joy";
import FormLabel from "@mui/joy/FormLabel";
import { Box } from "@mui/material";

export default function SelectTipoSangre(field) {
  const { data, error, loaded } = useCallApi({
    endpoint: "enfermedad",
  });

  const options = [
    { id: 1, tipo: "A+" },
    { id: 2, tipo: "A-" },
    { id: 3, tipo: "B+" },
    { id: 4, tipo: "B-" },
    { id: 5, tipo: "AB+" },
    { id: 6, tipo: "AB-" },
    { id: 7, tipo: "O+" },
    { id: 8, tipo: "O-" },
  ];

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
                width: "12.3rem",

                /* position: "absolute", */
              }}
            >
              {options.map((op) => (
                <MenuItem value={op.id} key={op.id}>
                  {op.tipo}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </>
      )}
    </>
  );
}
