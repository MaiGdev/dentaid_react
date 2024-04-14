import { React, useState } from "react";
import Dash from "./Dash";
import Box from "@mui/material/Box";
import Agenda from "./Agenda";
import "./CalendarStyles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const HorarioAgenda = () => {
  return (
    <>
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Dash />
        <Box
          component="main"
          /* #edeff1 */
          sx={{ flexGrow: 1, p: 5, background: "#fff", height: "100vh" }}
        >
          {/*           <h1 style={{ marginBottom: "3rem", color: "#064588" }}>
            Horarios y Agenda
          </h1> */}

          <Agenda></Agenda>
        </Box>
      </Box>
    </>
  );
};

export default HorarioAgenda;
