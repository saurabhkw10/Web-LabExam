import  React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Read from "./components/Read";
import Create from "./components/Create";
import Update from "./components/Update";
import Home from "./components/Home";

const customRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/read",
        element: <Read />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/update",
        element: <Update/>
      },
    ],
  },
]);

export default customRouter;
