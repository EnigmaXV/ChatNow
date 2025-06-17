import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import img from "../assets/login.jpg";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length <= 2) {
      //TODO: Change this to 6 characters
      newErrors.password = "Password must be at least 3 characters";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await login(formData);
      // Navigate to home page after successful login
      navigate("/home");
    } catch (error) {
      // Handle login error
      setErrors({
        submit: error.message || "Failed to login. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card lg:card-side bg-base-100 shadow-xl max-w-4xl">
        <figure className="lg:w-1/2 bg-primary/5 p-8">
          <img
            src={img}
            alt="Login illustration"
            className="w-full h-full object-contain"
          />
        </figure>
        <div className="card-body lg:w-1/2">
          <h2 className="card-title text-2xl font-bold text-center mb-4">
            Login
          </h2>
          {errors.submit && (
            <div className="alert alert-error mb-4">
              <span>{errors.submit}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label text-base font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`input input-bordered w-full ${
                  errors.email ? "input-error" : ""
                }`}
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.email}
                  </span>
                </label>
              )}
            </div>
            <div className="form-control">
              <label className="label text-base font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`input input-bordered w-full ${
                    errors.password ? "input-error" : ""
                  }`}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.password}
                  </span>
                </label>
              )}
              <label className="label mt-2">
                <Link
                  to="/forgot-password"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button
                disabled={isLoading}
                type="submit"
                className="btn btn-primary w-32"
              >
                Login{" "}
                {isLoading && (
                  <span className="loading loading-spinner loading-sm ml-2"></span>
                )}
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="link link-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
