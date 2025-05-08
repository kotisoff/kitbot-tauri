import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/index";
import "./assets/index.css";
import { SettingsProvider } from "./context/SettingsProvider";
import SettingsPage from "./pages/Settings/SettingsPage";
import Test from "./pages/test";
import InstancePage from "./pages/Instance/InstancePage";

function ErrorElement() {
  return (
    <div className="flex">
      <h1 className="fixed left-1/2 top-1/2 -translate-1/2 text-center text-2xl">
        Упс, здесь что-то должно было быть, но этого почему-то нет...
      </h1>
    </div>
  );
}

const Router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <MainPage />
      },
      {
        path: "/settings",
        element: <SettingsPage />
      },
      {
        path: "/test",
        element: <Test />
      },
      {
        path: "/instance",
        element: <InstancePage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SettingsProvider>
      <RouterProvider router={Router} />
    </SettingsProvider>
  </React.StrictMode>
);
