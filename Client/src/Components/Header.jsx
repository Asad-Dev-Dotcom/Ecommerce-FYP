import { Link, useLocation } from "react-router-dom";
import { CiHeart, CiUser, CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUser, FaRegStar } from "react-icons/fa6";
import { FiShoppingBag } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { SlLogout } from "react-icons/sl";
import { useSelector } from "react-redux";
import { useState } from "react";

function Header()
{
  const location = useLocation();
  const isUserNavigated = location.key !== "default";

  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const wishlistItems = useSelector((state) => state.wishlist.wishlist || []);
  const products = useSelector((state) => state.products.list || []);

  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const user = useSelector((state) => state.auth.user);

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

  // Search input handler
  const handleSearch = (e) =>
  {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim())
    {
      setFilteredProducts([]);
      return;
    }

    const results = products.filter((p) =>
      p.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(results);
  };

  return (
    <header className="sticky top-0 z-50 shadow-sm border-b bg-white">
      {/* Top Banner */}
      <div className="bg-black text-white text-center text-sm py-4 h-14 font-quicksand font-medium">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        <span className="underline cursor-pointer ml-1 font-bold">Shop Now</span>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto py-6 px-4 flex items-center justify-between bg-white">
        {/* Left: Logo */}
        <Link to="/" className="text-xl font-bold">
          Exclusive
        </Link>

        {/* Center Nav */}
        <nav className="hidden md:flex gap-10 text-sm font-quicksand font-semibold">
          {navLink("/", "Home")}
          {navLink("/contact", "Contact")}
          {navLink("/about", "About")}
          {navLink("/signup", "Sign Up")}
        </nav>

        {/* Right: Search + Icons */}
        <div className="flex items-center gap-4 relative">
          {/* Search Desktop */}
         <div className="hidden md:flex relative bg-gray-100 rounded-md px-4 py-2 w-[300px]
  transition-all duration-300
  hover:ring-2 hover:ring-red-500
  focus-within:ring-2 focus-within:ring-red-600">
  
  <input
    type="text"
    value={query}
    onChange={handleSearch}
    placeholder="Search products..."
    className="flex-1 bg-transparent outline-none text-sm placeholder-gray-500"
  />
            <CiSearch className="text-black text-2xl cursor-pointer ml-2" />

            {/* Suggestions */}
            {filteredProducts.length > 0 && (
              <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-md z-50 max-h-60 overflow-y-auto">
                {filteredProducts.map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                    onClick={() =>
                    {
                      setQuery("");
                      setFilteredProducts([]);
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                      <p className="text-xs text-gray-500 truncate">{item.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Wishlist & Cart */}
          <Link to="/wishlist" className="relative hover:text-red-500 transition text-3xl">
            <CiHeart />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative hover:text-red-500 transition text-3xl">
            <IoCartOutline />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Profile Dropdown */}
          <div className="relative group hidden md:block">
            <button className="hover:text-red-500 transition text-3xl focus:outline-none">
              <CiUser />
            </button>
            <div className="opacity-0 invisible group-hover:visible group-hover:opacity-100 
              absolute right-0 mt-2 w-48 bg-black/55 backdrop-blur-md rounded-md transition-all duration-300 z-50">
              {user?.role === "admin" ? (<Link to="/admin" className="flex items-center gap-2 px-4 py-2 text-white text-sm hover:bg-red-500 hover:rounded-md transition">
                <FaRegUser className="text-lg" /> Admin Dashboard
              </Link>) : <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 text-white text-sm hover:bg-red-500 hover:rounded-md transition">
                <FaRegUser className="text-lg" /> Manage my account
              </Link>}
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
        </div>
      </div>
    </header>
  );
}

export default Header;
