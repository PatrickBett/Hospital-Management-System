import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Inbox from "../Inbox";
import { toast } from "react-toastify";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Badge,
  Modal,
} from "react-bootstrap";
import { AdminContext } from "../../contexts/AdminContext";
import api from "../../api";

function DoctorDashboard() {
  const { allUsers, doctorappointments, setDoctorAppointments } =
    useContext(AdminContext);

  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  const [messages] = useState([]);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
    setLoading(false);
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.patch(`/api/appointments/${id}/update-status/`, { status });
      const updatedAppointments = doctorappointments.map((group) =>
        group.map((appointment) =>
          appointment.id === id
            ? { ...appointment, status: status }
            : appointment,
        ),
      );
      setDoctorAppointments(updatedAppointments);
      toast.success(`Appointment status updated to ${status}`);
    } catch (error) {
      console.error("Status update failed", error);
      toast.error("Failed to update status");
    }
  };

  const patients = [
    {
      id: 1,
      name: "John Doe",
      age: 45,
      lastVisit: "2025-04-20",
      condition: "Hypertension",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 32,
      lastVisit: "2025-05-01",
      condition: "Diabetes",
    },
    {
      id: 3,
      name: "Robert Brown",
      age: 28,
      lastVisit: "2025-04-25",
      condition: "Asthma",
    },
  ];

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  if (role !== "doctor") return null;

  return (
    <>
      {/* Header */}
      <Row className="bg-success text-white py-3 mb-4 mx-0">
        <Col>
          <h2 className="ms-4 mb-0">Doctor Dashboard</h2>
        </Col>
        <Col xs="auto" className="me-4">
          <Button variant="outline-light">Profile</Button>
        </Col>
      </Row>

      <Container fluid className="px-4">
        {/* Stats Cards */}
        <Row className="mb-4 g-3">
          <Col md={3}>
            <Card className="shadow-sm bg-success bg-opacity-10 border-0 h-100">
              <Card.Body className="text-center d-flex flex-column justify-content-between">
                <h6 className="text-muted">Appointments</h6>
                <h2 className="display-4 fw-bold text-success">
                  {doctorappointments.flat().length}
                </h2>
                <Button variant="outline-success" size="sm">
                  View Schedule
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="shadow-sm bg-primary bg-opacity-10 border-0 h-100">
              <Card.Body className="text-center d-flex flex-column justify-content-between">
                <h6 className="text-muted">Total Patients</h6>
                <h2 className="display-4 fw-bold text-primary">
                  {allUsers.filter((user) => user.role === "patient").length}
                </h2>
                <Button variant="outline-primary" size="sm">
                  Patient List
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="shadow-sm bg-warning bg-opacity-10 border-0 h-100">
              <Card.Body className="text-center d-flex flex-column justify-content-between">
                <h6 className="text-muted">Pending Reports</h6>
                <h2 className="display-4 fw-bold text-warning">5</h2>
                <Button variant="outline-warning" size="sm">
                  View Reports
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="shadow-sm bg-primary bg-opacity-10 border-0 h-100">
              <Card.Body className="text-center d-flex flex-column justify-content-between">
                <h6 className="text-muted">Notifications</h6>
                <h2 className="display-4 fw-bold text-primary">
                  {messages?.length || 0}
                </h2>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setShowInbox((prev) => !prev)}
                >
                  {showInbox ? "Hide Messages" : "View Messages"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {showInbox && (
          <Row className="mb-4">
            <Inbox messages={messages} />
          </Row>
        )}

        {/* Today's Schedule */}
        <Row className="mb-4">
          <Col>
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-white d-flex justify-content-between align-items-center py-3">
                <h5 className="mb-0 fw-bold">Today's Schedule</h5>
                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={() => setShowModal(true)}
                >
                  Add Appointment
                </Button>
              </Card.Header>
              <Card.Body>
                <Table hover responsive className="align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Patient</th>
                      <th>Purpose</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctorappointments.flat().length > 0 ? (
                      doctorappointments.flat().map((docappointment, index) => (
                        <tr key={index}>
                          <td>{docappointment.date}</td>
                          <td>{docappointment.time}</td>
                          <td>{docappointment.patient.first_name}</td>
                          <td>{docappointment.problem}</td>
                          <td>
                            <Badge
                              bg={
                                docappointment.status === "confirmed"
                                  ? "success"
                                  : docappointment.status === "Denied"
                                    ? "danger"
                                    : "warning"
                              }
                            >
                              {docappointment.status}
                            </Badge>
                          </td>
                          <td>
                            {docappointment.status === "pending" ? (
                              <>
                                <Button
                                  size="sm"
                                  variant="success"
                                  className="me-2"
                                  onClick={() =>
                                    handleStatusUpdate(
                                      docappointment.id,
                                      "confirmed",
                                    )
                                  }
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="danger"
                                  onClick={() =>
                                    handleStatusUpdate(
                                      docappointment.id,
                                      "Denied",
                                    )
                                  }
                                >
                                  Deny
                                </Button>
                              </>
                            ) : docappointment.status === "confirmed" ? (
                              <Button size="sm" variant="primary">
                                Start Session
                              </Button>
                            ) : (
                              <Button size="sm" variant="danger">
                                Delete
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center text-muted py-3">
                          Currently no appointments available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Patients */}
        <Row className="mb-4">
          <Col>
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-white py-3">
                <h5 className="mb-0 fw-bold">Recent Patients</h5>
              </Card.Header>
              <Card.Body>
                <Table hover responsive className="align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Patient Name</th>
                      <th>Age</th>
                      <th>Last Visit</th>
                      <th>Condition</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((patient) => (
                      <tr key={patient.id}>
                        <td className="fw-semibold">{patient.name}</td>
                        <td>{patient.age}</td>
                        <td>{patient.lastVisit}</td>
                        <td>{patient.condition}</td>
                        <td>
                          <Button size="sm" variant="outline-primary">
                            View Profile
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Modal for adding appointments */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-muted">Modal form goes here.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => setShowModal(false)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default DoctorDashboard;
