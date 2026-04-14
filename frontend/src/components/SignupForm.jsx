import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ROLES = [
  { value: "patient", label: "Patient" },
  { value: "doctor", label: "Doctor" },
  { value: "nurse", label: "Nurse" },
  { value: "receptionist", label: "Receptionist" },
  { value: "labtech", label: "Lab Technician" },
  { value: "pharmacist", label: "Pharmacist" },
  { value: "admin", label: "Admin" },
];

export default function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
    staff_number: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.first_name.trim())
      newErrors.first_name = "First name is required";

    if (!formData.last_name.trim())
      newErrors.last_name = "Last name is required";

    if (!formData.username.trim()) newErrors.username = "Username is required";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (formData.role !== "patient" && !formData.staff_number.trim())
      newErrors.staff_number = "License / staff number is required";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // clear staff_number when switching to patient
      ...(name === "role" && value === "patient" ? { staff_number: "" } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setSubmitStatus("error");
      return;
    }

    try {
      await api.post("api/users/", formData);
      toast.success("Signed Up Successfully");
      setSubmitStatus("success");
      setErrors({});
      navigate("/login");
      setTimeout(() => {
        setFormData({
          first_name: "",
          last_name: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "patient",
          staff_number: "",
        });
        setSubmitStatus("");
      }, 3000);
    } catch (error) {
      console.log(error);
      toast.error("Signup Unsuccessful");
      setSubmitStatus("error");
    }
  };

  const selectedRoleLabel = ROLES.find((r) => r.value === formData.role)?.label;

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card shadow-sm border-0"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <div className="card-body p-4 p-md-5">
          <h1 className="text-center mb-0 fw-bold text-primary">
            MediCare Pro
          </h1>
          <p
            className="text-center text-muted mb-4 mt-2"
            style={{ fontSize: "1.1rem" }}
          >
            Sign up to create your account
          </p>

          {submitStatus === "success" && (
            <div className="alert alert-success" role="alert">
              Registration successful! Redirecting to login...
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* First & Last Name */}
            <div className="row mb-3">
              <div className="col-md-6 mb-3 mb-md-0">
                <label htmlFor="first_name" className="form-label">
                  First Name
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-person"></i>
                  </span>
                  <input
                    type="text"
                    className={`form-control ${errors.first_name ? "is-invalid" : ""}`}
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="First name"
                  />
                  {errors.first_name && (
                    <div className="invalid-feedback">{errors.first_name}</div>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <label htmlFor="last_name" className="form-label">
                  Last Name
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-person"></i>
                  </span>
                  <input
                    type="text"
                    className={`form-control ${errors.last_name ? "is-invalid" : ""}`}
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Last name"
                  />
                  {errors.last_name && (
                    <div className="invalid-feedback">{errors.last_name}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Username */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i className="bi bi-at"></i>
                </span>
                <input
                  type="text"
                  className={`form-control ${errors.username ? "is-invalid" : ""}`}
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i className="bi bi-envelope"></i>
                </span>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
            </div>

            {/* Role */}
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i className="bi bi-person-badge"></i>
                </span>
                <select
                  className="form-select"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* License / Staff Number — all roles except patient */}
            {formData.role !== "patient" && (
              <div className="mb-3">
                <label htmlFor="staff_number" className="form-label">
                  {selectedRoleLabel} License / Staff Number
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-card-heading"></i>
                  </span>
                  <input
                    type="text"
                    className={`form-control ${errors.staff_number ? "is-invalid" : ""}`}
                    id="staff_number"
                    name="staff_number"
                    value={formData.staff_number}
                    onChange={handleChange}
                    placeholder={`Enter your ${selectedRoleLabel} license/staff number`}
                  />
                  {errors.staff_number && (
                    <div className="invalid-feedback">
                      {errors.staff_number}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i className="bi bi-lock"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                  ></i>
                </button>
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i className="bi bi-lock-fill"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-lg">
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Sign Up as {selectedRoleLabel}
              </button>
            </div>
          </form>

          <p className="text-center mt-4 mb-0">
            Already have an account?{" "}
            <a href="/login" className="text-primary text-decoration-none">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
