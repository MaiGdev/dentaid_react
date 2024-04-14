import { Box, Button, styled, Typography } from "@mui/material";
import React from "react";

import dienteBrillante from "../../media/SVG/dienteBrillante.png";
import dienteOrtodoncia from "../../media/SVG/dienteOrtodoncia.png";
import dienteTornillo from "../../media/SVG/dienteTornillo.png";

import CustomButton from "./CustomButton";

const Service = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "85%",
    },
  }));

  const GuidesBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    width: "70%",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0",
      flexDirection: "column",
    },
  }));

  const GuideBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2, 0, 2, 0),
    },
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "5%",
          height: "5px",
          backgroundColor: "#000339",
          margin: "2rem auto 0 auto",
        }}
      ></div>

      <Typography
        variant="h3"
        sx={{ fontSize: "35px", fontWeight: "bold", color: "#000339", my: 3 }}
      >
        Servicios
      </Typography>

      <CustomBox>
        <Typography
          variant="body2"
          sx={{
            fontSize: "16px",
            fontWeight: "500",
            color: "#5A6473",
            textAlign: "center",
          }}
        >
          ¡Mejor vida a través de mejor salud dental!
        </Typography>
      </CustomBox>

      <GuidesBox>
        <GuideBox>
          <img
            width={"150px"}
            height={"150px"}
            src={dienteBrillante}
            alt="buyIcon"
          />

          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#3B3c45",
              my: 1,
            }}
          >
            Estética Dental
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", fontSize: "14px", color: "#0689FF" }}
          >
            Mejor salud y apariencia bocal
          </Typography>
        </GuideBox>

        <GuideBox>
          <img
            width={"150px"}
            height={"150px"}
            src={dienteOrtodoncia}
            alt="buyIcon"
          />

          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#3B3c45",
              my: 1,
            }}
          >
            Ortodoncia
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", fontSize: "14px", color: "#0689FF" }}
          >
            Prevenir alteraciones en los dientes
          </Typography>
        </GuideBox>

        <GuideBox>
          <img
            width={"150px"}
            height={"150px"}
            src={dienteTornillo}
            alt="buyIcon"
          />

          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#3B3c45",
              my: 1,
            }}
          >
            Implantes dentales
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", fontSize: "14px", color: "#0689FF" }}
          >
            Una sonrisa saludable y radiante
          </Typography>
        </GuideBox>
      </GuidesBox>

      <CustomButton
        backgroundColor="#0F1B4C"
        color="#fff"
        buttonText="Mira todos nuestros servicios"
        guideBtn={true}
      />

      <div
        style={{
          width: "5%",
          height: "5px",
          backgroundColor: "#000339",
          margin: "2rem auto 0 auto",
        }}
      ></div>
    </Box>
  );
};

export default Service;
