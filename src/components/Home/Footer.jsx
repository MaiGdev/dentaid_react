import { styled, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";

import logoImg from "../../media/logofooter.png";
import fbIcon from "../../media/fbicon.png";
import twitterIcon from "../../media/twittericon.png";
import linkedinIcon from "../../media/linkedinicon.png";

const Footer = () => {
  const CustomContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    gap: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      textAlign: "center",
    },
  }));

  const IconBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  }));

  const FooterLink = styled("span")(({ theme }) => ({
    fontSize: "16px",
    color: "#7A7A7E",
    fontWeight: "300",
    cursor: "pointer",
    "&:hover": {
      color: "#000",
    },
  }));

  return (
    <Box sx={{ py: 10 }}>
      <CustomContainer>
        <CustomContainer>
          <Box>
            <IconBox>
              <img
                src={logoImg}
                alt="fbIcon"
                style={{ cursor: "pointer", maxWidth: "200px" }}
              />
            </IconBox>
            <br />
            <Typography
              sx={{
                fontSize: "16px",
                color: "#7A7A7E",
                fontWeight: "500",
                mb: 2,
                maxWidth: "280px",
              }}
            >
              Proporcionando servicios de atención médica de alto nivel sin
              necesidad de salir de sus hogares.
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#1C1C1D",
                fontWeight: "700",
                mb: 2,
              }}
            >
              Enlaces de Interés
            </Typography>

            <FooterLink>Nuestros Médicos</FooterLink>
            <br />
            <FooterLink>Quienes Somos</FooterLink>
            <br />
            <FooterLink>Términos y Condiciones</FooterLink>
            <br />
            <FooterLink>Política de Privacidad</FooterLink>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#1C1C1D",
                fontWeight: "700",
                mb: 2,
              }}
            >
              {" "}
              Regístrate
            </Typography>

            <FooterLink> Inicio de Sesión</FooterLink>
            <br />
            <FooterLink> Regístrate</FooterLink>
            <br />
            <FooterLink> Preguntas Frecuentes</FooterLink>
            <br />
            <FooterLink>Contacto</FooterLink>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#1C1C1D",
                fontWeight: "700",
                mb: 2,
              }}
            >
              ¿Tienes Preguntas?
            </Typography>
            <FooterLink sx={{ maxWidth: "10px" }}>
              Envíanos un correo a:
            </FooterLink>
            <br />
            <FooterLink>support@dentaidclinic.com</FooterLink>
            <br />
            <FooterLink>Síguenos</FooterLink>
            <br /> <br />
            <IconBox>
              <img src={fbIcon} alt="fbIcon" style={{ cursor: "pointer" }} />
              <img
                src={twitterIcon}
                alt="twitterIcon"
                style={{ cursor: "pointer" }}
              />
              <img
                src={linkedinIcon}
                alt="linkedinIcon"
                style={{ cursor: "pointer" }}
              />
            </IconBox>
          </Box>
        </CustomContainer>
      </CustomContainer>
    </Box>
  );
};

export default Footer;
