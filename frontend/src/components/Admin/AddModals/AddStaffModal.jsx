import React, { useState } from "react";
import { Modal, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import api from "../../../api";

const ROLES = [
  "doctor",
  "nurse",
  "pharmacist",
  "receptionist",
  "lab_technician",
];

const INITIAL_FORM = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  staff_number: "",
  role: "",
  department: "",
  password: "",
  confirm_password: "",
};

function AddStaffModal({ show, onClose, onStaffAdded }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const validate = () => {
    const errs = {};
    if (!form.first_name.trim()) errs.first_name = "First name is required.";
    if (!form.last_name.trim()) errs.last_name = "Last name is required.";
    if (!form.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Enter a valid email address.";
    }
    if (!form.role) errs.role = "Please select a role.";
    if (!form.staff_number.trim())
      errs.staff_number = "Staff number is required.";
    if (!form.password) {
      errs.password = "Password is required.";
    } else if (form.password.length < 8) {
      errs.password = "Password must be at least 8 characters.";
    }
    if (!form.confirm_password) {
      errs.confirm_password = "Please confirm the password.";
    } else if (form.password !== form.confirm_password) {
      errs.confirm_password = "Passwords do not match.";
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        staff_number: form.staff_number.trim(),
        role: form.role,
        department: form.department.trim(),
        password: form.password,
      };
      const res = await api.post("api/users/", payload);
      console.log("Staff added:", res.data)
      onStaffAdded(res.data);
      handleClose();
    } catch (err) {
      const data = err?.response?.data;
      if (data && typeof data === "object") {
        // Map Django field errors directly onto form errors
        const fieldErrs = {};
        Object.entries(data).forEach(([key, val]) => {
          fieldErrs[key] = Array.isArray(val) ? val[0] : val;
        });
        console.log("Error submitting", err)
        setErrors(fieldErrs);
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setServerError("");
    setShowPassword(false);
    setShowConfirm(false);
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton className="border-bottom py-3 px-4">
        <div className="d-flex align-items-center gap-2">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle"
            style={{ width: 36, height: 36, background: "#dbeafe" }}
          >
            <UserPlus size={18} color="#2563eb" />
          </div>
          <div>
            <Modal.Title style={{ fontSize: "1rem", fontWeight: 700 }}>
              Add New Staff Member
            </Modal.Title>
            <p className="text-muted mb-0" style={{ fontSize: "0.78rem" }}>
              Fill in the details below to register a new staff member
            </p>
          </div>
        </div>
      </Modal.Header>

      <Form onSubmit={handleSubmit} noValidate>
        <Modal.Body className="px-4 py-3">
          {serverError && (
            <div
              className="alert alert-danger py-2 px-3 mb-3"
              style={{ fontSize: "0.85rem" }}
            >
              {serverError}
            </div>
          )}

          {/* Personal Info */}
          <p
            className="fw-semibold text-muted mb-2"
            style={{
              fontSize: "0.78rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Personal Information
          </p>
          <Row className="g-3 mb-3">
            <Col md={6}>
              <Form.Label
                style={{ fontSize: "0.85rem" }}
                className="fw-semibold"
              >
                First Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                placeholder="e.g. John"
                isInvalid={!!errors.first_name}
                style={{ fontSize: "0.875rem" }}
              />
              <Form.Control.Feedback
                type="invalid"
                style={{ fontSize: "0.78rem" }}
              >
                {errors.first_name}
              </Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Label
                style={{ fontSize: "0.85rem" }}
                className="fw-semibold"
              >
                Last Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                placeholder="e.g. Doe"
                isInvalid={!!errors.last_name}
                style={{ fontSize: "0.875rem" }}
              />
              <Form.Control.Feedback
                type="invalid"
                style={{ fontSize: "0.78rem" }}
              >
                {errors.last_name}
              </Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Label
                style={{ fontSize: "0.85rem" }}
                className="fw-semibold"
              >
                Email Address <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="e.g. john@hospital.com"
                isInvalid={!!errors.email}
                style={{ fontSize: "0.875rem" }}
              />
              <Form.Control.Feedback
                type="invalid"
                style={{ fontSize: "0.78rem" }}
              >
                {errors.email}
              </Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Label
                style={{ fontSize: "0.85rem" }}
                className="fw-semibold"
              >
                Phone Number
              </Form.Label>
              <Form.Control
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="e.g. +254 700 000000"
                isInvalid={!!errors.phone}
                style={{ fontSize: "0.875rem" }}
              />
              <Form.Control.Feedback
                type="invalid"
                style={{ fontSize: "0.78rem" }}
              >
                {errors.phone}
              </Form.Control.Feedback>
            </Col>
          </Row>

          <hr className="my-3" />

          {/* Role Info */}
          <p
            className="fw-semibold text-muted mb-2"
            style={{
              fontSize: "0.78rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Role & Assignment
          </p>
          <Row className="g-3 mb-3">
            <Col md={6}>
              <Form.Label
                style={{ fontSize: "0.85rem" }}
                className="fw-semibold"
              >
                Role <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                name="role"
                value={form.role}
                onChange={handleChange}
                isInvalid={!!errors.role}
                style={{ fontSize: "0.875rem" }}
              >
                <option value="">-- Select Role --</option>
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r
                      .replace("_", " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback
                type="invalid"
                style={{ fontSize: "0.78rem" }}
              >
                {errors.role}
              </Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Label
                style={{ fontSize: "0.85rem" }}
                className="fw-semibold"
              >
                Staff Number <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                name="staff_number"
                value={form.staff_number}
                onChange={handleChange}
                placeholder="e.g. STF-00123"
                isInvalid={!!errors.staff_number}
                style={{ fontSize: "0.875rem" }}
              />
              <Form.Control.Feedback
                type="invalid"
                style={{ fontSize: "0.78rem" }}
              >
                {errors.staff_number}
              </Form.Control.Feedback>
            </Col>
            <Col md={12}>
              <Form.Label
                style={{ fontSize: "0.85rem" }}
                className="fw-semibold"
              >
                Department
              </Form.Label>
              <Form.Control
                name="department"
                value={form.department}
                onChange={handleChange}
                placeholder="e.g. Cardiology"
                isInvalid={!!errors.department}
                style={{ fontSize: "0.875rem" }}
              />
              <Form.Control.Feedback
                type="invalid"
                style={{ fontSize: "0.78rem" }}
              >
                {errors.department}
              </Form.Control.Feedback>
            </Col>
          </Row>

          <hr className="my-3" />

          {/* Password */}
          <p
            className="fw-semibold text-muted mb-2"
            style={{
              fontSize: "0.78rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Account Security
          </p>
          <Row className="g-3">
            <Col md={6}>
              <Form.Label
                style={{ fontSize: "0.85rem" }}
                className="fw-semibold"
              >
                Password <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  isInvalid={!!errors.password}
                  style={{ fontSize: "0.875rem" }}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPassword((p) => !p)}
                  tabIndex={-1}
                  style={{
                    borderColor: errors.password ? "#dc3545" : undefined,
                  }}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </Button>
                <Form.Control.Feedback
                  type="invalid"
                  style={{ fontSize: "0.78rem" }}
                >
                  {errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Col>
            <Col md={6}>
              <Form.Label
                style={{ fontSize: "0.85rem" }}
                className="fw-semibold"
              >
                Confirm Password <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type={showConfirm ? "text" : "password"}
                  name="confirm_password"
                  value={form.confirm_password}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  isInvalid={!!errors.confirm_password}
                  style={{ fontSize: "0.875rem" }}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowConfirm((p) => !p)}
                  tabIndex={-1}
                  style={{
                    borderColor: errors.confirm_password
                      ? "#dc3545"
                      : undefined,
                  }}
                >
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </Button>
                <Form.Control.Feedback
                  type="invalid"
                  style={{ fontSize: "0.78rem" }}
                >
                  {errors.confirm_password}
                </Form.Control.Feedback>
              </InputGroup>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer className="border-top px-4 py-3 d-flex justify-content-between align-items-center">
          <p className="text-muted mb-0" style={{ fontSize: "0.78rem" }}>
            Fields marked <span className="text-danger">*</span> are required
          </p>
          <div className="d-flex gap-2">
            <Button
              variant="outline-secondary"
              onClick={handleClose}
              disabled={submitting}
              style={{ fontSize: "0.875rem" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={submitting}
              className="d-flex align-items-center gap-2"
              style={{ fontSize: "0.875rem" }}
            >
              {submitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Saving...
                </>
              ) : (
                <>
                  <UserPlus size={15} />
                  Add Staff
                </>
              )}
            </Button>
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddStaffModal;
