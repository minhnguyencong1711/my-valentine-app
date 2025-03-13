import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import { createRoot } from "react-dom/client"
import SuccessPage from "./components/success-page"
import ValentinePage from "./components/valentine-page"

// Thêm CSS của Tailwind nếu cần
import "./styles/valentine.css"

const router = createBrowserRouter([
  {
    path: "/SuccessPage",
    element: <SuccessPage />,
  },
  {
    path: "/",
    element: <ValentinePage />,
  },
])

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

