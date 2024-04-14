import { Box, Container, styled, Typography } from "@mui/material";
import React from "react";
import ucrImg from "../../media/ucr.jpg";
import colCiruImg from "../../media/colegio-cirujanos.jpg";
import pediatriaImg from "../../media/pediatria.jpg";
import acpImg from "../../media/acp.jpg";

const Companies = () => {
  const CustomContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      margin: theme.spacing(4),
      padding: theme.spacing(4),
    },
  }));

  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2, 0, 2, 0),
    },
  }));

  const CustomImg = styled(Box)(({ theme }) => ({
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
      flexDirection: "column",
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
    padding: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2, 0, 2, 0),
    },
  }));

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "4rem",
        }}
      >
        <div
          style={{
            width: "5%",
            height: "5px",
            backgroundColor: "#000339",
            margin: "0 auto 0 auto",
          }}
        ></div>

        <Typography
          variant="h3"
          sx={{ fontSize: "35px", fontWeight: "bold", color: "#000339", m: 0 }}
        ></Typography>

        <CustomBox>
          <Typography
            variant="body2"
            sx={{
              fontSize: "35px",
              fontWeight: "bold",
              color: "#000339",
              textAlign: "center",
              m: 0,
            }}
          >
            SOMOS MIEMBROS DE
          </Typography>
        </CustomBox>

        <GuidesBox
          sx={{
            m: 0,
          }}
        >
          <GuideBox>
            <img src={ucrImg} alt="ucr" />
          </GuideBox>

          <GuideBox>
            <img src={colCiruImg} alt="buyIcon" />
          </GuideBox>

          <GuideBox>
            <img src={pediatriaImg} alt="buyIcon" />
          </GuideBox>
          <GuideBox>
            <img src={acpImg} alt="buyIcon" />
          </GuideBox>
        </GuidesBox>

        <div
          style={{
            width: "5%",
            height: "5px",
            backgroundColor: "#000339",
            margin: "2.5rem auto 0rem auto",
          }}
        ></div>
      </Box>
    </>
  );
};

export default Companies;
