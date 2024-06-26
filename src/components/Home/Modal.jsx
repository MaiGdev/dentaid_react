import React from "react";
import "../../../src/index.css";
import styled from "styled-components";

/*  */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Modal = ({
  children,
  estado,
  cambiarEstado,
  titulo = "Alerta",
  mostrarHeader,
  mostrarOverlay,
  posicionModal,
  calendario,
}) => {
  return (
    <>
      <div>
        {/*       <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
        <Dialog
          sx={{ borderRadius: "20px !important" }}
          open={estado}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            {children}{" "}
            <BotonCerrar onClick={() => cambiarEstado(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </BotonCerrar>
          </DialogContent>
          <DialogActions>
            {/*             <Button onClick={() => cambiarEstado(false)}>Cerrar</Button> */}
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

/* const Modal = ({
  children,
  estado,
  cambiarEstado,
  titulo = "Alerta",
  mostrarHeader,
  mostrarOverlay,
  posicionModal,
  calendario,
}) => {
  return (
    <>
      {estado && (
        <>
          {calendario ? (
            <OverlayCalendario
              mostrarOverlay={mostrarOverlay}
              posicionModal={posicionModal}
            >
              <ContenedoModal>
                {mostrarHeader && (
                  <EncabezadoModal>
                    <h3>{titulo}</h3>
                  </EncabezadoModal>
                )}
                <BotonCerrar onClick={() => cambiarEstado(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </BotonCerrar>
                {children}
              </ContenedoModal>
            </OverlayCalendario>
          ) : (
            <Overlay
              mostrarOverlay={mostrarOverlay}
              posicionModal={posicionModal}
            >
              <ContenedoModal>
                {mostrarHeader && (
                  <EncabezadoModal>
                    <h3>{titulo}</h3>
                  </EncabezadoModal>
                )}
                <BotonCerrar onClick={() => cambiarEstado(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </BotonCerrar>
                {children}
              </ContenedoModal>
            </Overlay>
          )}
        </>
      )}
    </>
  );
}; */

export default Modal;

const ContenedoModal = styled.div`
  width: 450px;
  min-height: 400px;
  background: #fff;
  position: relative;
  border-radius: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 20px;
  box-sizing: border-box;
`;

const EncabezadoModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;

  h3 {
    font-weight: 500;
    font-size: 16px;
    color: #1766dc;
  }
`;
const BotonCerrar = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;

  width: 30px;
  height: 30px;
  border: none;
  background: none;
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 5px;
  color: #1766dc;

  &:hover {
    background: #f2f2f2;
  }

  svg: {
    width: 100%;
    height: 100%;
  }
`;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: ${(props) =>
    props.mostrarOverlay ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)"};
  padding: 40px;
  display: flex;
  align-items: ${(props) =>
    props.posicionModal ? props.posicionModal : "center"};
  justify-content: center;
`;
const OverlayCalendario = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 124px;
  background: ${(props) =>
    props.mostrarOverlay ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)"};
  padding: 40px;
  display: flex;
  align-items: ${(props) =>
    props.posicionModal ? props.posicionModal : "center"};
  justify-content: center;
`;

/* ,,,,,,,,,, */
