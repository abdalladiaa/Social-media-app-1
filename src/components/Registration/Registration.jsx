import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerationSchema } from "../../Schemas/AuthSchemas";
import AppAlert from "../AppAlert/AppAlert";
import { Oval } from "react-loader-spinner";
import { useNavigate, Link } from "react-router-dom";

export default function Registration() {
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "male",
    },
  });

  async function submitRegister(values) {
    setLoading(true);
    setMsg(undefined);
    try {
      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/users/signup",
        values,
      );
      if (data.message === "success") {
        setMsg("success");
        navigate("/login");
      }
    } catch (err) {
      const serverError =
        err?.response?.data?.error || err.message || "Unknown error";
      setMsg(serverError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold">Create your account</h2>
        </div>

        <form onSubmit={handleSubmit(submitRegister)} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              User name
            </label>
            <input
              {...register("name")}
              id="name"
              type="text"
              placeholder="e.g. Abdalla"
              className={`block w-full px-4 py-2 rounded-xl border ${errors.name ? "border-red-300" : "border-gray-200"} focus:outline-none focus:ring-2 focus:ring-indigo-200`}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              placeholder="name@example.com"
              className={`block w-full px-4 py-2 rounded-xl border ${errors.email ? "border-red-300" : "border-gray-200"} focus:outline-none focus:ring-2 focus:ring-indigo-200`}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Password
            </label>
            <input
              {...register("password")}
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`block w-full px-4 py-2 rounded-xl border ${errors.password ? "border-red-300" : "border-gray-200"} focus:outline-none focus:ring-2 focus:ring-indigo-200`}
              aria-invalid={errors.password ? "true" : "false"}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute top-9 right-3 text-sm text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Re-Password */}
          <div className="relative">
            <label
              htmlFor="rePassword"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Re-type password
            </label>
            <input
              {...register("rePassword")}
              id="rePassword"
              type={showRePassword ? "text" : "password"}
              placeholder="repeat password"
              className={`block w-full px-4 py-2 rounded-xl border ${errors.rePassword ? "border-red-300" : "border-gray-200"} focus:outline-none focus:ring-2 focus:ring-indigo-200`}
              aria-invalid={errors.rePassword ? "true" : "false"}
            />
            <button
              type="button"
              onClick={() => setShowRePassword((v) => !v)}
              className="absolute top-9 right-3 text-sm text-gray-500"
            >
              {showRePassword ? "Hide" : "Show"}
            </button>
            {errors.rePassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.rePassword.message}
              </p>
            )}
          </div>

          {/* DOB */}
          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Date of birth
            </label>
            <input
              {...register("dateOfBirth")}
              id="dob"
              type="date"
              className={`block w-full px-4 py-2 rounded-xl border ${errors.dateOfBirth ? "border-red-300" : "border-gray-200"} focus:outline-none focus:ring-2 focus:ring-indigo-200`}
            />
            {errors.dateOfBirth && (
              <p className="mt-1 text-sm text-red-600">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Gender</p>
            <div className="flex gap-6 items-center">
              <label className="flex items-center gap-2">
                <input
                  {...register("gender")}
                  type="radio"
                  value="male"
                  defaultChecked
                  className="accent-indigo-600"
                />
                <span className="text-sm text-gray-700">Male</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  {...register("gender")}
                  type="radio"
                  value="female"
                  className="accent-indigo-600"
                />
                <span className="text-sm text-gray-700">Female</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-3 py-3 rounded-2xl text-white font-medium ${loading ? "bg-indigo-500/90" : "bg-indigo-600 hover:bg-indigo-700"} transition-all cursor-pointer`}
          >
            {loading ? (
              <>
                <Oval
                  visible={true}
                  height="22"
                  width="22"
                  ariaLabel="loading"
                />
                <span>Loading...</span>
              </>
            ) : (
              <span>Create account</span>
            )}
          </button>

          {msg && (
            <AppAlert
              color={msg === "success" ? "text-green-700" : "text-red-700"}
              message={msg}
            />
          )}

          <div className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-medium">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
