import { Box, Button, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

//import heroImg from "../media/hero_illustration.png";
import heroImg from "../../media/logo9_3.png";
import CustomButton from "./CustomButton";
import { Padding } from "@mui/icons-material";

import NavBar from "./Navbar";
import Companies from "./Companies";
import Service from "./Service";
import Details from "./Details";
import GetStarted from "./GetStarted";

const Hero = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    marginTop: theme.spacing(0),
    [theme.breakpoints.down("md")]: {
      padding: "0 0 0 0",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));
  const CustomBoxImg = styled(Box)(({ theme }) => ({
    padding: "4rem 0 3rem 0rem",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "44px",
    color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("m")]: {
      fontSize: "20px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
  }));

  const url = window.location.href;

  return (
    <>
      <Box sx={{ backgroundColor: "#f5fafe", minHeight: "80vh" }}>
        <Container>
          {/* {url.includes("ttp://localhost:") ? <NavBar /> : ""} */}
          <NavBar />
          <CustomBox>
            <Box sx={{ flex: "1.25" }}>
              <Typography
                variant="body2"
                className="ejemplo"
                sx={{
                  fontSize: "1.125rem",
                  color: "#687690",
                  fontWeight: "500",
                  mt: 7,
                  mb: 4,
                }}
              >
                Bienvenido a DentAid
              </Typography>
              <Title variant="h1">
                Programa tus citas médicas en línea de manera rápida y sencilla
              </Title>
              <Typography
                variant="body2"
                sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
              >
                No más esperas en la línea telefónica o en la sala de espera del
                consultorio. Con solo unos pocos clics, podrás encontrar al
                especialista que necesitas y reservar una cita en un horario
                conveniente para ti. Además, podrás acceder a tus historiales
                médicos y resultados de exámenes desde la comodidad de tu hogar.
                ¡Programa tu próxima cita en línea hoy mismo y disfruta de una
                experiencia de atención médica más eficiente y cómoda!
              </Typography>
              <CustomButton
                backgroundColor="#0F1B4C"
                color="#fff"
                buttonText="Más sobre nosotos"
                heroBtn={true}
              />
            </Box>

            <Box
              style={
                {
                  /* padding: "4rem 0 3rem 0rem", */
                }
              }
              sx={{ flex: "1" }}
            >
              <CustomBoxImg>
                <img
                  src={heroImg}
                  alt="heroImg"
                  style={{ maxWidth: "100%", marginBottom: "2rem" }}
                />
              </CustomBoxImg>
            </Box>
          </CustomBox>
        </Container>
      </Box>
      <Box sx={{ minHeight: "80vh" }}>
        <Service></Service>
        <Details></Details>
        <Companies></Companies>
        <GetStarted></GetStarted>
        <Footer />
      </Box>
    </>
  );
};

export default Hero;
