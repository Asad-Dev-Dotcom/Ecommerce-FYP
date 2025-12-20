import React, { useState, useRef, useEffect } from "react";
import {
  AiOutlineMail,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import { BsShieldLock } from "react-icons/bs";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const resetForm = () => {
    setEmail("");
    setCode("");
    setPassword("");
    setShowPassword(false);
    setStep(1);
    navigate("/login");
  };

  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [code, setCode] = useState(Array(6).fill(""));
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  const inputRefs = useRef([]);

  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setStep(2);
    setTimer(60);
    setResendDisabled(true);
  };

  const handleCodeChange = (e, index) => {
    const val = e.target.value.replace(/\D/g, ""); // Only digits
    if (!val) return;
    const updatedCode = [...code];
    updatedCode[index] = val[0];
    setCode(updatedCode);
    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (code.join("").length === 6) {
      setStep(3);
    }
  };

  const goBackToStep1 = () => {
    setStep(1);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset to:", password);
  };

  const handleResend = () => {
    setCode(Array(6).fill(""));
    setTimer(60);
    setResendDisabled(true);
    inputRefs.current[0]?.focus();
  };

  const formatTimer = () => {
    const mins = String(Math.floor(timer / 60)).padStart(1, "0");
    const secs = String(timer % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {step === 1 && (
          <form
            onSubmit={handleEmailSubmit}
            className="bg-gray-50 p-8 rounded-lg shadow-md space-y-6"
          >
            <div className="flex justify-center">
              <AiOutlineMail className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-center text-2xl font-bold text-gray-900">
              Forgot your password?
            </h2>
            <p className="text-center text-sm text-gray-600">
              No worries! Enter your email address and we'll send you a verification code.
            </p>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-4">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition cursor-pointer"
            >
              Send Code
            </button>
            <div className="mt-5 text-center cursor-pointer">
              <button
                onClick={resetForm}
                type="button"
                className=" cursor-pointer relative flex items-center justify-center gap-2 px-4 py-2 bg-transparent text-gray-600 group hover:text-white transition-all duration-300 mx-auto overflow-hidden rounded-md"
              >
                <IoIosArrowBack className="w-4 h-4 z-10" />
                <span className="z-10">Back to Login</span>
                <span className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-red-600 to-red-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out rounded-md z-0" />
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form
            onSubmit={handleCodeSubmit}
            className="bg-white p-8 rounded-lg shadow-md space-y-4"
          >
            <h2 className="text-center text-2xl font-bold text-gray-900">
              Enter the Verification Code
            </h2>
            <p className="text-center text-sm text-gray-600">
              We’ve sent a 6-digit code to
            </p>
            <div className="text-center text-sm text-gray-700 font-medium">
              {email}
            </div>
            <div className="text-center text-sm text-gray-600">
              Code expires in:
              <span className="text-red-600 font-semibold ml-1">
                {formatTimer()}
              </span>
            </div>
            <div className="flex justify-center gap-2">
              {code.map((num, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  maxLength={1}
                  value={num}
                  onChange={(e) => handleCodeChange(e, idx)}
                  className="w-10 h-12 text-center border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-md text-lg hover:bg-red-600 transition"
            >
              Verify Code
            </button>

            <div className="text-center text-sm text-gray-600">
              Didn’t receive the code?
              <button
                onClick={handleResend}
                disabled={resendDisabled}
                className={`ml-2 font-medium ${
                  resendDisabled
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-red-500 hover:underline"
                }`}
              >
                Resend Code
              </button>
            </div>

            <div className="mt-5 text-center">
              <button
                onClick={goBackToStep1}
                type="button"
                className=" cursor-pointer relative flex items-center justify-center gap-2 px-4 py-2 bg-transparent text-gray-600 group hover:text-white transition-all duration-300 mx-auto overflow-hidden rounded-md"
              >
                <IoIosArrowBack className="w-4 h-4 z-10" />
                <span className="cursor-pointer z-10">Change email</span>
                <span className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-red-600 to-red-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out rounded-md z-0" />
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form
            onSubmit={handlePasswordSubmit}
            className="bg-gray-50 p-8 rounded-lg shadow-md space-y-6"
          >
            <div className="flex justify-center">
              <BsShieldLock className="w-13 h-13 text-red-500" />
            </div>
            <h2 className="text-center text-2xl font-bold text-gray-900">
              Reset your Password
            </h2>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IoEyeOutline className="w-7 h-6 text-gray-500" />
                ) : (
                  <IoEyeOffOutline className="w-7 h-6 text-gray-500" />
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
            >
              Reset Password
            </button>
          </form>
        )}

        {step > 3 && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md flex flex-col items-center gap-3">
  {/* Error Icon and Message */}
  <div className="flex items-center gap-2">
    <AiOutlineExclamationCircle className="w-6 h-6 text-red-600" />
    <span className="text-sm sm:text-base">Unexpected error. Please try again.</span>
  </div>

  {/* Button */}
  <button
    onClick={goBackToStep1}
    type="button"
    className="relative flex items-center justify-center gap-2 px-4 py-2 bg-transparent text-gray-600 group hover:text-white transition-all duration-300 mx-auto overflow-hidden rounded-md"
  >
    <IoIosArrowBack className="w-4 h-4 z-10" />
    <span className="z-10">Change Email</span>
    <span className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-red-600 to-red-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out rounded-md z-0" />
  </button>
</div>

          
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
