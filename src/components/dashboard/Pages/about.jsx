import React from "react";
import Dash from "./Dash";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Navbar from "./Navbar";

const Dabout = () => {
  return (
    <>
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Dash />
        <Box
          component="main"
          /* #edeff1 */
          sx={{ flexGrow: 1, p: 10, background: "#fff", height: "100vh" }}
        >
          <h1>About</h1>
        </Box>
      </Box>
    </>
  );
};

export default Dabout;
