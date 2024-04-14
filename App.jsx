import "./App.css";
import { Layout } from "../src/components/Home/Layout";
import Home from "./components/dashboard/Pages/Home";
import Dabout from "./components/dashboard/Pages/about";
import TableAlergia from "./components/dashboard/Pages/TableAlergia";
import FormAlergia from "./components/dashboard/Pages/FormAlergia";
import TableEnfermedad from "./components/dashboard/Pages/TableEnfermedad";
import FormEnfermedad from "./components/dashboard/Pages/FormEnfermedad";
import TableMedicamento from "./components/dashboard/Pages/TableMedicamento";
import FormMedicamento from "./components/dashboard/Pages/FormMedicamento";
import Horario from "./components/dashboard/Pages/HorarioAgenda";
import Medicos from "./components/dashboard/Pages/TableMedicos";
import Pacientes from "./components/dashboard/Pages/TablePacientes";
import UserProvider from "./components/dashboard/Pages/UserProvider";
import Unauthorized from "./components/dashboard/Pages/Unauthorized";
import Logout from "./components/dashboard/Pages/Logout";
import FormUsuario from "./components/dashboard/Pages/FormUsuario";
import FormEstado from "./components/dashboard/Pages/FormEstado";
import Perfil from "./components/dashboard/Pages/Perfil";
import Expediente from "./components/dashboard/Pages/Paciente/Expediente";
import CompartirExpediente from "./components/dashboard/Pages/Paciente/CompartirExpediente";
import ExpedienteCompartido from "./components/dashboard/Pages/ExpedienteCompartido";
import TableExpedientesCompartidos from "./components/dashboard/Pages/Medico/TableExpedientesCompartidos";

/* Landing */
import Hero from "././components/Home/Hero";

// Import from react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import { Auth } from "./components/dashboard/Pages/Auth";

const router = createBrowserRouter([
  {
    /* pagina OnePage */
    path: "/",
    element: <Hero />,
  },
  /* home del dash */
  {
    path: "/",
    element: <Auth allowedRoles={["Administrador", "Médico", "Paciente"]} />,
    children: [
      {
        path: "/dashboard/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/dabout/",
    element: <Dabout />,
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Administrador"]} />,
    children: [
      {
        path: "/alergia/",
        element: <TableAlergia />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Administrador"]} />,
    children: [
      {
        path: "/alergia/create",
        element: <FormAlergia />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Administrador"]} />,
    children: [
      {
        path: "/alergia/update/:id",
        element: <FormAlergia />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Administrador"]} />,
    children: [
      {
        path: "/enfermedad/",
        element: <TableEnfermedad />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Administrador"]} />,
    children: [
      {
        path: "/enfermedad/create",
        element: <FormEnfermedad />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Administrador"]} />,
    children: [
      {
        path: "/enfermedad/update/:id",
        element: <FormEnfermedad />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Administrador"]} />,
    children: [
      {
        path: "/medicamento/",
        element: <TableMedicamento />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Administrador"]} />,
    children: [
      {
        path: "/medicamento/create",
        element: <FormMedicamento />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Administrador"]} />,
    children: [
      {
        path: "/medicamento/update/:id",
        element: <FormMedicamento />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Administrador", "Médico"]} />,
    children: [
      {
        path: "/horario/",
        element: <Horario />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Administrador", "Médico"]} />,
    children: [
      {
        path: "/horario/:id",
        element: <Horario />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Administrador"]} />,
    children: [
      {
        path: "/medicos/",
        element: <Medicos />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Administrador"]} />,
    children: [
      {
        path: "/pacientes/",
        element: <Pacientes />,
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/signup",
    element: <FormUsuario />,
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Administrador"]} />,
    children: [
      {
        path: "/paciente/signup",
        element: <FormUsuario />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Administrador"]} />,
    children: [
      {
        path: "/medico/signup",
        element: <FormUsuario />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Administrador"]} />,
    children: [
      {
        path: "/estado/update/:id",
        element: <FormEstado />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Administrador", "Médico", "Paciente"]} />,
    children: [
      {
        path: "/perfil",
        element: <Perfil />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Administrador", "Médico", "Paciente"]} />,
    children: [
      {
        path: "/expediente/",
        element: <Expediente />,
      },
    ],
  },
  /* {
    path: "/",
    element: <Auth allowedRoles={["Administrador", "Médico", "Paciente"]} />,
    children: [
      {
        path: "/expediente/:id",
        element: <Expediente />,
      },
    ],
  }, */
  {
    path: "/",
    element: <Auth allowedRoles={["Paciente"]} />,
    children: [
      {
        path: "/expediente/compartir",
        element: <CompartirExpediente />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Médico", "Paciente"]} />,
    children: [
      {
        path: "/expediente/:id",
        element: <ExpedienteCompartido />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Médico"]} />,
    children: [
      {
        path: "/expedientes/",
        element: <TableExpedientesCompartidos />,
      },
    ],
  },
]);

/* const dash = ({}) => {
  const [estadoDash, cambiarEstadoDash] = useState(true);
  const url = window.location.href;
  if (url == "http://localhost:5173/dashboard") {
    cambiarEstadoDash(!estadoModal1);
  }
}; */

export function App() {
  return (
    <>
      <UserProvider>
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </UserProvider>
      {/*       {dash && (
      )}
      {!dash && (
        <BoardLayout>
          {console.log(window.location.href)}
          <RouterProvider router={router} />
        </BoardLayout>
      )} */}
    </>
  );
}

export default App;
