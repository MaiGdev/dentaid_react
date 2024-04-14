import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logoImg from "../../../media/logofooter.png";
import styled from "styled-components";
import "../../../../src/dash.css";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { useContext } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

const drawerWidth = 260;
const ImgContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "auto",
  margin: "0",
  padding: "1.7rem 1rem .75rem 1rem",
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

function Dash(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const [openProfile, setOpenProfile] = useState(false);

  const [anchorElA, setAnchorElA] = useState(null);
  const openA = Boolean(anchorElA);
  const handleClick = (event) => {
    setAnchorElA(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElA(null);
  };
  const handleCloseP = () => {
    handleClose();
    setAnchorElA(null);
    navigate("/perfil");
  };
  const handleCloseS = () => {
    handleClose();
    setAnchorElA(null);
    navigate("/logout");
  };

  const { user, decodeToken, autorize } = useContext(UserContext);
  const [userData, setUserData] = useState(decodeToken());

  useEffect(() => {
    if (userData != null) {
      if (userData?.estado != "Activo") {
        toast.error("El usuario aún no ha sido validado", {
          duration: 4000,
          position: "top-center",
        });
        localStorage.removeItem("user");
        return navigate("/");
      }
    }
  }, [userData]);

  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const styles = (theme) => ({
    icon: {
      color: "#7d87ad",
    },
  });

  const [dropdownOpenMante, setDropdownOpenMante] = useState(false);
  const [dropdownOpenMedi, setDropdownOpenMedi] = useState(false);

  const toggleDropdownMante = () => {
    setDropdownOpenMante(!dropdownOpenMante);
  };
  const toggleDropdownMedi = () => {
    setDropdownOpenMedi(!dropdownOpenMedi);
  };

  const drawer = (
    <div>
      {/*  <Toolbar /> */}
      <ImgContainer marginBottom={"1rem"}>
        <img
          src={logoImg}
          alt=""
          style={{
            /* minWidth: "100%", */
            /* maxwidth: "30rem", */
            height: "38px",
            /*   marginTop: "", */
            padding: "0",
          }}
        />
      </ImgContainer>
      {/*       <Divider /> */}

      {user && autorize({ allowedRoles: ["Administrador"] }) && (
        <List
          onClick={toggleDropdownMante}
          style={{
            padding: "0",
          }}
        >
          <List
            onClick={toggleDropdownMante}
            style={{
              padding: "0",
            }}
          >
            <ListItem
              margin="0 auto"
              disablePadding
              sx={{
                display: "block",
                marginTop: "2rem",
                padding: "0",
              }}
            >
              {/* Mantenimientos */}
              <ListItemButton
                sx={{
                  minHeight: 48,
                  width: "80%",
                  justifyContent: open ? "initial" : "center",
                  margin: "0 auto",
                  /* background: "8f97ad", */
                  backgroundColor: "#fff",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  color: "#a195a7",
                  "&:hover": {
                    background: "#edf1f4",
                    color: "#7d87ad",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1 : "auto",
                    justifyContent: "center",

                    "&:hover": {
                      background: "#fff",
                      backgroundColor: "#7d87ad",
                    },
                    /* background: "#7d87ad", */
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#0a58ca"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                  </svg>
                </ListItemIcon>
                <ListItemText
                  primary="Mantenimientos"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
          {dropdownOpenMante ? (
            <List
              sx={{
                transition: "max-height 0.3s ease-in-out;",
              }}
            >
              {/* alergia */}
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => {
                  navigate("/alergia/");
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 40,
                    width: "80%",
                    justifyContent: open ? "initial" : "center",
                    margin: "0 auto",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <ListItemText
                    primary="Alergias"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
              {/* enfermedad */}
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => {
                  navigate("/enfermedad/");
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 40,
                    width: "80%",
                    justifyContent: open ? "initial" : "center",
                    margin: "0 auto",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <ListItemText
                    primary="Enfermedades"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>

              {/* medicamento */}
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => {
                  navigate("/medicamento/");
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 40,
                    width: "80%",
                    justifyContent: open ? "initial" : "center",
                    margin: "0 auto",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <ListItemText
                    primary="Medicamentos"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>

              {/*           {user &&
            autorize({ allowedRoles: ["Administrador", "Paciente"] }) && (
            )} */}
            </List>
          ) : (
            ""
          )}
          {/* Pacientes */}
          <List>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/pacientes/");
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  width: "80%",
                  justifyContent: open ? "initial" : "center",
                  /*      px: 5, */
                  margin: "0 auto",
                  borderRadius: "10px",
                  color: "#a195a7",
                  "&:hover": {
                    /*                 color: "#8f97ad",
                background: "#edf1f4", */
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#0a58ca"
                    className="bi bi-activity"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"
                    />
                  </svg>
                </ListItemIcon>
                <ListItemText
                  primary="Pacientes"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
          {/* Medicos */}
          <List>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/medicos/");
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  width: "80%",
                  justifyContent: open ? "initial" : "center",
                  /*      px: 5, */
                  margin: "0 auto",
                  borderRadius: "10px",
                  color: "#a195a7",
                  "&:hover": {
                    /*                 color: "#8f97ad",
                background: "#edf1f4", */
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#0a58ca"
                    className="bi bi-activity"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"
                    />
                  </svg>
                </ListItemIcon>
                <ListItemText
                  primary="Médicos"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </List>
      )}

      {user && autorize({ allowedRoles: ["Paciente"] }) && (
        <List
          onClick={toggleDropdownMante}
          style={{
            padding: "0",
          }}
        >
          <List
            onClick={toggleDropdownMante}
            style={{
              padding: "0",
            }}
          >
            {/* Expediente */}
            <List>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => {
                  navigate("/expediente/");
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    width: "80%",
                    justifyContent: open ? "initial" : "center",
                    /*      px: 5, */
                    margin: "0 auto",
                    borderRadius: "10px",
                    color: "#a195a7",
                    "&:hover": {
                      /*                 color: "#8f97ad",
                background: "#edf1f4", */
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#0a58ca"
                      className="bi bi-activity"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"
                      />
                    </svg>
                  </ListItemIcon>
                  <ListItemText
                    primary="Expediente clínico"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </List>

            {/* Citas */}
            <ListItemButton
              sx={{
                minHeight: 48,
                width: "80%",
                justifyContent: open ? "initial" : "center",
                margin: "0 auto",
                /* background: "8f97ad", */
                backgroundColor: "#fff",
                fontWeight: "bold",
                borderRadius: "10px",
                color: "#a195a7",
                "&:hover": {
                  background: "#edf1f4",
                  color: "#7d87ad",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 1 : "auto",
                  justifyContent: "center",

                  "&:hover": {
                    background: "#fff",
                    backgroundColor: "#7d87ad",
                  },
                  /* background: "#7d87ad", */
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#0a58ca"
                  class="bi bi-calendar2-range"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                  <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4zM9 8a1 1 0 0 1 1-1h5v2h-5a1 1 0 0 1-1-1zm-8 2h4a1 1 0 1 1 0 2H1v-2z" />
                </svg>
              </ListItemIcon>
              <ListItemText primary="Citas" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>

            {dropdownOpenMante ? (
              <List
                sx={{
                  transition: "max-height 0.3s ease-in-out;",
                }}
              >
                {/* Agendar cita */}
                <ListItem
                  disablePadding
                  sx={{ display: "block" }}
                  onClick={() => {
                    navigate("/dashboard/");
                  }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 40,
                      width: "80%",
                      justifyContent: open ? "initial" : "center",
                      margin: "0 auto",
                      borderRadius: "10px",
                      textAlign: "center",
                    }}
                  >
                    <ListItemText
                      primary="Agendar cita"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
                {/* Citas pendientes */}
                <ListItem
                  disablePadding
                  sx={{ display: "block" }}
                  onClick={() => {
                    navigate("/dashboard/");
                  }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 40,
                      width: "80%",
                      justifyContent: open ? "initial" : "center",
                      margin: "0 auto",
                      borderRadius: "10px",
                      textAlign: "center",
                    }}
                  >
                    <ListItemText
                      primary="Citas pendientes"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>

                {/*           {user &&
            autorize({ allowedRoles: ["Administrador", "Paciente"] }) && (
            )} */}
              </List>
            ) : (
              ""
            )}
          </List>
        </List>
      )}

      {user && autorize({ allowedRoles: ["Médico"] }) && (
        <List
          onClick={toggleDropdownMante}
          style={{
            padding: "0",
          }}
        >
          <List
            style={{
              padding: "0",
            }}
          >
            {/* Expediente */}
            <List>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => {
                  navigate("/expedientes/");
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    width: "80%",
                    justifyContent: open ? "initial" : "center",
                    /*      px: 5, */
                    margin: "0 auto",
                    borderRadius: "10px",
                    color: "#a195a7",
                    "&:hover": {
                      /*                 color: "#8f97ad",
                background: "#edf1f4", */
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#0a58ca"
                      className="bi bi-activity"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"
                      />
                    </svg>
                  </ListItemIcon>
                  <ListItemText
                    primary="Expedientes"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </List>

            {/* Citas */}
            <ListItemButton
              sx={{
                minHeight: 48,
                width: "80%",
                justifyContent: open ? "initial" : "center",
                margin: "0 auto",
                /* background: "8f97ad", */
                backgroundColor: "#fff",
                fontWeight: "bold",
                borderRadius: "10px",
                color: "#a195a7",
                "&:hover": {
                  background: "#edf1f4",
                  color: "#7d87ad",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 1 : "auto",
                  justifyContent: "center",

                  "&:hover": {
                    background: "#fff",
                    backgroundColor: "#7d87ad",
                  },
                  /* background: "#7d87ad", */
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#0a58ca"
                  class="bi bi-calendar2-range"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                  <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4zM9 8a1 1 0 0 1 1-1h5v2h-5a1 1 0 0 1-1-1zm-8 2h4a1 1 0 1 1 0 2H1v-2z" />
                </svg>
              </ListItemIcon>
              <ListItemText primary="Citas" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>

            {dropdownOpenMante ? (
              <List
                sx={{
                  transition: "max-height 0.3s ease-in-out;",
                }}
              >
                {/* horarios */}
                <ListItem
                  disablePadding
                  sx={{ display: "block" }}
                  onClick={() => {
                    navigate(`/horario/${userData.id}`);
                  }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 40,
                      width: "80%",
                      justifyContent: open ? "initial" : "center",
                      margin: "0 auto",
                      borderRadius: "10px",
                      textAlign: "center",
                    }}
                  >
                    <ListItemText
                      primary="Horario"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
                {/* Citas pendientes */}
                <ListItem
                  disablePadding
                  sx={{ display: "block" }}
                  onClick={() => {
                    navigate("/dashboard/");
                  }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 40,
                      width: "80%",
                      justifyContent: open ? "initial" : "center",
                      margin: "0 auto",
                      borderRadius: "10px",
                      textAlign: "center",
                    }}
                  >
                    <ListItemText
                      primary="Citas pendientes"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>

                {/*           {user &&
            autorize({ allowedRoles: ["Administrador", "Paciente"] }) && (
            )} */}
              </List>
            ) : (
              ""
            )}
          </List>
        </List>
      )}

      {/* About */}
      <List>
        <ListItem
          disablePadding
          sx={{ display: "block" }}
          onClick={() => {
            navigate("/dabout/");
          }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              width: "80%",
              justifyContent: open ? "initial" : "center",
              /*      px: 5, */
              margin: "0 auto",
              borderRadius: "10px",
              color: "#a195a7",
              "&:hover": {
                /*                 color: "#8f97ad",
                background: "#edf1f4", */
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 1 : "auto",
                justifyContent: "center",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#0a58ca"
                class="bi bi-info-square"
                viewBox="0 0 16 16"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
            </ListItemIcon>
            <ListItemText primary="About" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: "#ffff",
          boxShadow: "none",
          borderBottom: "1px solid #e7e9ed",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none", color: "#000" } }}
          >
            <MenuIcon />
          </IconButton>

          {!userData && (
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#5A5A5A",
              }}
              variant="h6"
              noWrap
              component="div"
              color={"#000"}
            >
              Usuario
            </Typography>
          )}
          {userData && (
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#5A5A5A",
              }}
              variant="h6"
              noWrap
              component="div"
              color={"#000"}
            >
              {userData?.correo}
            </Typography>
          )}
          {/* menu de de opciones de usuario */}
          <IconButton>
            {/*             <Avatar
              size="large"
              aria-label="show 17 new notifications"
              sx={{
                background: "#064588",
                display: "flex",
                width: "38px",
                height: "38px",
                alignItems: "center",
                padding: "1rem",
              }}
              onClick={() => setOpenProfile((prev) => !prev)}
            >
              U
            </Avatar> */}
            <Avatar
              size="large"
              id="basic-button"
              aria-label="show 17 new notifications"
              aria-controls={openA ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openA ? "true" : undefined}
              onClick={handleClick}
              sx={{
                background: "#064588",
                display: "flex",
                width: "38px",
                height: "38px",
                alignItems: "center",
                padding: "1rem",
              }}
            >
              U
            </Avatar>
            <Menu
              id="basic-menu"
              anchorEl={anchorElA}
              open={openA}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleCloseP}>Perfil</MenuItem>
              <MenuItem onClick={handleCloseS}>Logout</MenuItem>
            </Menu>
          </IconButton>
        </Toolbar>
        {openProfile && (
          <List
            className="dropDownProfile"
            style={{
              position: "absolute",
              top: "4.5rem",
              right: "5.5rem",
              width: "120px",
              padding: "2px",
              borderRadius: "8px",
              backgroundColor: "white",
              border: "1px solid gray",
              display: "flex",
              flexDirection: "column",
              alignItems: "initial",
            }}
          >
            <ListItem
              margin="0 auto"
              disablePadding
              sx={{
                display: "block",
                /* marginTop: ".5rem", */
                padding: "0",
                width: "100%",
              }}
              onClick={() => {
                navigate("/dashboard/");
              }}
            >
              <ListItemButton
                sx={{
                  color: "#7d87ad",
                  color: "#7d87ad",
                  padding: ".5rem",
                }}
              >
                <ListItemText primary="Perfil" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem
              margin="0 auto"
              disablePadding
              sx={{
                display: "block",
                /* marginTop: ".5rem", */
                padding: "0",
                width: "100%",
              }}
              onClick={() => {
                navigate("/logout");
              }}
            >
              <ListItemButton
                sx={{
                  color: "#7d87ad",
                  padding: ".5rem",
                }}
              >
                <ListItemText
                  primary="Cerrar sesión"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        )}
      </AppBar>

      {/* Caja contenedora del sidebar */}
      <Box
        background="#f6f8fa"
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#f6f8fa",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

Dash.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dash;
