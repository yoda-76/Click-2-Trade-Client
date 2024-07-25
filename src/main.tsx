import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "../store/store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./page/Register.tsx";
import Login from "./page/Login.tsx";
import Dashboard from "./page/Dashboard.tsx";
import Trade from "./page/Trade.tsx";
import ManageChild from "./page/ManageChild.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}>
        <Dashboard />
      </Provider>
    ),
  },
  {
    path: "/register",
    element: (
      <Provider store={store}>
        <Register />
      </Provider>
    ),
  },
  {
    path: "/login",
    element: (
      <Provider store={store}>
        <Login />
      </Provider>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Provider store={store}>
        <Dashboard />
      </Provider>
    ),
  },
  {path:"/trade",
    element:(
      <Provider store={store}>
        <Trade/>
      </Provider>
    )
  },
  {
    path: "manage-child",
    element: (
      <Provider store={store}>
        <ManageChild />
      </Provider>
    ),
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
