import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Home />} />
      <Route path="SignUp" element={<SignUp />} />
      <Route path="SignIn" element={<SignIn />} />
    </>
  )
);

function App({ routes }) {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
