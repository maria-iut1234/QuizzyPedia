"use client";

import React, { useState, useEffect } from "react";
import "../../styles/globals.css";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [bgColor, setBgColor] = useState("bg-gray-100");

  const colors = [
    "bg-theme-black",
    "bg-theme-green",
    "bg-theme-yellow",
    "bg-theme-l-orange",
    "bg-theme-d-orange",
  ];

  const selectRandomHexColor = () => {
    const randomColorHex = colors[Math.floor(Math.random() * colors.length)];
    return randomColorHex;
  };

  useEffect(() => {
    setBgColor(selectRandomHexColor());
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    localStorage.setItem("user", "");
    try {
      e.preventDefault();

      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.log("Error logging in");
        toast.error("Error logging in");
        throw new Error("Error logging in");
      }

      const data = await res.json();
      const user = data.user;

      // Save user object in localStorage
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Successfully logged in");
      console.log("Successfully logged in");

      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error logging in");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <ToastContainer />
      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
        <div className="mt-4 shadow-md rounded-lg text-left">
          <div className={`${bgColor} h-2 rounded-t-lg`}></div>
          <h2 className="text-left text-2xl font-bold mt-4 pt-6 px-12">
            Log In To Your Account
          </h2>
          <a className="text-left text-sm px-12">Welcome back!</a>
          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 shadow-md rounded-lg pb-12 px-12 pt-6 mb-4"
          >
            <div className="mb-4 relative">
              {/* <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email:
              </label> */}
              <div className="flex items-center shadow appearance-none border rounded w-full">
                <MdEmail className="absolute ml-3 text-gray-400" size={20} />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="pl-10 p-2 w-full rounded focus:outline-gray-500 focus:outline-2"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="mb-6 relative">
              {/* <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password:
              </label> */}
              <div className="flex items-center shadow appearance-none border rounded w-full">
                <MdLock className="absolute ml-3 text-gray-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="pl-10 pr-10 p-2 rounded w-full focus:outline-gray-500 focus:outline-2"
                  placeholder="Enter your password"
                />
                <div className="absolute right-0 pr-3 flex items-center text-sm leading-5">
                  {showPassword ? (
                    <MdVisibilityOff
                      className="text-gray-400 cursor-pointer"
                      size={20}
                      onClick={toggleShowPassword}
                    />
                  ) : (
                    <MdVisibility
                      className="text-gray-400 cursor-pointer"
                      size={20}
                      onClick={toggleShowPassword}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-baseline">
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className={`rounded`}
                />
                <label
                  htmlFor="remember"
                  className="text-gray-600 ml-2 text-sm"
                >
                  Remember Me
                </label>
              </div>
              <a
                href="#"
                className="text-sm text-gray-600 hover:underline hover:text-gray-950"
              >
                Forgot password?
              </a>
            </div>
            <div className="pt-6">
              <button
                type="submit"
                className={`${bgColor} hover:bg-gray-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full`}
              >
                Login
              </button>
              <div className="text-center p-3">
                <a
                  href="/register"
                  className="text-sm text-gray-600 hover:underline hover:text-gray-950"
                >
                  Don't have an account?{" "}
                  <span className={`font-bold`}>Sign up here!</span>
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
