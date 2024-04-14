import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HomeIcon from "@mui/icons-material/Home";
import ContactsIcon from "@mui/icons-material/Contacts";
import logoImg from "../../media/logohead.png";
import { Container } from "@mui/system";
import CustomButton from "./CustomButton";
import Modal from "./Modal";
import LogIn from "./LogIn";

import {
  Button,
  createTheme,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.type === "Tab" || event.type === "Shift")
    ) {
      return;
    }

    setMobileMenu({ ...mobileMenu, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inicio", "XXXX", "XXX", "XXXX", "Contact"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 && <HomeIcon />}
                {index === 1 && <FeaturedPlayListIcon />}
                {index === 2 && <MiscellaneousServicesIcon />}
                {index === 3 && <ListAltIcon />}
                {index === 4 && <ContactsIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const NavLink = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
    color: "#4F5361",
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      color: "#fff",
    },
  }));

  const NavbarLinksBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  const CustomMenuIcon = styled(MenuIcon)(({ theme }) => ({
    cursor: "pointer",
    display: "none",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  }));

  const NavbarContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: "0 !important",
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
    },
  }));

  const NavbarLogo = styled("img")(({ theme }) => ({
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  /* mio */

  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  function handleClickRegistrar() {
    navigate("/signup");
  }

  const contenidoTheme = createTheme({
    palette: {
      root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        h1: {
          fontSize: "42px",
          fontWeight: "700",
          marginBottom: "10px",
        },
        p: {
          fontSize: "18px",
          marginBottom: "20px",
        },
        img: {
          width: "100%",
          verticalAlign: "top",
          borderRadius: "3px",
        },
      },
    },
  });

  const Contenido = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    palette: {
      h1: {
        fontSize: "42px",
        fontWeight: "700",
        marginBottom: "10px",
      },

      p: {
        fontSize: "18px",
        marginBottom: "20px",
      },

      img: {
        width: "100%",
        verticalAlign: "top",
        borderRadius: "3px",
      },
    },
  }));

  return (
    <NavbarContainer>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CustomMenuIcon onClick={toggleDrawer("left", true)} />
          <Drawer
            anchor="left"
            open={mobileMenu["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
          <Button component="a" href="/">
            <NavbarLogo src={logoImg} alt="logo"></NavbarLogo>
          </Button>
        </Box>
        <NavbarLinksBox>
          <Button
            component="a"
            href="/"
            sx={{
              color: "#000339",
              display: "block",
              "&:hover": {
                background: "#f5fafe",
              },
            }}
          >
            <NavLink
              variant="body2"
              sx={{
                "&:hover": {
                  color: "#959aaa",
                  background: "#f5fafe",
                },
              }}
            >
              Inicio
            </NavLink>
          </Button>

          <Button
            component="a"
            href="/"
            sx={{
              color: "#000339",
              display: "block",
              "&:hover": {
                background: "#f5fafe",
              },
            }}
          >
            <NavLink
              variant="body2"
              sx={{
                "&:hover": {
                  color: "#959aaa",
                  background: "#f5fafe",
                },
              }}
            >
              XXXX
            </NavLink>
          </Button>

          <Button
            component="a"
            href="/"
            sx={{
              color: "#000339",
              display: "block",
              "&:hover": {
                background: "#f5fafe",
              },
            }}
          >
            <NavLink
              variant="body2"
              sx={{
                "&:hover": {
                  color: "#959aaa",
                  background: "#f5fafe",
                },
              }}
            >
              XXXX
            </NavLink>
          </Button>

          <Button
            component="a"
            href="/"
            sx={{
              color: "#000339",
              display: "block",
              "&:hover": {
                background: "#f5fafe",
              },
            }}
          >
            <NavLink
              variant="body2"
              sx={{
                "&:hover": {
                  color: "#959aaa",
                  background: "#f5fafe",
                },
              }}
            >
              XXXX
            </NavLink>
          </Button>

          <Button
            component="a"
            href=""
            sx={{
              "&:hover": {
                background: "#f5fafe",
              },
            }}
          >
            <NavLink
              variant="body2"
              sx={{
                "&:hover": {
                  color: "#959aaa",
                  background: "#f5fafe",
                },
              }}
            >
              Contacto
            </NavLink>
          </Button>
        </NavbarLinksBox>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <NavbarLinksBox>
          <NavLink
            variant="body2"
            onClick={() => cambiarEstadoModal1(!estadoModal1)}
            sx={{
              "&:hover": {
                color: "#959aaa",
              },
            }}
          >
            Ingresar
          </NavLink>
          <Button
            onClick={handleClickRegistrar}
            sx={{
              backgroundColor: "#0F1B4C",
              color: "#fff",
              padding: "1rem",
              fontWeight: "700",
              fontSize: "14px",
              cursor: "pointer",
              padding: "0.5rem 1.25rem",
              borderRadius: "7px",
              textTransform: "none",
              display: "block",
              border: "2px solid transparent",
              "&:hover": {
                backgroundColor: "#08486c",
                color: "#fff",
              },
            }}
          >
            Registrarse
          </Button>
        </NavbarLinksBox>

        <Modal
          estado={estadoModal1}
          cambiarEstado={cambiarEstadoModal1}
          titulo="Alerta"
          mostrarHeader={false}
          mostrarOverlay={true}
          /* posicionModal={"start"} */
        >
          <ThemeProvider theme={contenidoTheme}>
            <Contenido>
              <LogIn></LogIn>
            </Contenido>
          </ThemeProvider>
        </Modal>
      </Box>
    </NavbarContainer>
  );
};

export default Navbar;
