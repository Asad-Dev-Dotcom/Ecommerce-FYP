import { Routes, Route } from "react-router-dom";
import SignUp from "../Pages/Auth/SignUp";
import NotFound from "../Pages/Not_Found";
import Contact from "../Pages/Contact";
import About from "../Pages/About";
import Login from "../Pages/Auth/Login";
import Home from "../Pages/Home";
import Wishlist_page from "../Pages/Wishlist_page";


export default function AppRoutes()
{
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/wishlist" element={<Wishlist_page />} />
      <Route path="/About" element={<About />} />
    </Routes>
  );
}
