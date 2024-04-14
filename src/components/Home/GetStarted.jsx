import { Button, styled, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import homeIllustration from "../../media/illustration.png";
import CustomButton from "./CustomButton";

const GetStarted = () => {
  const CustomContainer = styled(Container)(({ theme }) => ({
    backgroundColor: "#17275F",
    height: "516px",
    borderRadius: "15px",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    /* width: "92%", */

    [theme.breakpoints.down("md")]: {
      height: "auto",
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(3, 3, 0, 3),
      width: "95%",
      margin: " 3rem auto 3rem auto",
      /*  padding: "3rem auto 3rem auto", */
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      /*       height: "auto",
      width: "100%",
      margin: " 3rem 0",
      display: "none", */
    },
  }));

  const CustomBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(10, 0, 10, 0),
    margin: theme.spacing(0, 2, 0, 2),
    width: "80%",
    margin: "0 auto",
    [theme.breakpoints.down("md")]: {
      padding: "0",
      width: "90%",
    },
    [theme.breakpoints.down("sm")]: {
      /* aqui */
      padding: "1rem",
      width: "100%",
      fontSize: "2px",
    },
  }));

  const CustomBoxImg = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  const CustomBoxSign = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      padding: "0",
    },
  }));

  return (
    <CustomBox>
      <CustomContainer>
        <Box>
          <Typography
            sx={{
              fontSize: "35px",
              color: "white",
              fontWeight: "700",
              maxWidth: "28rem",
            }}
          >
            Toma el mando de tu vida y transfórmala!
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#ccc",
              fontWeight: "500",
              maxWidth: "28rem",
              my: 3,
            }}
          >
            En DentalAid, estamos revolucionando la forma en que se accede a la
            atención médica. ¡Únete a nosotros y da el primer paso hacia un
            cambio positivo hoy mismo!
          </Typography>

          <CustomButton
            backgroundColor="#fff"
            color="#17275F"
            buttonText="Agenda tu cita"
            getStartedBtn={true}
          />
        </Box>

        <img
          src={homeIllustration}
          alt="illustration"
          style={{ maxWidth: "100%" }}
        />
      </CustomContainer>
    </CustomBox>
  );
};

export default GetStarted;
