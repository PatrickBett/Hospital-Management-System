import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Card, Button, Table, Badge } from "react-bootstrap";
import { AdminContext } from "../../contexts/AdminContext";
import { Pencil, Trash } from "lucide-react";
import { UserPlus, Users, CalendarPlus, FileText } from "lucide-react";

function AdminDashboard() {
  const { appointments, doctors, allUsers, medicine, expiringSoon } =
    useContext(AdminContext);

  // Derive already expired medicines from medicine list
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const alreadyExpired = (medicine || []).filter((med) => {
    const expiry = new Date(med.expiry_date);
    return expiry < today;
  });

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

      {/* Medicine Status Row — Expiring Soon + Already Expired side by side */}
      <Row className="mb-4 g-3">
        {/* Expiring Soon */}
        <Col xl={6}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center py-3">
              <div className="d-flex align-items-center gap-2">
                <h5 className="mb-0 fw-bold">Expiring Soon</h5>
                <span
                  style={{
                    display: "inline-block",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: "#f59e0b",
                    animation: "blink 1.2s ease-in-out infinite",
                  }}
                />
                <Badge bg="warning" text="dark" pill className="ms-1">
                  {expiringSoon.flat().length}
                </Badge>
              </div>
              <Button variant="link" size="sm" className="text-decoration-none">
                View All
              </Button>
            </Card.Header>
            <Card.Body className="p-0">
              <Table
                hover
                responsive
                className="mb-0"
                style={{ fontSize: "0.875rem" }}
              >
                <thead className="table-light">
                  <tr>
                    <th className="px-3 py-2">Medicine</th>
                    <th className="py-2">Price/Unit</th>
                    <th className="py-2">Date Added</th>
                    <th className="py-2">Expiry Date</th>
                    <th className="py-2">Stock</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expiringSoon.length > 0 ? (
                    expiringSoon.flat().map((med, index) => (
                      <tr key={index}>
                        <td className="px-3 fw-semibold">{med.name}</td>
                        <td>{med.price_per_unit}</td>
                        <td>{med.date_added}</td>
                        <td>
                          <span className="text-warning fw-semibold">
                            {med.expiry_date}
                          </span>
                        </td>
                        <td>{med.quantity_in_stock}</td>
                        <td>
                          <Button
                            size="sm"
                            variant="outline-primary"
                            className="me-1 p-1"
                          >
                            <Pencil size={14} />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            className="p-1"
                          >
                            <Trash size={14} />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-muted py-4">
                        No medicines expiring soon
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Already Expired */}
        <Col xl={6}>
          <Card
            className="shadow-sm border-0 h-100"
            style={{ borderLeft: "3px solid #ef4444 !important" }}
          >
            <Card.Header
              className="d-flex justify-content-between align-items-center py-3"
              style={{ background: "#fff5f5" }}
            >
              <div className="d-flex align-items-center gap-2">
                <h5 className="mb-0 fw-bold text-danger">Already Expired</h5>
                <span
                  style={{
                    display: "inline-block",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: "#ef4444",
                    animation: "blink 1.2s ease-in-out infinite",
                  }}
                />
                <Badge bg="danger" pill className="ms-1">
                  {alreadyExpired.length}
                </Badge>
              </div>
              <Button
                variant="link"
                size="sm"
                className="text-danger text-decoration-none"
              >
                View All
              </Button>
            </Card.Header>
            <Card.Body className="p-0">
              <Table
                hover
                responsive
                className="mb-0"
                style={{ fontSize: "0.875rem" }}
              >
                <thead style={{ background: "#fef2f2" }}>
                  <tr>
                    <th className="px-3 py-2">Medicine</th>
                    <th className="py-2">Price/Unit</th>
                    <th className="py-2">Date Added</th>
                    <th className="py-2">Expired On</th>
                    <th className="py-2">Stock</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {alreadyExpired.length > 0 ? (
                    alreadyExpired.map((med, index) => (
                      <tr
                        key={index}
                        style={{
                          background: index % 2 === 0 ? "#fff" : "#fffafa",
                        }}
                      >
                        <td className="px-3 fw-semibold">{med.name}</td>
                        <td>{med.price_per_unit}</td>
                        <td>{med.date_added}</td>
                        <td>
                          <Badge bg="danger" className="fw-normal">
                            {med.expiry_date}
                          </Badge>
                        </td>
                        <td>{med.quantity_in_stock}</td>
                        <td>
                          <Button
                            size="sm"
                            variant="outline-primary"
                            className="me-1 p-1"
                          >
                            <Pencil size={14} />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            className="p-1"
                          >
                            <Trash size={14} />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-muted py-4">
                        No expired medicines
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add blink keyframe globally once */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
      `}</style>

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
                            <Pencil size={16} />
                          </Button>
                          <Button size="sm" variant="outline-danger">
                            <Trash size={16} />
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
