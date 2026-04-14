import React, { useContext, useState } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import api from "../../api";
import { Pencil, Trash, UserPlus, Search, Users } from "lucide-react";
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
import AddStaffModal from "./AddModals/AddStaffModal";

function Staffs() {
  const { allUsers, setAllUsers } = useContext(AdminContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  const staffMembers = allUsers.filter(
    (user) =>
      user.role !== "patient" && user.role !== "admin" && user.role !== "",
  );

  const filteredStaff = staffMembers.filter((user) => {
    const q = searchQuery.toLowerCase();
    return (
      user.first_name?.toLowerCase().includes(q) ||
      user.last_name?.toLowerCase().includes(q) ||
      user.email?.toLowerCase().includes(q) ||
      user.role?.toLowerCase().includes(q) ||
      user.staff_number?.toString().includes(q)
    );
  });

  const roleVariant = (role) => {
    const map = {
      doctor: "primary",
      nurse: "success",
      pharmacist: "info",
      receptionist: "warning",
      lab_technician: "secondary",
    };
    return map[role?.toLowerCase()] || "secondary";
  };

  const getInitials = (user) => {
    const first = user.first_name?.[0] || "";
    const last = user.last_name?.[0] || "";
    return (first + last).toUpperCase() || "ST";
  };

  const avatarColors = [
    "#4f46e5",
    "#0891b2",
    "#059669",
    "#d97706",
    "#dc2626",
    "#7c3aed",
    "#db2777",
    "#0284c7",
  ];
  const getAvatarColor = (id) => avatarColors[(id || 0) % avatarColors.length];

  // Called by modal on successful creation
  const handleStaffAdded = (newUser) => {
    setAllUsers((prev) => [...prev, newUser]);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this staff member?"))
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

  return (
    <div className="p-4">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h4 className="fw-bold mb-1">Staff Management</h4>
          <p className="text-muted mb-0" style={{ fontSize: "0.875rem" }}>
            Manage all non-patient, non-admin users in the system
          </p>
        </div>
        <Button
          variant="primary"
          className="d-flex align-items-center gap-2"
          onClick={() => setShowModal(true)}
        >
          <UserPlus size={16} />
          Add Staff
        </Button>
      </div>

      {/* Summary Cards */}
      <Row className="mb-4 g-3">
        <Col md={4}>
          <Card
            className="border-0 shadow-sm h-100"
            style={{ background: "#eff6ff" }}
          >
            <Card.Body className="d-flex align-items-center gap-3 py-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{ width: 48, height: 48, background: "#dbeafe" }}
              >
                <Users size={20} color="#2563eb" />
              </div>
              <div>
                <p className="text-muted mb-0" style={{ fontSize: "0.8rem" }}>
                  Total Staff
                </p>
                <h4 className="fw-bold mb-0 text-primary">
                  {staffMembers.length}
                </h4>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            className="border-0 shadow-sm h-100"
            style={{ background: "#f0fdf4" }}
          >
            <Card.Body className="d-flex align-items-center gap-3 py-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{ width: 48, height: 48, background: "#dcfce7" }}
              >
                <Users size={20} color="#16a34a" />
              </div>
              <div>
                <p className="text-muted mb-0" style={{ fontSize: "0.8rem" }}>
                  Doctors
                </p>
                <h4 className="fw-bold mb-0 text-success">
                  {
                    staffMembers.filter(
                      (u) => u.role?.toLowerCase() === "doctor",
                    ).length
                  }
                </h4>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            className="border-0 shadow-sm h-100"
            style={{ background: "#fefce8" }}
          >
            <Card.Body className="d-flex align-items-center gap-3 py-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{ width: 48, height: 48, background: "#fef9c3" }}
              >
                <Users size={20} color="#ca8a04" />
              </div>
              <div>
                <p className="text-muted mb-0" style={{ fontSize: "0.8rem" }}>
                  Other Roles
                </p>
                <h4 className="fw-bold mb-0 text-warning">
                  {
                    staffMembers.filter(
                      (u) => u.role?.toLowerCase() !== "doctor",
                    ).length
                  }
                </h4>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Main Table Card */}
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white py-3 d-flex flex-wrap justify-content-between align-items-center gap-3">
          <h6 className="fw-bold mb-0">
            All Staff
            <span
              className="ms-2 text-muted fw-normal"
              style={{ fontSize: "0.85rem" }}
            >
              ({filteredStaff.length} records)
            </span>
          </h6>
          <InputGroup style={{ maxWidth: 280 }}>
            <InputGroup.Text className="bg-white border-end-0">
              <Search size={15} className="text-muted" />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search by name, role, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-start-0 ps-0"
              style={{ fontSize: "0.875rem" }}
            />
          </InputGroup>
        </Card.Header>

        <Card.Body className="p-0">
          {filteredStaff.length === 0 ? (
            <div className="text-center py-5">
              <Users size={40} className="text-muted mb-3" />
              <p className="text-muted fw-semibold mb-1">
                No staff members found
              </p>
              <p className="text-muted" style={{ fontSize: "0.85rem" }}>
                {searchQuery
                  ? "Try adjusting your search query"
                  : "Add a staff member to get started"}
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
                  <th className="py-3">Name</th>
                  <th className="py-3">Staff No.</th>
                  <th className="py-3">Email</th>
                  <th className="py-3">Role</th>
                  <th className="py-3">Date Joined</th>
                  <th className="py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((user, index) => (
                  <tr key={user.id || index}>
                    <td className="px-4 py-3 text-muted">{index + 1}</td>

                    <td className="py-3">
                      <div className="d-flex align-items-center gap-2">
                        <div
                          className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                          style={{
                            width: 36,
                            height: 36,
                            background: getAvatarColor(user.id),
                            color: "#fff",
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
                            {user.role?.toLowerCase() === "doctor" ? "Dr." : ""}{" "}
                            {user.first_name} {user.last_name}
                          </p>
                          <p
                            className="mb-0 text-muted"
                            style={{ fontSize: "0.78rem" }}
                          >
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3">
                      <span className="font-monospace text-muted">
                        {user.staff_number || "—"}
                      </span>
                    </td>

                    <td className="py-3 text-muted">{user.email}</td>

                    <td className="py-3">
                      <Badge
                        bg={roleVariant(user.role)}
                        className="text-capitalize fw-normal px-2 py-1"
                        style={{ fontSize: "0.78rem" }}
                      >
                        {user.role}
                      </Badge>
                    </td>

                    <td className="py-3 text-muted">
                      {new Date(user.date_joined).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
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
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Add Staff Modal */}
      <AddStaffModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onStaffAdded={handleStaffAdded}
      />
    </div>
  );
}

export default Staffs;
