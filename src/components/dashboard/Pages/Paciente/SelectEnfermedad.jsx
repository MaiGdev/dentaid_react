import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useCallApi } from "../../../../hooks/useCallApi";
import React from "react";
import { CssVarsProvider } from "@mui/joy";
import FormLabel from "@mui/joy/FormLabel";
import { Box } from "@mui/material";

export default function SelectEnfermedad(field) {
  const { data, error, loaded } = useCallApi({
    endpoint: "enfermedad",
  });
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
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
              defaultValue={[]}
            >
              {data.map((cat) => (
                <MenuItem value={cat.idEnfermedad} key={cat.idEnfermedad}>
                  {cat.nombre}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </>
      )}
    </>
  );
}
