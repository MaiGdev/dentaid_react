import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import styled from "styled-components";
import img404 from "../../../media/404.png";
export function Unauthorized() {
  const navigate = useNavigate();
  const ImgContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "auto",
    margin: "0",
    /*     padding: "1.7rem 1rem .75rem 1rem", */
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }));
  return (
    <>
      <Box
        sx={{
          display: "flex",
          background: "#ebf2fc",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 10,
            background: "#fff",
            height: "80vh",

            width: "70%",
            padding: "3rem",
            /* background: "#e9ecef", */
            borderRadius: "15px",
          }}
        >
          <Box>
            <Container
              sx={{
                width: "100vw",
                /* height: "100vh", */
                paddingBottom: "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              maxWidth="sm"
            >
              <ImgContainer marginBottom={"1rem"}>
                <img
                  src={img404}
                  alt=""
                  style={{
                    /* minWidth: "100%", */
                    /* maxwidth: "30rem", */
                    height: "240px",
                    /*   marginTop: "", */
                    padding: "0",
                  }}
                />
              </ImgContainer>
              <Typography
                component="h4"
                variant="h4"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Ooops!
              </Typography>
              <Typography
                component="span"
                variant="span"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Parece que algo salió mal.
              </Typography>
              <Grid item xs={12} sm={12}>
                <Button
                  onClick={() => {
                    navigate("/");
                  }}
                  variant="contained"
                  color="info"
                  sx={{ m: 1 }}
                >
                  Volver
                </Button>
              </Grid>
            </Container>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Unauthorized;
