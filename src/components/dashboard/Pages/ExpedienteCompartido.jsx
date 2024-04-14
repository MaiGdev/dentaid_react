import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Dash from "./Dash";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import logoImg from "../../../media/imgPdf.png";
import {
  Divider,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { Table } from "react-bootstrap";
import { useCallApi } from "../../../hooks/useCallApi";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function ExpedienteCompartido() {
  const { user, decodeToken, autorize } = useContext(UserContext);
  const [userData, setUserData] = useState(decodeToken());

  const routeParams = useParams();
  const id = routeParams.id;
  const { data, error, loaded } = useCallApi({
    endpoint: `expediente/${id}`,
  });
  /*  const { dataUsuario } = useCallApi({
    endpoint: `usuario/${id}`,
  }); */
  const [dataAlergia, setAlergias] = useState([]);
  const [dataUsuario, setUsuario] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:81/dentaid/expediente/getAlergiaExpediente/${id}`
      );

      const dataF = await response.json();
      setAlergias(dataF.results);
      /*       console.log(dataF.results); */
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:81/dentaid/usuario/${id}`);

      const dataF = await response.json();
      setUsuario(dataF.results);
      /*       console.log(dataF.results); */
    }
    fetchData();
  }, []);

  const ImgContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "auto",
    margin: "0",
    /*     padding: "1.7rem 1rem .75rem 1rem", */
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    /*       [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }, */
  }));
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
          {!data && (
            <Box sx={{ backgroundColor: "#eee" }}>
              <ImgContainer marginBottom={"1rem"}>
                <img
                  src={logoImg}
                  alt=""
                  style={{
                    /* minWidth: "100%", */
                    /* maxwidth: "30rem", */
                    height: "11rem",
                    /*   marginTop: "", */
                    padding: "0",
                  }}
                />
              </ImgContainer>
              <Divider />

              {/* Datos personales */}
              <Box>
                <Box
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <h2>Datos Personales</h2>
                </Box>
                <Box
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "left",
                    width: "100%",
                  }}
                >
                  <h4 style={{ padding: "0 3rem", minWidth: "300px" }}>
                    Nombre
                  </h4>
                  <h4 style={{ minWidth: "300px" }}>Jennifer Smith Jones</h4>
                </Box>
                <Box
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "left",
                    width: "40%",
                  }}
                >
                  <h4 style={{ padding: "0 3rem", minWidth: "300px" }}>Sexo</h4>
                  <h4 style={{ minWidth: "300px" }}>femenino</h4>
                </Box>
                <Box
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "left",
                    width: "40%",
                  }}
                >
                  <Box>
                    <h4 style={{ padding: "0 3rem", minWidth: "300px" }}>
                      Tipo de sangre
                    </h4>
                  </Box>
                  <Box>
                    <h4 style={{ minWidth: "300px" }}>B+</h4>
                  </Box>
                </Box>
                <Box
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "left",
                    width: "40%",
                  }}
                >
                  <h4 style={{ padding: "0 3rem", minWidth: "300px" }}>
                    Fecha de nacimiento
                  </h4>
                  <h4 style={{ minWidth: "300px" }}>2005-01-12</h4>
                </Box>
              </Box>

              {/* Alergias */}
              <Box>
                <Box
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <h3>Alergias</h3>
                </Box>
                <Box
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "left",
                    width: "100%",
                  }}
                >
                  <h4 style={{ padding: "0 3rem", minWidth: "300px" }}>
                    Nombre
                  </h4>
                  <h4 style={{ minWidth: "300px" }}>Jennifer Smith Jones</h4>
                </Box>
              </Box>

              {/* Enfermedades */}
              <Box>
                <Box
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <h3>Enfermedades</h3>
                </Box>
                <Box
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "left",
                    width: "100%",
                  }}
                >
                  <h4 style={{ padding: "0 3rem", minWidth: "300px" }}>
                    Nombre
                  </h4>
                  <h4 style={{ minWidth: "300px" }}>Jennifer Smith Jones</h4>
                </Box>
              </Box>

              {/*  Medicamentos*/}
              <Box>
                <Box
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <h3>Medicamentos</h3>
                </Box>
                <Box
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "left",
                    width: "100%",
                  }}
                >
                  <h4 style={{ padding: "0 3rem", minWidth: "300px" }}>
                    Nombre
                  </h4>
                  <h4 style={{ minWidth: "300px" }}>Jennifer Smith Jones</h4>
                </Box>
              </Box>

              {/* Cirugias */}
              <Box>
                <Box
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <h3>Cirugias programadas</h3>
                </Box>
                <Box
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "left",
                    width: "100%",
                  }}
                >
                  <h4 style={{ padding: "0 3rem", minWidth: "300px" }}>
                    Nombre
                  </h4>
                  <h4 style={{ minWidth: "300px" }}>Jennifer Smith Jones</h4>
                </Box>
              </Box>
            </Box>
          )}
          {data && dataAlergia && (
            <Box sx={{ backgroundColor: "#eee" }}>
              <ImgContainer marginBottom={"1rem"}>
                <img
                  src={logoImg}
                  alt=""
                  style={{
                    /* minWidth: "100%", */
                    /* maxwidth: "30rem", */
                    height: "11rem",
                    /*   marginTop: "", */
                    padding: "0",
                  }}
                />
              </ImgContainer>
              <Divider />

              {/* Datos personales */}
              <Box>
                <Box
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <h2>Datos Personales</h2>
                </Box>
                <Box
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "left",
                    width: "100%",
                  }}
                >
                  <h4 style={{ padding: "0 3rem", minWidth: "300px" }}>
                    Nombre
                  </h4>

                  <h4 style={{ minWidth: "300px" }}>
                    {dataUsuario.nombre} {dataUsuario.primerApellido}{" "}
                    {dataUsuario.segundoApellido}
                  </h4>
                </Box>
                <Box
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "left",
                    width: "40%",
                  }}
                >
                  <h4 style={{ padding: "0 3rem", minWidth: "300px" }}>Sexo</h4>
                  <h4 style={{ minWidth: "300px" }}>{data.sexo}</h4>
                </Box>
                <Box
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "left",
                    width: "40%",
                  }}
                >
                  <Box>
                    <h4 style={{ padding: "0 3rem", minWidth: "300px" }}>
                      Tipo de sangre
                    </h4>
                  </Box>
                  <Box>
                    <h4 style={{ minWidth: "300px" }}>{data.tipoSangre}</h4>
                  </Box>
                </Box>
                <Box
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "left",
                    width: "40%",
                  }}
                >
                  <h4 style={{ padding: "0 3rem", minWidth: "300px" }}>
                    Fecha de nacimiento
                  </h4>
                  <h4 style={{ minWidth: "300px" }}>{data.fechaNacimiento}</h4>
                </Box>
              </Box>

              {/* Alergias */}
              <Box>
                <Box
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "left",
                    paddingLeft: "4rem",
                  }}
                >
                  <h3>Alergias</h3>
                </Box>
                <Box
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "left",
                    width: "100%",
                  }}
                >
                  {dataAlergia && (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {dataAlergia.map((op) => (
                        <h4
                          key={op.id}
                          style={{
                            padding: "0 3rem",
                            minWidth: "300px",
                            display: "block",
                          }}
                        >
                          {op.nombre}
                        </h4>
                      ))}
                    </div>
                  )}
                </Box>
              </Box>

              {/* Enfermedades */}
              <Box>
                <Box
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <h3>Enfermedades</h3>
                </Box>
                <Box
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "left",
                    width: "100%",
                  }}
                >
                  <h4 style={{ padding: "0 3rem", minWidth: "300px" }}>
                    Nombre
                  </h4>
                  <h4 style={{ minWidth: "300px" }}>Jennifer Smith Jones</h4>
                </Box>
              </Box>

              {/*  Medicamentos*/}
              <Box>
                <Box
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <h3>Medicamentos</h3>
                </Box>
                <Box
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "left",
                    width: "100%",
                  }}
                >
                  <h4 style={{ padding: "0 3rem", minWidth: "300px" }}>
                    Nombre
                  </h4>
                  <h4 style={{ minWidth: "300px" }}>Jennifer Smith Jones</h4>
                </Box>
              </Box>

              {/* Cirugias */}
              <Box>
                <Box
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <h3>Cirugias programadas</h3>
                </Box>
                <Box
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "left",
                    width: "100%",
                  }}
                >
                  <h4 style={{ padding: "0 3rem", minWidth: "300px" }}>
                    Nombre
                  </h4>
                  <h4 style={{ minWidth: "300px" }}>Jennifer Smith Jones</h4>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
