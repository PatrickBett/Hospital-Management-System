import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Card, Button, Table, Badge } from "react-bootstrap";
import { AdminContext } from "../../contexts/AdminContext";

// Import Lucide icons to match your sidebar theme
import { UserPlus, Users, CalendarPlus, FileText } from "lucide-react";

function AdminDashboard() {
  const { appointments, doctors, allUsers } = useContext(AdminContext);
  console.log("Admin Dashboard - Appointments:", appointments);
  console.log("Admin Dashboard - Doctors:", doctors);
  console.log("Admin Dashboard - All Users:", allUsers);

  return (
    <>
      {/* Stats Overview */}
      <Row className="mb-4 g-3">
        <Col md={3}>
          <Card className="shadow-sm bg-primary bg-opacity-10 border-0 h-100">
            <Card.Body className="text-center py-4">
              <h6 className="text-muted mb-3">Total Patients</h6>
              <h2 className="display-5 fw-bold text-primary mb-0">
                {allUsers.filter((user) => user.role === "patient").length}
              </h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm bg-success bg-opacity-10 border-0 h-100">
            <Card.Body className="text-center py-4">
              <h6 className="text-muted mb-3">Total Doctors</h6>
              <h2 className="display-5 fw-bold text-success mb-0">
                {doctors.length}
              </h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm bg-info bg-opacity-10 border-0 h-100">
            <Card.Body className="text-center py-4">
              <h6 className="text-muted mb-3">Appointments</h6>
              <h2 className="display-5 fw-bold text-info mb-0">
                {appointments.length}
              </h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm bg-warning bg-opacity-10 border-0 h-100">
            <Card.Body className="text-center py-4">
              <h6 className="text-muted mb-3">Revenue</h6>
              <h2 className="display-5 fw-bold text-warning mb-0">$24k</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row className="mb-4 g-3">
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0 fw-bold">Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              <Row className="g-2">
                <Col md={3}>
                  <Button
                    variant="outline-primary"
                    className="w-100 py-3 d-flex align-items-center justify-content-center"
                  >
                    <UserPlus size={18} className="me-2" /> Add Doctor
                  </Button>
                </Col>
                <Col md={3}>
                  <Button
                    variant="outline-success"
                    className="w-100 py-3 d-flex align-items-center justify-content-center"
                  >
                    <Users size={18} className="me-2" /> Add Patient
                  </Button>
                </Col>
                <Col md={3}>
                  <Button
                    variant="outline-info"
                    className="w-100 py-3 d-flex align-items-center justify-content-center"
                  >
                    <CalendarPlus size={18} className="me-2" /> Schedule
                  </Button>
                </Col>
                <Col md={3}>
                  <Button
                    variant="outline-warning"
                    className="w-100 py-3 d-flex align-items-center justify-content-center"
                  >
                    <FileText size={18} className="me-2" /> Reports
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
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center py-3">
              <h5 className="mb-0 fw-bold">Expiring Soon</h5>
              <Button variant="link" size="sm" className="text-decoration-none">
                View All
              </Button>
            </Card.Header>
            <Card.Body>
              <Table hover responsive align="middle" className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Medicine Name</th>
                    <th>Specialty</th>
                    <th>Date of Manufacture</th>
                    <th>Date Of Expiry</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.filter((user) => user.role === "doctor").length >
                  0 ? (
                    allUsers
                      .filter((user) => user.role === "doctor")
                      .map((doctor, index) => (
                        <tr key={index}>
                          <td className="fw-bold">Dr. {doctor.first_name}</td>
                          <td>
                            {doctor.doctordetails?.specialization?.name ||
                              "Profile not updated"}
                          </td>
                          <td>{doctor.doctor_number}</td>
                          <td>
                            {doctor.doctordetails?.experience ||
                              "Profile not updated"}
                          </td>
                          <td>
                            <Badge
                              bg={
                                doctor.doctordetails?.availability
                                  ? "success"
                                  : "danger"
                              }
                            >
                              {doctor.doctordetails?.availability
                                ? "Available"
                                : "Not Available"}
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
                              Remove
                            </Button>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-muted py-4">
                        No Doctors in your hospital
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Appointments */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center py-3">
              <h5 className="mb-0 fw-bold">Recent Appointments</h5>
              <Button variant="link" size="sm" className="text-decoration-none">
                View All
              </Button>
            </Card.Header>
            <Card.Body>
              <Table hover responsive align="middle" className="mb-0">
                <thead className="table-light">
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
                  {appointments.length > 0 ? (
                    appointments.map((app) => (
                      <tr key={app.id}>
                        <td>{app.date}</td>
                        <td>{app.time}</td>
                        <td>{app.patient.first_name}</td>
                        <td>{app.doctor.first_name}</td>
                        <td>
                          <Badge
                            bg={
                              app.status === "confirmed"
                                ? "warning"
                                : app.status === "pending"
                                  ? "primary"
                                  : "success"
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
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-muted py-4">
                        No appointments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default AdminDashboard;
