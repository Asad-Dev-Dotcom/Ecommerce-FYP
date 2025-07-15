import { Routes, Route } from "react-router-dom";
import Signup from "../Pages/SignUp";
import Login from "../Pages/Login";
import NotFound from "../Pages/Not_Found";
import Contact from "../Pages/Contact";
import About from "../Pages/About";


export default function AppRoutes()
{
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/NotFound" element={<NotFound />} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/About" element={<About/>} />
  </Routes>
  );
}
