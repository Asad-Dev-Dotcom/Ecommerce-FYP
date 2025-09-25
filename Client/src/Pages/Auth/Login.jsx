import { Link } from "react-router-dom";
import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { IoEyeOffOutline } from "react-icons/io5";
function Login()
{
      const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white mt-10">
            {/* Left Image Section (Hidden on small screens) */}
            <div className="hidden md:flex md:w-1/2 min-h-screen border-r border-gray-100 items-start justify-start">
                <img
                    className="mt-10 h-[80vh] w-full object-cover object-left"
                    src="https://img.freepik.com/premium-photo/empty-black-smart-phone-with-cart-bags-light-background-online-shopping-purchase-concept-mock-up-3d-rendering_670147-10275.jpg?semt=ais_hybrid&w=740"
                    alt="login"
                />
            </div>

            {/* Right Form Section */}
            <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center px-4 sm:px-6 py-10">
                <form className="w-full max-w-sm -mt-20">
                    {/* Heading */}
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-semibold text-center md:text-left">
                            Login to Exclusive
                        </h1>
                        <p className="pt-3 text-center md:text-left text-gray-600">
                            Enter your details below
                        </p>
                    </div>

                    {/* Input Fields */}
                    <div className="flex flex-col pt-8 space-y-6">
                        {/* Email / Phone */}
                        <div className="relative w-full">
                            <input
                                type="email"
                                placeholder="Email or Phone number"
                                className="text-md font-quicksand font-medium w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-b-transparent peer"
                            />
                            <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-red-500 peer-focus:w-full transition-all duration-300"></div>
                        </div>

                        {/* Password */}
                        <div className="relative w-full">
                            <input
                                type="password"
                                placeholder="Password"
                                className="text-md font-quicksand font-medium w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-b-transparent peer"
                            />
                            <div
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-2 top-2 cursor-pointer text-gray-500 "
                                          >
                                            {showPassword ? <LuEye size={23} /> : <IoEyeOffOutline size={23} />}
                                          </div>
                            <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-red-500 peer-focus:w-full transition-all duration-300"></div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col pt-8 space-y-4">
                        {/* Button + Forgot Password in one line */}
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="w-[130px] sm:w-[140px] md:w-[130px] bg-red-600 hover:bg-red-700 text-white text-lg p-3 rounded cursor-pointer transition-colors duration-200"
                            >
                                Log In
                            </button>
                            <Link
                                to="/forgot-password"
                                className="text-red-600 font-semibold cursor-pointer hover:underline"
                            >
                                Forgot Password?
                            </Link>

                        </div>

                        {/* Signup Link */}
                        <p className="text-gray-700 text-base text-center mt-3">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="text-red-600 px-2 py-1 rounded cursor-pointer hover:bg-red-600 hover:text-white transition-all duration-200"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Login;