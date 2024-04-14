import React from "react";

import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import { appTheme } from "../../themes/theme";

import { Toaster } from "react-hot-toast";

const url = window.location.href;
export function Layout({ children }) {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme />
      {/* Para que cuando no se cargue el home se cargue el navBar blanco */}
      {/*       {url != "http://localhost:5173/" ? (
        <Box>
          <Container>
            <NavBar />
          </Container>
          <Footer />
        </Box>
      ) : (
        ""
      )} */}
      <Toaster position="top-center" />
      <Box maxWidth="xl">{children}</Box>

      {/* <Footer /> */}
    </ThemeProvider>
  );
}
