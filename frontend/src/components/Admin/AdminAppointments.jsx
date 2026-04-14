import React, { useContext, useState } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import api from "../../api";
import {
  Pencil, Trash, CalendarPlus, Search,
  CalendarCheck, Clock, CalendarX, Calendar,
} from "lucide-react";
import {
  Card, Table, Badge, Button, Row, Col,
  InputGroup, Form,
} from "react-bootstrap";

function AdminAppointments() {
  const { appointments, setAppointments } = useContext(AdminContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const statusConfig = {
    confirmed: { bg: "warning",   text: "dark",  icon: <CalendarCheck size={12} /> },
    pending:   { bg: "primary",   text: "white", icon: <Clock size={12} /> },
    completed: { bg: "success",   text: "white", icon: <CalendarCheck size={12} /> },
    cancelled: { bg: "danger",    text: "white", icon: <CalendarX size={12} /> },
  };

  const getStatus = (status) =>
    statusConfig[status?.toLowerCase()] || { bg: "secondary", text: "white", icon: null };

  const summaryStats = [
    {
      label: "Total",
      count: appointments.length,
      color: "#eff6ff",
      iconBg: "#dbeafe",
      iconColor: "#2563eb",
      textClass: "text-primary",
    },
    {
      label: "Pending",
      count: appointments.filter((a) => a.status?.toLowerCase() === "pending").length,
      color: "#eff6ff",
      iconBg: "#dbeafe",
      iconColor: "#2563eb",
      textClass: "text-primary",
    },
    {
      label: "Confirmed",
      count: appointments.filter((a) => a.status?.toLowerCase() === "confirmed").length,
      color: "#fefce8",
      iconBg: "#fef9c3",
      iconColor: "#ca8a04",
      textClass: "text-warning",
    },
    {
      label: "Completed",
      count: appointments.filter((a) => a.status?.toLowerCase() === "completed").length,
      color: "#f0fdf4",
      iconBg: "#dcfce7",
      iconColor: "#16a34a",
      textClass: "text-success",
    },
    {
      label: "Cancelled",
      count: appointments.filter((a) => a.status?.toLowerCase() === "cancelled").length,
      color: "#fff1f2",
      iconBg: "#ffe4e6",
      iconColor: "#dc2626",
      textClass: "text-danger",
    },
  ];

  const filtered = appointments.filter((apt) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      apt.doctor?.first_name?.toLowerCase().includes(q) ||
      apt.patient?.first_name?.toLowerCase().includes(q) ||
      apt.status?.toLowerCase().includes(q) ||
      apt.date?.includes(q);
    const matchesStatus =
      statusFilter === "all" || apt.status?.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;
    try {
      await api.delete(`api/appointments/${id}/`);
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleEdit = (apt) => {
    console.log("Edit appointment:", apt);
  };

  return (
    <div className="p-4">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h4 className="fw-bold mb-1">Appointments</h4>
          <p className="text-muted mb-0" style={{ fontSize: "0.875rem" }}>
            View and manage all patient appointments
          </p>
        </div>
        <Button variant="primary" className="d-flex align-items-center gap-2">
          <CalendarPlus size={16} />
          Add Appointment
        </Button>
      </div>

      {/* Summary Stats */}
      <Row className="mb-4 g-3">
        {summaryStats.map((stat) => (
          <Col key={stat.label} xs={6} md={4} lg>
            <Card
              className="border-0 shadow-sm h-100"
              style={{ background: stat.color, cursor: "pointer" }}
              onClick={() =>
                setStatusFilter(stat.label === "Total" ? "all" : stat.label.toLowerCase())
              }
            >
              <Card.Body className="d-flex align-items-center gap-3 py-3">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                  style={{ width: 44, height: 44, background: stat.iconBg }}
                >
                  <Calendar size={18} color={stat.iconColor} />
                </div>
                <div>
                  <p className="text-muted mb-0" style={{ fontSize: "0.78rem" }}>
                    {stat.label}
                  </p>
                  <h4 className={`fw-bold mb-0 ${stat.textClass}`}>{stat.count}</h4>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Table Card */}
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white py-3 d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <h6 className="fw-bold mb-0">
              All Appointments
              <span className="ms-2 text-muted fw-normal" style={{ fontSize: "0.85rem" }}>
                ({filtered.length} records)
              </span>
            </h6>
            {/* Status filter pills */}
            <div className="d-flex gap-2 flex-wrap">
              {["all", "pending", "confirmed", "completed", "cancelled"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`btn btn-sm px-3 py-1 text-capitalize ${
                    statusFilter === s ? "btn-dark" : "btn-outline-secondary"
                  }`}
                  style={{ fontSize: "0.78rem", borderRadius: 20 }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <InputGroup style={{ maxWidth: 280 }}>
            <InputGroup.Text className="bg-white border-end-0">
              <Search size={15} className="text-muted" />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search doctor, patient, date..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-start-0 ps-0"
              style={{ fontSize: "0.875rem" }}
            />
          </InputGroup>
        </Card.Header>

        <Card.Body className="p-0">
          {filtered.length === 0 ? (
            <div className="text-center py-5">
              <Calendar size={40} className="text-muted mb-3" />
              <p className="text-muted fw-semibold mb-1">No appointments found</p>
              <p className="text-muted" style={{ fontSize: "0.85rem" }}>
                {searchQuery || statusFilter !== "all"
                  ? "Try adjusting your search or filter"
                  : "Add an appointment to get started"}
              </p>
            </div>
          ) : (
            <Table hover responsive className="mb-0" style={{ fontSize: "0.875rem" }}>
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="py-3">Doctor</th>
                  <th className="py-3">Patient</th>
                  <th className="py-3">Date</th>
                  <th className="py-3">Time</th>
                  <th className="py-3">Status</th>
                  <th className="py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((apt, index) => {
                  const { bg, text, icon } = getStatus(apt.status);
                  return (
                    <tr key={apt.id || index}>
                      <td className="px-4 py-3 text-muted">{index + 1}</td>

                      {/* Doctor */}
                      <td className="py-3">
                        <div className="d-flex align-items-center gap-2">
                          <div
                            className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                            style={{
                              width: 32,
                              height: 32,
                              background: "#dbeafe",
                              color: "#1d4ed8",
                              fontSize: "0.72rem",
                              fontWeight: 600,
                            }}
                          >
                            {apt.doctor?.first_name?.[0]?.toUpperCase()}
                            {apt.doctor?.last_name?.[0]?.toUpperCase()}
                          </div>
                          <div>
                            <p className="mb-0 fw-semibold" style={{ lineHeight: 1.3 }}>
                              Dr. {apt.doctor?.first_name} {apt.doctor?.last_name}
                            </p>
                            <p className="mb-0 text-muted" style={{ fontSize: "0.75rem" }}>
                              {apt.doctor?.specialization || "General"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Patient */}
                      <td className="py-3">
                        <div className="d-flex align-items-center gap-2">
                          <div
                            className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                            style={{
                              width: 32,
                              height: 32,
                              background: "#dcfce7",
                              color: "#15803d",
                              fontSize: "0.72rem",
                              fontWeight: 600,
                            }}
                          >
                            {apt.patient?.first_name?.[0]?.toUpperCase()}
                            {apt.patient?.last_name?.[0]?.toUpperCase()}
                          </div>
                          <p className="mb-0 fw-semibold">{apt.patient?.first_name} {apt.patient?.last_name}</p>
                        </div>
                      </td>

                      <td className="py-3 text-muted">
                        {apt.date
                          ? new Date(apt.date).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "—"}
                      </td>

                      <td className="py-3 text-muted">
                        <span className="font-monospace">{apt.time || "—"}</span>
                      </td>

                      <td className="py-3">
                        <Badge
                          bg={bg}
                          text={text}
                          className="d-inline-flex align-items-center gap-1 fw-normal px-2 py-1 text-capitalize"
                          style={{ fontSize: "0.78rem" }}
                        >
                          {icon}
                          {apt.status}
                        </Badge>
                      </td>

                      <td className="py-3 text-center">
                        <Button
                          size="sm"
                          variant="outline-primary"
                          className="me-2 px-2 py-1"
                          onClick={() => handleEdit(apt)}
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          className="px-2 py-1"
                          onClick={() => handleDelete(apt.id)}
                          title="Delete"
                        >
                          <Trash size={14} />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default AdminAppointments;