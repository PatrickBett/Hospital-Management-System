import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
export default function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient", // Default role set to patient
    doctor_number: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const validateForm = () => {
    const newErrors = {};

    // First name validation
    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }

    // Last name validation
    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Doctor number validation (only if role is doctor)
    if (formData.role === "doctor" && !formData.doctor_number.trim()) {
      newErrors.doctor_number = "Doctor number is required";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      // Form is valid, submit data
      console.log("Form submitted successfully:", formData);
      //function to submit formdata to bbackend

      try {
        await api
          .post("api/users/", formData)
          .then((response) => {
            console.log(response.data);
          })
          .then(() => {
            alert("Signed Up Successfully");
            navigate("/login");
          });
      } catch (error) {
        console.log(error);
      }

      setSubmitStatus("success");
      setErrors({});

      // In a real app, you would send this data to your backend
      // Example: axios.post('/api/signup', formData);

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          first_name: "",
          last_name: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "patient",
          doctor_number: "",
        });
        setSubmitStatus("");
      }, 3000);
    } else {
      setErrors("Error why form  got not submitted", formErrors);
      setSubmitStatus("error");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
            style={{ fontSize: "1.2rem" }}
          >
            Sign up to create your account
          </p>

          {submitStatus === "success" && (
            <div className="alert alert-success" role="alert">
              Registration successful! Please check your email to verify your
              account.
            </div>
          )}

          {/* Role Selection */}
          <div className="card mb-4">
            <div className="card-body p-0">
              <div className="d-flex">
                <button
                  type="button"
                  className={`btn flex-grow-1 py-3 rounded-0 ${
                    formData.role === "patient"
                      ? "btn-primary text-white"
                      : "btn-light"
                  }`}
                  onClick={() => setFormData({ ...formData, role: "patient" })}
                >
                  <i className="bi bi-person me-2"></i> Patient
                </button>
                <button
                  type="button"
                  className={`btn flex-grow-1 py-3 rounded-0 ${
                    formData.role === "doctor"
                      ? "btn-primary text-white"
                      : "btn-light"
                  }`}
                  onClick={() => setFormData({ ...formData, role: "doctor" })}
                >
                  <i className="bi bi-clipboard2-pulse me-2"></i> Doctor
                </button>
                <button
                  type="button"
                  className={`btn flex-grow-1 py-3 rounded-0 ${
                    formData.role === "admin"
                      ? "btn-primary text-white"
                      : "btn-light"
                  }`}
                  onClick={() => setFormData({ ...formData, role: "admin" })}
                >
                  <i className="bi bi-shield-lock me-2"></i> Admin
                </button>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="first_name" className="form-label">
                  First Name
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-person"></i>
                  </span>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.first_name ? "is-invalid" : ""
                    }`}
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
                    className={`form-control ${
                      errors.last_name ? "is-invalid" : ""
                    }`}
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

            <div className="col-md-6">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i className="bi bi-person"></i>
                </span>
                <input
                  type="text"
                  className={`form-control ${
                    errors.last_name ? "is-invalid" : ""
                  }`}
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="username"
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>
            </div>

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

            {/* Conditional Doctor Number Field */}
            {formData.role === "doctor" && (
              <div className="mb-3">
                <label htmlFor="doctor_number" className="form-label">
                  Doctor Number
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-card-heading"></i>
                  </span>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.doctor_number ? "is-invalid" : ""
                    }`}
                    id="doctor_number"
                    name="doctor_number"
                    value={formData.doctor_number}
                    onChange={handleChange}
                    placeholder="Enter your doctor license number"
                  />
                  {errors.doctor_number && (
                    <div className="invalid-feedback">
                      {errors.doctor_number}
                    </div>
                  )}
                </div>
              </div>
            )}

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
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={togglePasswordVisibility}
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

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i className="bi bi-lock"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
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

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-lg">
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Sign Up as{" "}
                {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
              </button>
            </div>
          </form>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <a href="login" className="text-primary text-decoration-none">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
