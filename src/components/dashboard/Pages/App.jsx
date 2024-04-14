import "./App.css";
import React from "react";
// Import from react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { DetailBicicleta } from "./components/DetailBicicleta";
import { FormBicicleta } from "./components/FormBicicleta";
import { TableBicicletas } from "./components/TableBicicletas";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";
import { Signup } from "./components/Signup";
import { Unauthorized } from "./components/Unauthorized";
import { UserProvider } from "./components/UserProvider";
import { Auth } from "./components/Auth";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  /*   {
    path: "/bici/",
    element: <TableBicicletas />,
  }, */
  {
    path: "/",
    element: <Auth allowedRoles={["Administrador", "Usuario"]} />,
    children: [
      {
        path: "/bici/",
        element: <TableBicicletas />,
      },
    ],
  },
  /*   {
    path: "bici/create/",
    element: <FormBicicleta />,
  }, */
  {
    path: "/",
    element: <Auth allowedRoles={["Administrador"]} />,
    children: [
      {
        path: "bici/create/",
        element: <FormBicicleta />,
      },
    ],
  },
  /*   {
    path: "bici/:id",
    element: <DetailBicicleta />,
  }, */
  {
    path: "/",
    element: <Auth allowedRoles={["Administrador", "Usuario"]} />,
    children: [
      {
        path: "bici/:id",
        element: <DetailBicicleta />,
      },
    ],
  },
  /*   {
    path: "bici/update/:id",
    element: <FormBicicleta />,
  }, */
  {
    path: "/",
    element: <Auth allowedRoles={["Administrador"]} />,
    children: [
      {
        path: "bici/update/:id",
        element: <FormBicicleta />,
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "user/login/",
    element: <Login />,
  },
  {
    path: "user/logout/",
    element: <Logout />,
  },
  {
    path: "user/create/",
    element: <Signup />,
  },
]);
export default function App() {
  return (
    <UserProvider>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </UserProvider>
  );
}
