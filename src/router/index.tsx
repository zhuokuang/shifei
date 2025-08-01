import { lazy } from 'react';
import { createBrowserRouter } from "react-router-dom";

const Login = lazy(() => import("../pages/Login"));

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/dashbord", element: <div>Dashboard</div> },
]);

export default router;
