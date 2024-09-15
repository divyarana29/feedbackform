import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import App from './App.jsx'
import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import Form from "./pages/formPage/Form.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/form",
    element: <Form/>,
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer/>
  </StrictMode>,
)