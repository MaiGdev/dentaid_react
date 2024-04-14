import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useCallApi } from "../../../../hooks/useCallApi";
import React from "react";
import { CssVarsProvider } from "@mui/joy";
import FormLabel from "@mui/joy/FormLabel";
import { Box } from "@mui/material";

export default function SelectSexo(field) {
  const { data, error, loaded } = useCallApi({
    endpoint: "enfermedad",
  });

  const options = [
    { id: 1, sexo: "masculino" },
    { id: 2, sexo: "femenino" },
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
                /*     padding: "0.5rem", */
                /* position: "absolute", */
              }}
            >
              {options.map((op) => (
                <MenuItem value={op.id} key={op.id}>
                  {op.sexo}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </>
      )}
    </>
  );
}
