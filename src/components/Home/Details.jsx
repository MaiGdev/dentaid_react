import { styled, Typography } from "@mui/material";
import { Box, Container, height } from "@mui/system";
import React from "react";
import inicio from "../../media/sign.png";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import QueuePlayNextIcon from "@mui/icons-material/QueuePlayNext";
const Details = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: theme.spacing(10),

    alignItems: "flex-start",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      textAlign: "start",
    },
  }));

  const ImgContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    borderRadius: "30px",
  }));

  const LargeText = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000",
    fontWeight: "700",
    [theme.breakpoints.down("md")]: {
      fontSize: "32px",
    },
  }));

  const SmallText = styled(Typography)(({ theme }) => ({
    fontSize: "18px",
    color: "#7B8087",
    fontWeight: "500",
    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
    },
  }));

  const TextFlexbox = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(7),
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(0, 5, 0, 5),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: theme.spacing(5),
    },
  }));

  const Divider = styled("div")(({ theme }) => ({
    width: "13%",
    height: "5px",
    backgroundColor: "#000339",
    [theme.breakpoints.down("md")]: {
      marginLeft: "auto",
      marginRight: "auto",
    },
  }));

  return (
    <Box sx={{ mt: 5, backgroundColor: "#F5FAFE", py: 10 }}>
      <Container>
        <CustomBox>
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontSize: "20px",
                fontWeight: "500",
                color: "#6574a2",
                textAlign: "left",
                padding: "0 0 1rem 0",
              }}
            >
              Como funciona
            </Typography>

            {/*  <Divider /> */}
            <Typography
              sx={{
                variant: "h2",
                fontSize: "2.7rem",
                lineHeight: "55px",
                color: "#000339",
                fontWeight: "500",
                my: 0,
              }}
            >
              El médico que necesitas está al alcance de tus manos
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontSize: "1rem",
                fontWeight: "100",
                color: "#5A6473",
                textAlign: "left",
                /*   padding: ".5rem", */
              }}
            >
              Consigue la orientación médica que precisas en tan solo cuatro
              fáciles pasos.
            </Typography>

            <Box>
              <Typography
                /* raiz */
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                paragraph={true}
                sx={{}}
                margin={" 1rem 0 0 0"}
              >
                <Typography
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  paragraph={true}
                  sx={{}}
                >
                  <SearchIcon></SearchIcon>
                </Typography>

                <Typography
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  paragraph={true}
                  sx={{}}
                >
                  <Typography
                    variant="body2"
                    fontSize={"24px"}
                    fontWeight={"500"}
                    padding={"0"}
                    sx={{
                      paddingLeft: "1rem",
                      fontWeight: "500",
                      paddingTop: "10px",
                    }}
                  >
                    Escoge A Tu Especialista
                  </Typography>
                  <Typography
                    variant="body2"
                    fontSize={"16px"}
                    sx={{
                      paddingLeft: "1rem",
                      paddingBottom: "10px",
                      fontWeight: "100",
                      fontWeight: "100",
                      color: "#5A6473",
                    }}
                  >
                    Crea tu perfil en DentAid y encuentra el médico indicado
                    para ti.
                  </Typography>
                </Typography>
              </Typography>

              <Typography
                /* raiz */
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                paragraph={true}
                sx={{}}
              >
                <Typography
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  paragraph={true}
                  sx={{}}
                >
                  <FolderCopyIcon></FolderCopyIcon>
                </Typography>
                <Typography
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  paragraph={true}
                  sx={{}}
                >
                  <Typography
                    variant="body2"
                    fontSize={"24px"}
                    fontWeight={"500"}
                    padding={"0"}
                    sx={{ paddingLeft: "1rem" }}
                  >
                    Selecciona Tu Servicio
                  </Typography>
                  <Typography
                    variant="body2"
                    fontSize={"16px"}
                    sx={{
                      paddingLeft: "1rem",
                      fontWeight: "100",
                      color: "#5A6473",
                    }}
                  >
                    Escoge una consulta o segunda opinión para tener una cita
                    virtual con uno de nuestros médicos.
                  </Typography>
                </Typography>
              </Typography>

              <Typography
                /* raiz */
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                paragraph={true}
                sx={{}}
              >
                <Typography
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  paragraph={true}
                  sx={{}}
                >
                  <CalendarTodayIcon></CalendarTodayIcon>
                </Typography>
                <Typography
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  paragraph={true}
                  sx={{}}
                >
                  <Typography
                    variant="body2"
                    fontSize={"24px"}
                    fontWeight={"500"}
                    padding={"0"}
                    sx={{ paddingLeft: "1rem" }}
                  >
                    Programa Tu Cita
                  </Typography>
                  <Typography
                    variant="body2"
                    fontSize={"16px"}
                    sx={{
                      paddingLeft: "1rem",
                      fontWeight: "100",
                      color: "#5A6473",
                    }}
                  >
                    Planifica tu encuentro mediante nuestra herramienta DentAid.
                    Una vez que tu cita sea confirmada, llevaremos a cabo el
                    procesamiento de tu pago de manera segura y confiable.
                  </Typography>
                </Typography>
              </Typography>

              <Typography
                /* raiz */
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                paragraph={true}
                sx={{}}
              >
                <Typography
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  paragraph={true}
                  sx={{}}
                >
                  <QueuePlayNextIcon></QueuePlayNextIcon>
                </Typography>
                <Typography
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  paragraph={true}
                  sx={{}}
                >
                  <Typography
                    variant="body2"
                    fontSize={"24px"}
                    fontWeight={"500"}
                    padding={"0"}
                    sx={{ paddingLeft: "1rem" }}
                  >
                    Obtén Una Cita Médica En Linea
                  </Typography>
                  <Typography
                    variant="body2"
                    fontSize={"16px"}
                    sx={{
                      paddingLeft: "1rem",
                      fontWeight: "100",
                      color: "#5A6473",
                    }}
                  >
                    Conéctate a una reunión virtual desde cualquier lugar y
                    mantén una comunicación constante sobre tu estado de salud a
                    través de nuestro sistema de mensajería integrado en la
                    aplicación.
                  </Typography>
                </Typography>
              </Typography>
            </Box>
          </Box>

          <ImgContainer>
            <img
              src={inicio}
              alt="house"
              style={{
                /* minWidth: "100%", */
                /* maxwidth: "30rem", */
                height: "620px",
                borderRadius: "25px",
              }}
            />
          </ImgContainer>
        </CustomBox>
      </Container>
    </Box>
  );
};

export default Details;
