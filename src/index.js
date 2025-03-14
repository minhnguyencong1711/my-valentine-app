import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./index.css";
import { createRoot } from "react-dom/client";
import SuccessPage from "./components/success-page";
import ValentinePage from "./components/valentine-page";

const Root = () => (
  <Outlet />
);

const router = createBrowserRouter([
  {
      path: "/",
      element: <Root />,
      children: [
          {
              path: "/SuccessPage",
              element: <SuccessPage />,
          },
          {
              path: "/",
              element: <ValentinePage />,
          },
      ],
  },
]);

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);