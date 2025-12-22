"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";

const WILAYAS = [
  "Adrar",
  "Chlef",
  "Laghouat",
  "Oum El Bouaghi",
  "Batna",
  "Béjaïa",
  "Biské",
  "Béchar",
  "Blida",
  "Bouïra",
  "Tamanrasset",
  "Tébessa",
  "Tlemcen",
  "Tiaret",
  "Tizi Ouzou",
  "Alger",
  "Djelfa",
  "Jijel",
  "Sétif",
  "Saïda",
  "Skikda",
  "Sidi Bel Abbès",
  "Annaba",
  "Guelma",
  "Constantine",
  "Médéa",
  "Mostaganem",
  "M'Sila",
  "Mascara",
  "Ouargla",
  "Oran",
  "El Bayadh",
  "Illizi",
  "Bordj Bou Aréridj",
  "Boumerdès",
  "El Tarf",
  "Tindouf",
  "Tissemsilt",
  "El Oued",
  "Khenchela",
  "Souk Ahras",
  "Tipaza",
  "Mila",
  "Aïn Defla",
  "Naama",
  "Aïn Témouchent",
  "Ghardaïa",
  "Relizane",
];

export default function SignupForm({
  onBackToLogin,
  onSignupComplete,
  onUserTypeChange,
}) {
  const [userType, setUserType] = useState("consumer");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    producerName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    wilaya: "",
    description: "",
    isBioCertified: false,
  });
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleChangeUserType = (type) => {
    setUserType(type);
    onUserTypeChange(type);
    // Reset name fields when switching types
    setFormData((prev) => ({
      ...prev,
      firstName: "",
      lastName: "",
      producerName: "",
    }));
  };

  const handleChange = (e) => {
    const { name, type, value } = e.target;
    setPasswordError("");
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.checked,
      }));
    } else {
      setFormData((prev) => {
        const newData = {
          ...prev,
          [name]: value,
        };
        // Clear password error if passwords match while typing
        if (name === "password" || name === "confirmPassword") {
          if (
            newData.password &&
            newData.confirmPassword &&
            newData.password === newData.confirmPassword
          ) {
            setPasswordError("");
          }
        }
        return newData;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim passwords to remove any whitespace
    const password = formData.password.trim();
    const confirmPassword = formData.confirmPassword.trim();

    // Validate passwords
    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    // Validate required fields
    if (userType === "consumer") {
      if (!formData.firstName || !formData.lastName || !formData.email) {
        alert("Please fill in all required fields");
        return;
      }
    } else {
      if (!formData.producerName || !formData.email) {
        alert("Please fill in all required fields");
        return;
      }
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSignupComplete(formData);
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      {/* Heading */}
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-bold text-[#285153] mb-3 font-sans">
          Creat Acount
        </h1>
        <p className="text-[#285153]/80 text-lg font-medium font-sans">
          One Step Away from Something Great!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Google Sign Up */}
        <button
          type="button"
          className="w-full max-w-sm mx-auto border border-black text-black px-6 py-2 rounded-full font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 bg-white mb-6"
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </div>
          sign up with google
        </button>

        {/* User Type Toggle */}
        <div className="bg-[#B0C4C2] p-1.5 rounded-full flex relative mb-6">
          {/* Animated Background Pill */}
          <div
            className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-full shadow-md transition-all duration-300 ease-in-out ${
              userType === "consumer" ? "left-1.5" : "left-[calc(50%+4.5px)]"
            }`}
          />
          <button
            type="button"
            onClick={() => handleChangeUserType("consumer")}
            className={`flex-1 py-3 text-center z-10 font-bold text-lg transition-colors duration-300 ${userType === "consumer" ? "text-[#285153]" : "text-[#285153]/60"}`}
          >
            consumer
          </button>
          <button
            type="button"
            onClick={() => handleChangeUserType("producer")}
            className={`flex-1 py-3 text-center z-10 font-bold text-lg transition-colors duration-300 ${userType === "producer" ? "text-[#285153]" : "text-[#285153]/60"}`}
          >
            Producer
          </button>
        </div>

        {/* Consumer Name Fields */}
        {userType === "consumer" && (
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <User className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
              <input
                type="text"
                name="firstName"
                placeholder="first name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full pl-14 pr-6 py-4 bg-[#E0E0E0] text-gray-900 placeholder-gray-500 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-[#285153]"
              />
            </div>
            <div className="relative">
              <User className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
              <input
                type="text"
                name="lastName"
                placeholder="Familly name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full pl-14 pr-6 py-4 bg-[#E0E0E0] text-gray-900 placeholder-gray-500 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-[#285153]"
              />
            </div>
          </div>
        )}

        {/* Producer Name Field */}
        {userType === "producer" && (
          <div className="relative">
            <User className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
            <input
              type="text"
              name="producerName"
              placeholder="Producer name"
              value={formData.producerName}
              onChange={handleChange}
              required
              className="w-full pl-14 pr-6 py-4 bg-[#E0E0E0] text-gray-900 placeholder-gray-500 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-[#285153]"
            />
          </div>
        )}

        {/* Email Input */}
        <div className="relative">
          <Mail className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full pl-14 pr-6 py-4 bg-[#E0E0E0] text-gray-900 placeholder-gray-500 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-[#285153]"
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <Lock className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full pl-14 pr-6 py-4 bg-[#E0E0E0] text-gray-900 placeholder-gray-500 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-[#285153]"
          />
        </div>

        {/* Confirm Password Input */}
        <div className="relative">
          <Lock className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
          <input
            type="password"
            name="confirmPassword"
            placeholder="confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full pl-14 pr-6 py-4 bg-[#E0E0E0] text-gray-900 placeholder-gray-500 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-[#285153]"
          />
        </div>

        {/* Password Requirements */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-2 text-xs sm:text-sm text-gray-500 underline mb-8">
          <a href="#" className="decoration-1 hover:text-[#285153] whitespace-nowrap">
            password must be at least 8 characters long
          </a>
          <a href="#" className="decoration-1 hover:text-[#285153] whitespace-nowrap">
            Forget password ?
          </a>
        </div>

        {/* Error Message */}
        {passwordError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
            {passwordError}
          </div>
        )}

        {/* Sign Up Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full max-w-sm mx-auto bg-[#285153] hover:bg-[#1a3839] text-white px-10 py-3 rounded-full font-bold text-lg transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
        >
          <span>→</span>
          <span>{loading ? "Creating account..." : "Sign up"}</span>
        </button>
      </form>

      {/* Back to Login */}
      <div className="mt-6 text-center md:hidden">
        <p className="text-gray-600 text-sm">
          Already have an account?{" "}
          <button
            onClick={onBackToLogin}
            className="text-teal-700 font-semibold hover:text-teal-900"
          >
            Log in
          </button>
        </p>
      </div>
    </motion.div>
  );
}
