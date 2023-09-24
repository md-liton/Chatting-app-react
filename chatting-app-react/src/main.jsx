import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import './firebaseConfig.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Registration from './Components/Registration/Registration.jsx';
import Login from './Components/Login/Login.jsx';
import Home from './Components/Home/Home.jsx';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/registration",
    element: <Registration/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
