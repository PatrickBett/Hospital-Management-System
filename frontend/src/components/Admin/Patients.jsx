import React, { useContext, useState } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import api from "../../api";
import {
  Pencil,
  Trash,
  UserPlus,
  Search,
  Users,
  UserCheck,
  UserX,
} from "lucide-react";
import {
  Card,
  Table,
  Badge,
  Button,
  Row,
  Col,
  InputGroup,
  Form,
} from "react-bootstrap";
import AddPatientModal from "./AddModals/AddPatientModal";

function Patients() {
  const { allUsers, setAllUsers } = useContext(AdminContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  const patientMembers = allUsers.filter((user) => user.role === "patient");

  const filtered = patientMembers.filter((user) => {
    const q = searchQuery.toLowerCase();
    return (
      user.first_name?.toLowerCase().includes(q) ||
      user.last_name?.toLowerCase().includes(q) ||
      user.email?.toLowerCase().includes(q)
    );
  });

  const getInitials = (user) => {
    const f = user.first_name?.[0] || "";
    const l = user.last_name?.[0] || "";
    return (f + l).toUpperCase() || "P";
  };

  const avatarPalette = [
    { bg: "#dbeafe", color: "#1d4ed8" },
    { bg: "#dcfce7", color: "#15803d" },
    { bg: "#fce7f3", color: "#be185d" },
    { bg: "#ede9fe", color: "#6d28d9" },
    { bg: "#fef9c3", color: "#a16207" },
    { bg: "#ffedd5", color: "#c2410c" },
    { bg: "#cffafe", color: "#0e7490" },
    { bg: "#f1f5f9", color: "#475569" },
  ];
  const getAvatar = (id) => avatarPalette[(id || 0) % avatarPalette.length];

  // Rough "new this month" count
  const now = new Date();
  const newThisMonth = patientMembers.filter((u) => {
    const d = new Date(u.date_joined);
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  }).length;

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this patient?"))
      return;
    try {
      await api.delete(`api/users/${id}/`);
      setAllUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleEdit = (user) => {
    console.log("Edit user:", user);
  };

  const summaryStats = [
    {
      label: "Total Patients",
      value: patientMembers.length,
      bg: "#eff6ff",
      iconBg: "#dbeafe",
      iconColor: "#2563eb",
      textClass: "text-primary",
      Icon: Users,
    },
    {
      label: "New This Month",
      value: newThisMonth,
      bg: "#f0fdf4",
      iconBg: "#dcfce7",
      iconColor: "#16a34a",
      textClass: "text-success",
      Icon: UserCheck,
    },
    {
      label: "Search Results",
      value: filtered.length,
      bg: "#fefce8",
      iconBg: "#fef9c3",
      iconColor: "#ca8a04",
      textClass: "text-warning",
      Icon: UserX,
    },
  ];

  return (
    <div className="p-4">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h4 className="fw-bold mb-1">Patients</h4>
          <p className="text-muted mb-0" style={{ fontSize: "0.875rem" }}>
            View and manage all registered patients
          </p>
        </div>
        <Button
          variant="primary"
          className="d-flex align-items-center gap-2"
          onClick={() => setShowModal(true)}
        >
          <UserPlus size={16} />
          Add Patient
        </Button>
        <AddPatientModal
          show={showModal}
          handleClose={() => setShowModal(false)}
        />
      </div>

      {/* Summary Stats */}
      <Row className="mb-4 g-3">
        {summaryStats.map(
          ({ label, value, bg, iconBg, iconColor, textClass, Icon }) => (
            <Col key={label} md={4}>
              <Card
                className="border-0 shadow-sm h-100"
                style={{ background: bg }}
              >
                <Card.Body className="d-flex align-items-center gap-3 py-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                    style={{ width: 48, height: 48, background: iconBg }}
                  >
                    <Icon size={20} color={iconColor} />
                  </div>
                  <div>
                    <p
                      className="text-muted mb-0"
                      style={{ fontSize: "0.78rem" }}
                    >
                      {label}
                    </p>
                    <h4 className={`fw-bold mb-0 ${textClass}`}>{value}</h4>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ),
        )}
      </Row>

      {/* Main Table Card */}
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white py-3 d-flex flex-wrap justify-content-between align-items-center gap-3">
          <h6 className="fw-bold mb-0">
            All Patients
            <span
              className="ms-2 text-muted fw-normal"
              style={{ fontSize: "0.85rem" }}
            >
              ({filtered.length} records)
            </span>
          </h6>
          <InputGroup style={{ maxWidth: 280 }}>
            <InputGroup.Text className="bg-white border-end-0">
              <Search size={15} className="text-muted" />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search by name or email..."
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
              <Users size={40} className="text-muted mb-3" />
              <p className="text-muted fw-semibold mb-1">No patients found</p>
              <p className="text-muted" style={{ fontSize: "0.85rem" }}>
                {searchQuery
                  ? "Try adjusting your search query"
                  : "Add a patient to get started"}
              </p>
            </div>
          ) : (
            <Table
              hover
              responsive
              className="mb-0"
              style={{ fontSize: "0.875rem" }}
            >
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="py-3">Patient</th>
                  <th className="py-3">Email</th>
                  <th className="py-3">Phone</th>
                  <th className="py-3">Date Joined</th>
                  <th className="py-3">Status</th>
                  <th className="py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user, index) => {
                  const avatar = getAvatar(user.id);
                  const isNew =
                    new Date(user.date_joined).getMonth() === now.getMonth() &&
                    new Date(user.date_joined).getFullYear() ===
                      now.getFullYear();

                  return (
                    <tr key={user.id || index}>
                      <td className="px-4 py-3 text-muted">{index + 1}</td>

                      {/* Avatar + Name */}
                      <td className="py-3">
                        <div className="d-flex align-items-center gap-2">
                          <div
                            className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                            style={{
                              width: 36,
                              height: 36,
                              background: avatar.bg,
                              color: avatar.color,
                              fontSize: "0.75rem",
                              fontWeight: 600,
                            }}
                          >
                            {getInitials(user)}
                          </div>
                          <div>
                            <p
                              className="mb-0 fw-semibold"
                              style={{ lineHeight: 1.3 }}
                            >
                              {user.first_name} {user.last_name}
                            </p>
                            <p
                              className="mb-0 text-muted"
                              style={{ fontSize: "0.75rem" }}
                            >
                              ID: {user.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 text-muted">{user.email}</td>

                      <td className="py-3 text-muted">
                        <span className="font-monospace">
                          {user.phone || "—"}
                        </span>
                      </td>

                      <td className="py-3 text-muted">
                        {new Date(user.date_joined).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </td>

                      <td className="py-3">
                        {isNew ? (
                          <Badge
                            bg="success"
                            className="fw-normal px-2 py-1"
                            style={{ fontSize: "0.75rem" }}
                          >
                            New
                          </Badge>
                        ) : (
                          <Badge
                            bg="secondary"
                            className="fw-normal px-2 py-1"
                            style={{ fontSize: "0.75rem", opacity: 0.7 }}
                          >
                            Registered
                          </Badge>
                        )}
                      </td>

                      <td className="py-3 text-center">
                        <Button
                          size="sm"
                          variant="outline-primary"
                          className="me-2 px-2 py-1"
                          onClick={() => handleEdit(user)}
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          className="px-2 py-1"
                          onClick={() => handleDelete(user.id)}
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

export default Patients;
