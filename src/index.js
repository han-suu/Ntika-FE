import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import Admin from '../src/pages/admin/admin'
import Home from './pages/home/home';
import SignIn from './pages/sign-in/SignIn';
// import Kalender from './kalender';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Detail from './pages/detail/detail';
import Cart from './pages/cart/cart';
import SignUp from './pages/sign-up/SignUp';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    // errorElement: <ErrorPage />,
    // loader: rootLoader,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/detail/:id",
    element: <Detail />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Admin/> */}
    {/* <Home/> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
