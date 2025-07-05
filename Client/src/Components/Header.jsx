import { Link, useLocation } from "react-router-dom";
import { CiHeart, CiUser, CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import
  {
    FaRegUser,
    FaRegStar,
  } from "react-icons/fa6";
import { FiShoppingBag } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { SlLogout } from "react-icons/sl";

function Header()
{
  const location = useLocation();
  const isUserNavigated = location.key !== "default";

  const navLink = (path, label) => (
    <Link
      to={path}
      className={`relative px-3 py-1 rounded transition-all duration-300
        ${isUserNavigated && location.pathname === path
          ? "bg-red-500 text-white"
          : "hover:text-red-500"
        }
        after:absolute after:left-0 after:-bottom-0.5 after:h-[2px]
        after:bg-red-500 after:w-0 hover:after:w-full
        after:transition-all after:duration-300`}
    >
      {label}
    </Link>
  );

  return (
    <header className="shadow-sm border-b">
      {/* Top Banner */}
      <div className="bg-black text-white text-center text-sm py-4 h-14 font-quicksand font-medium">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        <span className="underline cursor-pointer ml-1 font-bold">Shop Now</span>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto py-6 px-4 flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="text-xl font-bold">
          Exclusive
        </Link>

        {/* Center: Nav for Desktop */}
        <nav className="hidden md:flex gap-10 text-sm font-quicksand font-semibold">
          {navLink("/", "Home")}
          {navLink("/contact", "Contact")}
          {navLink("/about", "About")}
          {navLink("/signup", "Sign Up")}
        </nav>

        {/* Right: Search Bar + Icons */}
        <div className="flex items-center gap-4">
          {/* Search Desktop */}
          <div className="hidden md:flex bg-gray-100 rounded-md px-4 py-2 w-[250px] group 
            focus-within:outline-black focus-within:ring-1 focus-within:ring-black 
            hover:outline hover:outline-black hover:ring-1 hover:ring-black transition duration-200">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="flex-1 bg-transparent outline-none text-sm placeholder-gray-500 rounded-md"
            />
            <button
              type="submit"
              onClick={() => alert("hello btn")}
              className="text-black text-2xl cursor-pointer transition duration-300 hover:bg-red-500 hover:text-white hover:shadow-md hover:shadow-black/30 h-6 rounded-lg"
            >
              <CiSearch />
            </button>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4 text-3xl">
            <Link to="/wishlist" className="hover:text-red-500 transition">
              <CiHeart />
            </Link>
            <Link to="/cart" className="relative hover:text-red-500 transition">
              <IoCartOutline />
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </Link>

            {/* Profile - Desktop Dropdown */}
            <div className="relative group hidden md:block">
              <button className="hover:text-red-500 transition text-3xl focus:outline-none">
                <CiUser />
              </button>
              <div className="opacity-0 invisible group-hover:visible group-hover:opacity-100 
                absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-md rounded-md  ring-opacity-5 transition-all duration-300 z-50 ">


                <Link to="/account" className="flex items-center gap-2 px-4 py-2 text-white text-sm hover:bg-red-500 hover:rounded-md transition">
                  <FaRegUser className="text-lg" /> Manage my account
                </Link>
                <Link to="/orders" className="flex items-center gap-2 px-4 py-2 text-white text-sm hover:bg-red-500 hover:rounded-md transition">
                  <FiShoppingBag className="text-lg" /> My orders
                </Link>
                <Link to="/cancellations" className="flex items-center gap-2 px-4 py-2 text-white text-sm hover:bg-red-500 hover:rounded-md transition">
                  <MdOutlineCancel className="text-lg" /> My cancellations
                </Link>
                <Link to="/reviews" className="flex items-center gap-2 px-4 py-2 text-white text-sm hover:bg-red-500 hover:rounded-md transition">
                  <FaRegStar className="text-lg" /> My reviews
                </Link>
                <Link to="/logout" className="flex items-center gap-2 px-4 py-2 text-white text-sm hover:bg-red-500 hover:rounded-md transition">
                  <SlLogout className="text-lg" /> Logout
                </Link>
              </div>

            </div>

            {/* Profile - Mobile Dropdown */}
            <details className="md:hidden relative">
              <summary className="list-none cursor-pointer hover:text-red-500">
                <CiUser />
              </summary>
              <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-md rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <Link to="/account" className="flex items-center gap-2 px-4 py-2 text-white text-sm hover:bg-red-500 hover:rounded-md transition">
                  <FaRegUser className="text-lg" /> Manage my account
                </Link>
                <Link to="/orders" className="flex items-center gap-2 px-4 py-2 text-white text-sm hover:bg-red-500 hover:rounded-md transition">
                  <FiShoppingBag className="text-lg" /> My orders
                </Link>
                <Link to="/cancellations" className="flex items-center gap-2 px-4 py-2 text-white text-sm hover:bg-red-500 hover:rounded-md transition">
                  <MdOutlineCancel className="text-lg" /> My cancellations
                </Link>
                <Link to="/reviews" className="flex items-center gap-2 px-4 py-2 text-white text-sm hover:bg-red-500 hover:rounded-md transition">
                  <FaRegStar className="text-lg" /> My reviews
                </Link>
                <Link to="/logout" className="flex items-center gap-2 px-4 py-2 text-white text-sm hover:bg-red-500 hover:rounded-md transition">
                  <SlLogout className="text-lg" /> Logout
                </Link>
              </div>
            </details>

          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden mt-4 w-full">
            <div className="flex bg-gray-100 rounded-md px-4 py-2 group 
              focus-within:outline-black focus-within:ring-1 focus-within:ring-black 
              hover:outline hover:outline-black hover:ring-1 hover:ring-black transition duration-200">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="flex-1 bg-transparent outline-none text-sm placeholder-gray-500 rounded-md"
              />
              <button
                type="submit"
                onClick={() => alert("hello btn")}
                className="text-black text-2xl cursor-pointer transition duration-300 hover:bg-red-500 hover:text-white hover:shadow-md hover:shadow-black/30 h-6 rounded-lg"
              >
                <CiSearch />
              </button>
            </div>
          </div>

          {/* Hamburger for Mobile */}
          <details className="md:hidden relative">
            <summary className="text-xl cursor-pointer list-none">☰</summary>
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5 z-50 flex flex-col text-sm font-quicksand font-semibold w-44">
              {navLink("/", "Home")}
              {navLink("/contact", "Contact")}
              {navLink("/about", "About")}
              {navLink("/signup", "Sign Up")}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

export default Header;
