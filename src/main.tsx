import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Settings from "./pages/Settings/Settings";
import { ConsoleProvider } from "./context/ConsoleProvider";
import "./index.css";
import { SettingsProvider } from "./context/SettingsProvider";
import ConsolePage from "./pages/Console";
import InstancesPage from "./pages/Instances/Instances";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <div className="flex">
        <Layout />
        <h1 className=" fixed text-xl text-center left-1/2 -translate-x-1/2">
          Упс, здесь что-то должно было быть, но этого почему-то нет...
        </h1>
      </div>
    ),
    children: [
      {
        index: true,
        element: <InstancesPage />
      },
      {
        path: "/settings",
        element: <Settings />
      },
      {
        path: "/console",
        element: <ConsolePage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConsoleProvider>
      <SettingsProvider>
        <RouterProvider router={router} />
      </SettingsProvider>
    </ConsoleProvider>
  </React.StrictMode>
);
