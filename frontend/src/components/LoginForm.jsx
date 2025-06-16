import React, { useState } from "react";
import { LogIn, User, Lock, Users, Shield } from "react-feather";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const LoginForm = () => {
  const [userType, setUserType] = useState("patient");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulating authentication process
    setTimeout(async () => {
      // In a real application, you would handle authentication here
      // and redirect based on user type and auth statuss
      try {
        const response = await api.post("api/token/", {
          username,
          password,
        });
        const { access, refresh, role } = response.data;
        console.log(response.data);
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
        localStorage.setItem("role", role);
        localStorage.setItem("username", username);

        navigate("/dashboard");
      } catch (error) {
        console.log(error);
      }

      console.log("Login attempt:", {
        userType,
        username,
        password,
        rememberMe,
      });
      setIsLoading(false);

      // For demo purposes, showing error for empty fields
      if (!username || !password) {
        setError("Please enter both username and password");
      }
    }, 1000);
  };

  const checkAccessToken = async () => {
    const token = localStorage.getItem("access_token");
    const refresh = localStorage.getItem("refresh_token");
    console.log(refresh);
    if (!token) return true;

    const decode = jwtDecode(token);
    const exp = decode.exp;

    const now = Math.floor(Date.now() / 1000);

    if (exp < now) {
      const response = await api.post("api/token/refresh/", {
        refresh,
      });
      navigate("/login");
      localStorage.setItem("access_token", response.data.access);
    } else {
      console.log("Access hasn't expired");
    }
  };
  checkAccessToken();

  return (
    <div className="login-page bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-sm-5">
                <div className="text-center mb-4">
                  <h3 className="fw-bold text-primary mb-1">MediCare Pro</h3>
                  <p className="text-muted">Sign in to access your account</p>
                </div>

                {/* User Type Selector */}
                <div className="user-type-selector mb-4">
                  <div className="d-flex justify-content-between border rounded p-1 bg-light">
                    <button
                      type="button"
                      className={`btn flex-grow-1 py-2 ${
                        userType === "patient"
                          ? "btn-primary"
                          : "btn-light text-muted"
                      }`}
                      onClick={() => setUserType("patient")}
                    >
                      <User size={18} className="me-2" />
                      Patient
                    </button>
                    <button
                      type="button"
                      className={`btn flex-grow-1 py-2 ${
                        userType === "doctor"
                          ? "btn-primary"
                          : "btn-light text-muted"
                      }`}
                      onClick={() => setUserType("doctor")}
                    >
                      <Users size={18} className="me-2" />
                      Doctor
                    </button>
                    <button
                      type="button"
                      className={`btn flex-grow-1 py-2 ${
                        userType === "admin"
                          ? "btn-primary"
                          : "btn-light text-muted"
                      }`}
                      onClick={() => setUserType("admin")}
                    >
                      <Shield size={18} className="me-2" />
                      Admin
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="alert alert-danger py-2" role="alert">
                    {error}
                  </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <User size={18} className="text-muted" />
                      </span>
                      <input
                        type="username"
                        className="form-control"
                        id="username"
                        placeholder={`Enter your username${
                          userType === "admin" ? " (admin@medicpro.com)" : ""
                        }`}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <label htmlFor="password" className="form-label mb-0">
                        Password
                      </label>
                      <a
                        href="#forgot-password"
                        className="text-primary small text-decoration-none"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <Lock size={18} className="text-muted" />
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4 d-flex justify-content-between">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label
                        className="form-check-label user-select-none"
                        htmlFor="rememberMe"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Signing in...
                      </span>
                    ) : (
                      <span className="d-flex align-items-center justify-content-center">
                        <LogIn size={18} className="me-2" />
                        Sign In
                      </span>
                    )}
                  </button>

                  {userType === "patient" && (
                    <div className="text-center">
                      <p className="text-muted mb-0">
                        Don't have an account?{" "}
                        <a href="signup" className="text-primary">
                          Register Now
                        </a>
                      </p>
                    </div>
                  )}
                </form>

                {/* Additional Information */}
                {userType === "doctor" && (
                  <div className="mt-4 pt-3 border-top">
                    <div className="alert alert-info py-2" role="alert">
                      <small>
                        <strong>Note for Doctors:</strong> If you're having
                        trouble accessing your account, please contact your
                        hospital administrator.
                      </small>
                    </div>
                  </div>
                )}

                {userType === "admin" && (
                  <div className="mt-4 pt-3 border-top">
                    <div className="alert alert-info py-2" role="alert">
                      <small>
                        <strong>Admin Access:</strong> This portal is restricted
                        to authorized hospital administrators only. For security
                        reasons, failed login attempts are logged.
                      </small>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Help & Support */}
            <div className="text-center mt-4">
              <p className="text-muted small mb-0">
                Need help?{" "}
                <a href="#help" className="text-primary">
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
