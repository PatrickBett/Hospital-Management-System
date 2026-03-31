import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppointmentModal from "../AppointmentModal";
import { Send } from "lucide-react";
import Mpesa from "../Mpesa";
import { toast } from "react-toastify";
import NextAppointmentNotice from "../NextAppointmentNotice";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Badge,
} from "react-bootstrap";
import { AdminContext } from "../../contexts/AdminContext";
import api from "../../api";

function PatientDashboard() {
  const { appointments, doctors, doctorappointments, setDoctorAppointments } =
    useContext(AdminContext);

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("username");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const userId = 1;

  const handleClose = () => {
    setIsOpen(false);
    setMessage("");
    setRecipient("");
  };



  const handleSubmit = async () => {
    toast.info("Sending message logic isn't wired up yet!");
    handleClose();
  };

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  if (role !== "patient") {
    return (
      <Container className="mt-5 text-center">
        <h4 className="text-danger">Access Denied</h4>
        <p>You do not have permission to view the patient dashboard.</p>
        <Button onClick={() => navigate("/login")}>Go to Login</Button>
      </Container>
    );
  }

  return (
    /* Notice: Removed "flex-grow-1" here since it should be handled by the parent wrapper */
    <div className="w-100 bg-light" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div className="bg-primary text-white py-3 mb-4 shadow-sm w-100">
        <div className="d-flex justify-content-between align-items-center px-4">
          <h2 className="mb-0">Patient Dashboard</h2>
          <Button variant="outline-light">
            <img src="" alt="Profile" />
          </Button>
        </div>
      </div>

      <Container fluid className="px-4">
        {/* Welcome Card */}
        <Row className="mb-4">
          <Col>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <h4 className="fw-bold">Welcome back, {username}</h4>
                <NextAppointmentNotice appointments={appointments} />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Quick Actions */}
        <Row className="mb-4">
          <Col md={4} className="mb-3">
            <Card className="h-100 shadow-sm bg-info bg-opacity-10 border-0">
              <Card.Body className="text-center d-flex flex-column justify-content-between align-items-center py-4">
                <div>
                  <i className="bi bi-calendar-plus fs-1 mb-3 text-info"></i>
                  <h5>Book Appointment</h5>
                  <p className="text-muted small">
                    Schedule your next visit with our specialists
                  </p>
                </div>
                <Button
                  variant="info"
                  className="text-white mt-2"
                  onClick={() => setShowModal(true)}
                >
                  Book Now
                </Button>
                <AppointmentModal
                  show={showModal}
                  handleClose={() => setShowModal(false)}
                  userId={userId}
                />
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-3">
            <Card className="h-100 shadow-sm bg-success bg-opacity-10 border-0">
              <Card.Body className="text-center d-flex flex-column justify-content-between align-items-center py-4">
                <div>
                  <i className="bi bi-file-medical fs-1 mb-3 text-success"></i>
                  <h5>Medical Records</h5>
                  <p className="text-muted small">
                    Access your health history and reports
                  </p>
                </div>
                <Button variant="success" className="mt-2">
                  View Records
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-3">
            <Card className="h-100 shadow-sm bg-warning bg-opacity-10 border-0">
              <Card.Body className="text-center d-flex flex-column justify-content-between align-items-center py-4">
                <div>
                  <i className="bi bi-chat-dots fs-1 mb-3 text-warning"></i>
                  <h5>Message Doctor</h5>
                  <p className="text-muted small">
                    Get in touch with your healthcare provider
                  </p>
                </div>
                <div className="d-flex gap-2 mt-2">
                  <Button variant="warning" onClick={() => setIsOpen(true)}>
                    Send Message
                  </Button>
                  {/* <Button
                    variant="outline-dark"
                    onClick={() => navigate("/inbox")}
                  >
                    View Inbox
                  </Button> */}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Message Modal */}
        {isOpen && (
          <div
            className="modal d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1060 }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">Send Message</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleClose}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Doctor</label>
                    <select
                      className="form-control"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      required
                    >
                      <option value="">Select Doctor</option>
                      {doctors &&
                        doctors.map((doctor) => (
                          <option key={doctor.id} value={doctor.id}>
                            Dr. {doctor.first_name} -{" "}
                            {doctor.doctordetails?.specialization?.name ||
                              "General"}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label fw-semibold">
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="form-control"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message here..."
                      rows="4"
                      style={{ resize: "none" }}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    className="d-flex align-items-center gap-2"
                    onClick={handleSubmit}
                  >
                    <Send size={16} /> Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Appointments Table */}
        <Row className="mb-4">
          <Col>
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-white py-3">
                <h5 className="mb-0 fw-bold">Your Appointments</h5>
              </Card.Header>
              <Card.Body className="p-0">
                <Table hover responsive className="align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-4">Date</th>
                      <th>Time</th>
                      <th>Doctor</th>
                      <th>Status</th>
                      <th className="pe-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments && appointments.length > 0 ? (
                      [...appointments]
                        .sort(
                          (a, b) =>
                            new Date(`${a.date}T${a.time}`) -
                            new Date(`${b.date}T${b.time}`),
                        )
                        .map((app, index) => (
                          <tr key={index}>
                            <td className="ps-4">{app.date}</td>
                            <td>{app.time}</td>
                            <td className="fw-semibold">
                              Dr. {app.doctor?.first_name || "N/A"}
                            </td>
                            <td>
                              <Badge
                                bg={
                                  app.status === "confirmed"
                                    ? "success"
                                    : app.status === "Denied"
                                      ? "danger"
                                      : "warning"
                                }
                              >
                                {app.status}
                              </Badge>
                            </td>
                            <td className="pe-4">
                              {app.status === "confirmed" ? (
                                app.paymentstatus === "Paid" ? (
                                  <Button size="sm" variant="outline-primary">
                                    Join
                                  </Button>
                                ) : (
                                  <Mpesa />
                                )
                              ) : (
                                <span className="text-muted">-</span>
                              )}
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center text-muted py-4">
                          Appointments Unavailable
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PatientDashboard;
