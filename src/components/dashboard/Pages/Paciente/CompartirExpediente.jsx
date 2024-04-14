import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
import EditIcon from "@mui/icons-material/Edit";
import Share from "@mui/icons-material/Share";
import { useNavigate, useParams, Link } from "react-router-dom";
import Dash from "../Dash";
import { Button, CircularProgress, createTheme } from "@mui/material";
import { useCallApi } from "../../../../hooks/useCallApi";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import { useSubmitForm } from "../../../../hooks/useSubmitForm";
import { useState } from "react";
import Modal from "../../../Home/Modal";
import { ThemeProvider } from "styled-components";
import { useContext } from "react";
import { UserContext } from "../../../../context/UserContext";
import { useEffect } from "react";
import toast from "react-hot-toast";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "nombre",
    numeric: false,
    disablePadding: true,
    label: "Doctor",
  },
];

function TableMoviesHead(props) {
  const {
    // onSelectAllClick,
    order,
    orderBy,
    // numSelected,
    // rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
// PropTypes es un verificador de tipos
TableMoviesHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  /*  onSelectAllClick: PropTypes.func.isRequired, */
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function TableMoviesToolbar(props) {
  const navigate = useNavigate();
  const { numSelected } = props;
  const { idSelected } = props;
  /*   const update = () => {
    console.log(idSelected);
    return navigate(`/medicamento/update/${idSelected}`);
  }; */
  const agenda = () => {
    console.log(idSelected);
    return navigate(`/horario/${idSelected}`);
  };
  const eliminar = () => {
    console.log(idSelected);
    return navigate(`/medicamento/delete/${idSelected}`);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <>
          <Tooltip title="Compartir">
            <IconButton>
              <Share key={idSelected} />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        ""
      )}
    </Toolbar>
  );
}

TableMoviesToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  idSelected: PropTypes.number.isRequired,
};

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

export default function TableMovies() {
  const navigate = useNavigate();
  const { user, decodeToken, autorize } = useContext(UserContext);
  const [userData, setUserData] = useState(decodeToken());
  const { data, error, loaded } = useCallApi({ endpoint: "medico/" });
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = React.useState("year");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
    cambiarEstadoModal1(!estadoModal1);
  };

  const [estadoModal1, cambiarEstadoModal1] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty data.
  const emptydata =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  // Valores de formulario
  const [formData, setData] = useState(null);
  // Booleano para establecer si se envia la informacion al API
  const [start, setStart] = useState(false);
  // Obtener la respuesta de la solicitud de crear o actualizar en el API
  // eslint-disable-next-line no-unused-vars
  const { responseData, errorData, loadedData } = useSubmitForm({
    endpoint: "expediente/createExpedienteCompartido",
    action: "POST",
    formData,
    start,
  });

  const onSubmit = (DataForm) => {
    try {
      // Establecer valores del formulario
      /*  cambiarEstadoModal1(false); */
      const expedienteCompartido = {};
      expedienteCompartido.idUsuarioExpediente = userData.id;
      expedienteCompartido.idUsuarioACompartir = selected[0] || 0;

      setData(expedienteCompartido);

      setStart(true);
      setAction("POST");

      /*       if (esCrear) {
        setAction("POST");
      } else {
        setAction("PUT");
      } */
    } catch (e) {
      // handle your error
    }
  };

  useEffect(() => {
    if (responseData != null) {
      toast.success(responseData, {
        duration: 4000,
        position: "top-center",
      });
      // Si hay respuesta se creo o modifico lo redirecciona
      return navigate("/dashboard ");
    }
  }, [responseData]);

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

  function cargarPagina() {
    let boton = document.getElementById("miBoton");

    if (document.readyState === "complete" && boton) {
      boton.addEventListener("click", function () {
        cambiarEstadoModal1(false);
      });
    } else {
      setTimeout(cargarPagina, 100);
    }
  }

  window.onload = cargarPagina;

  return (
    <>
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Dash />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 10, background: "#eee", height: "100vh" }}
        >
          <Box>
            <Box
              sx={{
                backgroundColor: "#eee",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Search
                sx={{
                  width: "250px !important",

                  backgroundColor: "#fff",
                  color: "#1a82fe",
                  fontWeight: "700",
                  fontSize: "10px",
                  cursor: "pointer",
                  borderRadius: "7px",
                  textTransform: "none",
                  textAlign: "center",
                  border: "2px solid #1a82fe",
                  "&:hover": {
                    backgroundColor: "#fff",
                    border: "2px solid #08486c",
                    color: "#1a82fe",
                  },
                }}
              >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <Search
                sx={{
                  width: "250px !important",

                  backgroundColor: "#fff",
                  color: "#1a82fe",
                  fontWeight: "700",
                  fontSize: "10px",
                  cursor: "pointer",
                  borderRadius: "7px",
                  textTransform: "none",
                  textAlign: "center",
                  border: "2px solid #1a82fe",
                  "&:hover": {
                    backgroundColor: "#fff",
                    border: "2px solid #08486c",
                    color: "#1a82fe",
                  },
                }}
              >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Tipo de usuario"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Box>
            <Box style={{ height: 400, width: "100%" }} marginTop="1.5rem">
              {/* tabla */}
              {!loaded && (
                <Box
                  sx={{
                    height: 400,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  marginTop="1.5rem"
                >
                  <CircularProgress />
                </Box>
              )}
              {data && data.length > 0 && (
                <Box sx={{ width: "100%" }}>
                  <Paper sx={{ width: "100%", mb: 2 }}>
                    <TableMoviesToolbar
                      numSelected={selected.length}
                      idSelected={Number(selected[0]) || 0}
                    />
                    <TableContainer>
                      <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? "small" : "medium"}
                      >
                        <TableMoviesHead
                          numSelected={selected.length}
                          order={order}
                          orderBy={orderBy}
                          onRequestSort={handleRequestSort}
                          rowCount={data.length}
                        />
                        <TableBody>
                          {stableSort(data, getComparator(order, orderBy))
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((row, index) => {
                              /* aqui se enlaza el id del row al table cel */
                              const isItemSelected = isSelected(row.idUsuario);
                              const labelId = `enhanced-table-checkbox-${index}`;

                              return (
                                <TableRow
                                  hover
                                  onClick={(event) =>
                                    /* aqui se enlaza el id del row al table cel */
                                    handleClick(event, row.idUsuario)
                                  }
                                  role="checkbox"
                                  aria-checked={isItemSelected}
                                  tabIndex={-1}
                                  key={row.idUsuario}
                                  selected={isItemSelected}
                                >
                                  <TableCell padding="checkbox">
                                    <Checkbox
                                      color="primary"
                                      checked={isItemSelected}
                                      inputProps={{
                                        "aria-labelledby": labelId,
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    id={labelId}
                                    scope="row"
                                    padding="none"
                                  >
                                    {row.nombre}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          {emptydata > 0 && (
                            <TableRow
                              style={{
                                height: (dense ? 33 : 53) * emptydata,
                              }}
                            >
                              <TableCell colSpan={6} />
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    {/* Paginacion */}
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={data.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                </Box>
              )}
            </Box>
            <Modal
              estado={estadoModal1}
              cambiarEstado={cambiarEstadoModal1}
              titulo="Alerta"
              mostrarHeader={false}
              mostrarOverlay={true}
              /* posicionModal={"start"} */
            >
              <ThemeProvider theme={contenidoTheme}>
                <Contenido sx={{ padding: "1rem" }}>
                  <p style={{ marginTop: "1rem" }}>
                    ¿Estás seguro de compartir tu expediente clínico con esta
                    persona?
                  </p>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "1rem",
                    }}
                  >
                    <Button
                      id="miBoton"
                      onClick={() => cambiarEstadoModal1(false)}
                      type="submit"
                      variant="contained"
                      color="secondary"
                      fullWidth
                      sx={{
                        width: "60px",
                        height: "35px",
                        backgroundColor: "#fff",
                        color: "red",
                        fontWeight: "700",
                        fontSize: "10px",
                        cursor: "pointer",
                        borderRadius: "7px",
                        textTransform: "none",
                        textAlign: "center",
                        border: "2px solid red",

                        "&:hover": {
                          backgroundColor: "initial",
                          border: "2px solid red",
                          color: "#red",
                        },
                      }}
                    >
                      Cancelar
                    </Button>

                    <Button
                      onClick={onSubmit}
                      type="submit"
                      variant="contained"
                      color="secondary"
                      fullWidth
                      sx={{
                        width: "60px",
                        height: "35px",
                        backgroundColor: "#fff",
                        color: "green",
                        fontWeight: "700",
                        fontSize: "10px",
                        cursor: "pointer",
                        borderRadius: "7px",
                        textTransform: "none",
                        textAlign: "center",
                        border: "2px solid green",
                        "&:hover": {
                          backgroundColor: "initial ",
                          border: "2px solid green",
                          color: "green",
                        },
                        marginLeft: ".5rem",
                      }}
                    >
                      Aceptar
                    </Button>
                  </Box>
                </Contenido>
              </ThemeProvider>
            </Modal>
          </Box>
        </Box>
      </Box>
    </>
  );
}
