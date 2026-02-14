import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import AppAlert from "../AppAlert/AppAlert";
import { Oval } from "react-loader-spinner";
import { LoginSchema } from "../../Schemas/AuthSchemas";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export default function Login() {
  const [msg, setMsg] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {setToken} = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function submitLogin(values) {
    setLoading(true);
    setMsg(undefined);
    try {
      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/users/signin",
        values,
      );
      if (data.message === "success") {
        setMsg("success");
        localStorage.setItem("token", data.token);
        setToken(data.token)
        navigate("/");
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
          <h2 className="text-2xl font-semibold">Welcome back</h2>
        </div>

        <form onSubmit={handleSubmit(submitLogin)} className="space-y-4">
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
              placeholder="you@mail.com"
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
              <span>Sign in</span>
            )}
          </button>

          {msg && (
            <AppAlert
              color={msg === "success" ? "text-green-700" : "text-red-700"}
              message={msg}
            />
          )}

          <div className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/registration" className="text-indigo-600 font-medium">
              Create one
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
