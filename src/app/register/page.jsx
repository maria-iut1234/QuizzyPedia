"use client";

import React, { useState, useEffect } from "react";
import "../../styles/globals.css";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Error creating account");
      }

      toast.success("Account created successfully");
      // console.log("Account created successfully");

      // Redirect to login page
      window.location.href = "/login";
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error creating account");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <ToastContainer />
      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
        <div className="mt-4 shadow-md rounded-lg text-left">
          <div className={`${bgColor} h-2 rounded-t-lg`}></div>
          <h2 className="text-left text-2xl font-bold mt-4 pt-6 px-12">
            Create Your Account
          </h2>
          <a className="text-left text-sm px-12">Join our community today!</a>
          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 shadow-md rounded-lg pb-12 px-12 pt-6 mb-4"
          >
            <div className="mb-4 relative">
              <div className="flex items-center shadow appearance-none border rounded w-full">
                <IoMdPerson className="absolute ml-3 text-gray-400" size={20} />
                <input
                  type="name"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  className="pl-10 p-2 w-full rounded focus:outline-gray-500 focus:outline-2"
                  placeholder="Enter your full name"
                />
              </div>
            </div>
            <div className="mb-4 relative">
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

            <div className="pt-6">
              <button
                type="submit"
                className={`${bgColor} hover:bg-gray-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full`}
              >
                Create an account
              </button>
              <div className="text-center p-3">
                <a
                  href="/login"
                  className="text-sm text-gray-600 hover:underline hover:text-gray-950"
                >
                  Already have an account?{" "}
                  <span className={`font-bold`}>Log in here!</span>
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
