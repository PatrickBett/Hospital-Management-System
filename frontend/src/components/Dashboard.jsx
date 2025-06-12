import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppointmentModal from "./AppointmentModal";
import NewDoctorModal from "./NewDoctorModal";
import {
  Container,
  Row,
  Col,
  Card,
  Nav,
  Button,
  Table,
  Badge,
} from "react-bootstrap";
import { setappointments } from "../redux/actions/hospitalActions";
import { setdoctorappointments } from "../redux/actions/hospitalActions";
import { useDispatch, useSelector } from "react-redux";

import api from "../api";

function Dashboard() {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("username");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.hospitalinfo.appointments);
  const doctorappointments = useSelector(
    (state) => state.hospitalinfo.doctorappointments
  );

  const userId = 1;

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role"); // if you stored role
    localStorage.removeItem("username");
    window.location.href = "/login"; // or use React Router to navigate
  };

  useEffect(() => {
    // Get role from localStorage
    const userRole = localStorage.getItem("role");
    setRole(userRole);
    setLoading(false);
  }, []);

  // fetching apppointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.get("/api/appointments/");
        console.log("Appointments", res.data);
        dispatch(setappointments(res.data));
      } catch (error) {
        console.log("Failed to fetch appointments: ", error);
      }
    };
    fetchAppointments();
  }, []);

  //fetching doctor appointments
  useEffect(() => {
    const fetchDoctorAppointments = async () => {
      try {
        const res = await api.get("/api/appointments/doctor/");
        const newdoctorappointments = res.data;
        console.log("DOCTOR APPOINTMENTS", res.data);
        dispatch(setdoctorappointments([newdoctorappointments]));
      } catch (error) {
        console.log(error);
      }
    };
    fetchDoctorAppointments();
  }, [dispatch]);

  // Updating Appointment Approval
  const handleStatusUpdate = async (id, status) => {
    try {
      await api.patch(`/api/appointments/${id}/update-status/`, {
        status,
      });
      // Optionally reload or update state
      // Update the state
      const updatedAppointments = doctorappointments.map((group) =>
        group.map((appointment) =>
          appointment.id === id
            ? { ...appointment, status: status }
            : appointment
        )
      );
      dispatch(setdoctorappointments(updatedAppointments));
    } catch (error) {
      console.error("Status update failed", error);
    }
  };

  // // Mock data

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

  const doctors = [
    { id: 1, name: "Dr. Smith", specialty: "Cardiology", patients: 45 },
    { id: 2, name: "Dr. Johnson", specialty: "Pediatrics", patients: 38 },
    { id: 3, name: "Dr. Williams", specialty: "Neurology", patients: 27 },
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

  // Patient Dashboard
  if (role === "patient") {
    return (
      <Container fluid>
        {/* Header */}
        <Row className="bg-primary text-white py-3 mb-4">
          <Col>
            <h2 className="ms-4">Patient Dashboard</h2>
          </Col>
          <Col xs="auto" className="me-4">
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          </Col>
        </Row>

        <Container>
          {/* Welcome Card */}
          <Row className="mb-4">
            <Col>
              <Card className="shadow-sm">
                <Card.Body>
                  <h4>Welcome back, {username}</h4>
                  <p className="text-muted">
                    Your next appointment is on May 10, 2025 at 10:00 AM with
                    Dr. Smith
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Quick Actions */}
          <Row className="mb-4">
            <Col md={4} className="mb-3 mb-md-0">
              <Card className="h-100 shadow-sm bg-info bg-opacity-10">
                <Card.Body className="text-center">
                  <i className="bi bi-calendar-plus fs-1 mb-3 text-info"></i>
                  <h5>Book Appointment</h5>
                  <p>Schedule your next visit with our specialists</p>
                  <Button variant="info" onClick={() => setShowModal(true)}>
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
            <Col md={4} className="mb-3 mb-md-0">
              <Card className="h-100 shadow-sm bg-success bg-opacity-10">
                <Card.Body className="text-center">
                  <i className="bi bi-file-medical fs-1 mb-3 text-success"></i>
                  <h5>Medical Records</h5>
                  <p>Access your health history and reports</p>
                  <Button variant="success">View Records</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 shadow-sm bg-warning bg-opacity-10">
                <Card.Body className="text-center">
                  <i className="bi bi-chat-dots fs-1 mb-3 text-warning"></i>
                  <h5>Message Doctor</h5>
                  <p>Get in touch with your healthcare provider</p>
                  <Button variant="warning">Send Message</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Appointments */}
          <Row className="mb-4">
            <Col>
              <Card className="shadow-sm">
                <Card.Header className="bg-white">
                  <h5 className="mb-0">Your Appointments</h5>
                </Card.Header>
                <Card.Body>
                  <Table hover responsive>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Doctor</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments && appointments.length > 0 ? (
                        appointments.map((app, index) => (
                          <tr key={index}>
                            <td>{app.date}</td>
                            <td>{app.time}</td>
                            <td>{app.doctor.first_name}</td>
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
                            <td>
                              <Button size="sm" variant="outline-primary">
                                Details
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr key="no-appointments">
                          <td colSpan="5" className="text-center">
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
      </Container>
    );
  }

  // Doctor Dashboard
  if (role === "doctor") {
    return (
      <Container fluid>
        {/* Header */}
        <Row className="bg-success text-white py-3 mb-4">
          <Col>
            <h2 className="ms-4">Doctor Dashboard</h2>
          </Col>
          <Col xs="auto" className="me-4">
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          </Col>
        </Row>

        <Container>
          {/* Stats Cards */}
          <Row className="mb-4">
            <Col md={4} className="mb-3 mb-md-0">
              <Card className="shadow-sm bg-success bg-opacity-10">
                <Card.Body className="text-center">
                  <h6 className="text-muted">Today's Appointments</h6>
                  <h2 className="display-4 fw-bold text-success">
                    {doctorappointments.flat().length}
                  </h2>
                  <Button variant="outline-success" size="sm">
                    View Schedule
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3 mb-md-0">
              <Card className="shadow-sm bg-primary bg-opacity-10">
                <Card.Body className="text-center">
                  <h6 className="text-muted">Total Patients</h6>
                  <h2 className="display-4 fw-bold text-primary">156</h2>
                  <Button variant="outline-primary" size="sm">
                    Patient List
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm bg-warning bg-opacity-10">
                <Card.Body className="text-center">
                  <h6 className="text-muted">Pending Reports</h6>
                  <h2 className="display-4 fw-bold text-warning">5</h2>
                  <Button variant="outline-warning" size="sm">
                    View Reports
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Today's Schedule */}
          <Row className="mb-4">
            <Col>
              <Card className="shadow-sm">
                <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Today's Schedule</h5>
                  <Button
                    variant="outline-success"
                    size="sm"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    onClick={() => setShowModal(true)}
                  >
                    Add Appointment
                  </Button>
                </Card.Header>

                <div id="myModal" role="dialog" className="modal fade">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header"></div>
                      <div className="modal-body">
                        <p>Some text</p>
                      </div>
                      <div className="modal-footer"></div>
                    </div>
                  </div>
                </div>

                <Card.Body>
                  <Table hover responsive>
                    <thead>
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
                        doctorappointments
                          .flat()
                          .map((docappointment, index) => (
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
                                          "confirmed"
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
                                          "Denied"
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
                          <td colSpan="6" className="text-center">
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
          <Row>
            <Col>
              <Card className="shadow-sm">
                <Card.Header className="bg-white">
                  <h5 className="mb-0">Recent Patients</h5>
                </Card.Header>
                <Card.Body>
                  <Table hover responsive>
                    <thead>
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
                          <td>{patient.name}</td>
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
        </Container>
      </Container>
    );
  }

  // Admin Dashboard
  if (role === "admin") {
    return (
      <Container fluid>
        {/* Header */}
        <Row className="bg-dark text-white py-3 mb-4">
          <Col>
            <h2 className="ms-4">Admin Dashboard</h2>
          </Col>
          <Col xs="auto" className="me-4">
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          </Col>
        </Row>

        <Container>
          {/* Stats Overview */}
          <Row className="mb-4">
            <Col md={3} className="mb-3 mb-md-0">
              <Card className="shadow-sm bg-primary bg-opacity-10">
                <Card.Body className="text-center">
                  <h6 className="text-muted">Total Patients</h6>
                  <h2 className="display-4 fw-bold text-primary">1,256</h2>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-3 mb-md-0">
              <Card className="shadow-sm bg-success bg-opacity-10">
                <Card.Body className="text-center">
                  <h6 className="text-muted">Total Doctors</h6>
                  <h2 className="display-4 fw-bold text-success">32</h2>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-3 mb-md-0">
              <Card className="shadow-sm bg-info bg-opacity-10">
                <Card.Body className="text-center">
                  <h6 className="text-muted">Appointments</h6>
                  <h2 className="display-4 fw-bold text-info">128</h2>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="shadow-sm bg-warning bg-opacity-10">
                <Card.Body className="text-center">
                  <h6 className="text-muted">Revenue</h6>
                  <h2 className="display-4 fw-bold text-warning">$24k</h2>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Quick Actions */}
          <Row className="mb-4">
            <Col>
              <Card className="shadow-sm">
                <Card.Header className="bg-white">
                  <h5 className="mb-0">Quick Actions</h5>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={3} className="mb-3 mb-md-0">
                      <Button
                        variant="primary"
                        className="w-100 py-3"
                        onClick={() => setShowModal(true)}
                      >
                        <i className="bi bi-person-plus me-2"></i>
                        Add New Doctor
                      </Button>
                      <NewDoctorModal
                        show={showModal}
                        handleClose={() => setShowModal(false)}
                        userId={userId}
                      />
                    </Col>
                    <Col md={3} className="mb-3 mb-md-0">
                      <Button variant="success" className="w-100 py-3">
                        <i className="bi bi-people me-2"></i>
                        Add New Patient
                      </Button>
                    </Col>
                    <Col md={3} className="mb-3 mb-md-0">
                      <Button variant="info" className="w-100 py-3">
                        <i className="bi bi-calendar-event me-2"></i>
                        Schedule Appointment
                      </Button>
                    </Col>
                    <Col md={3}>
                      <Button variant="warning" className="w-100 py-3">
                        <i className="bi bi-file-earmark-text me-2"></i>
                        Generate Reports
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Doctors List */}
          <Row className="mb-4">
            <Col>
              <Card className="shadow-sm">
                <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Doctors</h5>
                  <Button variant="outline-primary" size="sm">
                    View All
                  </Button>
                </Card.Header>
                <Card.Body>
                  <Table hover responsive>
                    <thead>
                      <tr>
                        <th>Doctor Name</th>
                        <th>Specialty</th>
                        <th>Patients</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {doctors.map((doctor) => (
                        <tr key={doctor.id}>
                          <td>{doctor.name}</td>
                          <td>{doctor.specialty}</td>
                          <td>{doctor.patients}</td>
                          <td>
                            <Button
                              size="sm"
                              variant="outline-primary"
                              className="me-2"
                            >
                              Edit
                            </Button>
                            <Button size="sm" variant="outline-danger">
                              Remove
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

          {/* Recent Appointments */}
          <Row>
            <Col>
              <Card className="shadow-sm">
                <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Recent Appointments</h5>
                  <Button variant="outline-primary" size="sm">
                    View All
                  </Button>
                </Card.Header>
                <Card.Body>
                  <Table hover responsive>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Patient</th>
                        <th>Doctor</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((app) => (
                        <tr key={app.id}>
                          <td>{app.date}</td>
                          <td>{app.time}</td>
                          <td>{app.patient}</td>
                          <td>{app.doctor}</td>
                          <td>
                            <Badge
                              bg={
                                app.status === "Confirmed"
                                  ? "success"
                                  : app.status === "Pending"
                                  ? "warning"
                                  : "secondary"
                              }
                            >
                              {app.status}
                            </Badge>
                          </td>
                          <td>
                            <Button
                              size="sm"
                              variant="outline-primary"
                              className="me-2"
                            >
                              Edit
                            </Button>
                            <Button size="sm" variant="outline-danger">
                              Cancel
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
        </Container>
      </Container>
    );
  }

  // Default or unknown role
  return (
    <Container className="mt-5 text-center">
      <Card className="shadow">
        <Card.Body>
          <h2>Welcome to the Healthcare Portal</h2>
          <p className="text-muted">Your role: {role || "Not defined"}</p>
          <p>
            Please contact an administrator if you're having trouble accessing
            your dashboard.
          </p>
          <Button variant="primary">Contact Support</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Dashboard;
