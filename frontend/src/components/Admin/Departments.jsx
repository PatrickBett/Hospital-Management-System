import React, { useContext, useState } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import AddDepartmentModal from "./AddModals/AddDepartmentModal";
import api from "../../api";
import { Pencil, Trash, Search, Building2, Plus } from "lucide-react";
import {
  Card,
  Table,
  Button,
  Row,
  Col,
  InputGroup,
  Form,
  Badge,
} from "react-bootstrap";

const DEPT_COLORS = [
  { bg: "#eff6ff", iconBg: "#dbeafe", iconColor: "#2563eb", dot: "#3b82f6" },
  { bg: "#f0fdf4", iconBg: "#dcfce7", iconColor: "#16a34a", dot: "#22c55e" },
  { bg: "#fefce8", iconBg: "#fef9c3", iconColor: "#ca8a04", dot: "#eab308" },
  { bg: "#fdf4ff", iconBg: "#f3e8ff", iconColor: "#7e22ce", dot: "#a855f7" },
  { bg: "#fff1f2", iconBg: "#ffe4e6", iconColor: "#be123c", dot: "#f43f5e" },
  { bg: "#f0fdfa", iconBg: "#ccfbf1", iconColor: "#0f766e", dot: "#14b8a6" },
  { bg: "#fff7ed", iconBg: "#fed7aa", iconColor: "#c2410c", dot: "#f97316" },
  { bg: "#f8fafc", iconBg: "#e2e8f0", iconColor: "#475569", dot: "#94a3b8" },
];

function Departments() {
  const { departments, setDepartments } = useContext(AdminContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "table"
  const [showModal, setShowModal] = useState(false);

  const filtered = (departments || []).filter((dept) =>
    dept.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getColor = (id) => DEPT_COLORS[(id || 0) % DEPT_COLORS.length];

  const getInitials = (name) =>
    name
      ?.split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase() || "D";

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this department?"))
      return;
    try {
      await api.delete(`api/departments/${id}/`);
      setDepartments((prev) => prev.filter((d) => d.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleEdit = (dept) => {
    console.log("Edit department:", dept);
  };

  return (
    <div className="p-4">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h4 className="fw-bold mb-1">Departments</h4>
          <p className="text-muted mb-0" style={{ fontSize: "0.875rem" }}>
            Manage hospital departments and their details
          </p>
        </div>
        <Button
          variant="primary"
          className="d-flex align-items-center gap-2"
          onClick={() => setShowModal(true)}
        >
          <Plus size={16} />
          Add Department
        </Button>
        <AddDepartmentModal
          show={showModal}
          handleClose={() => setShowModal(false)}
        />
      </div>

      {/* Summary Stats */}
      <Row className="mb-4 g-3">
        <Col md={4}>
          <Card
            className="border-0 shadow-sm h-100"
            style={{ background: "#eff6ff" }}
          >
            <Card.Body className="d-flex align-items-center gap-3 py-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                style={{ width: 48, height: 48, background: "#dbeafe" }}
              >
                <Building2 size={20} color="#2563eb" />
              </div>
              <div>
                <p className="text-muted mb-0" style={{ fontSize: "0.78rem" }}>
                  Total Departments
                </p>
                <h4 className="fw-bold mb-0 text-primary">
                  {(departments || []).length}
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
                className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                style={{ width: 48, height: 48, background: "#dcfce7" }}
              >
                <Building2 size={20} color="#16a34a" />
              </div>
              <div>
                <p className="text-muted mb-0" style={{ fontSize: "0.78rem" }}>
                  Search Results
                </p>
                <h4 className="fw-bold mb-0 text-success">{filtered.length}</h4>
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
                className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                style={{ width: 48, height: 48, background: "#fef9c3" }}
              >
                <Building2 size={20} color="#ca8a04" />
              </div>
              <div>
                <p className="text-muted mb-0" style={{ fontSize: "0.78rem" }}>
                  Active
                </p>
                <h4 className="fw-bold mb-0 text-warning">
                  {(departments || []).length}
                </h4>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Main Card */}
      <Card className="border-0 shadow-sm">
        {/* Card Header */}
        <Card.Header className="bg-white py-3 d-flex flex-wrap justify-content-between align-items-center gap-3">
          <h6 className="fw-bold mb-0">
            All Departments
            <span
              className="ms-2 text-muted fw-normal"
              style={{ fontSize: "0.85rem" }}
            >
              ({filtered.length} records)
            </span>
          </h6>
          <div className="d-flex align-items-center gap-2 flex-wrap">
            {/* Search */}
            <InputGroup style={{ maxWidth: 260 }}>
              <InputGroup.Text className="bg-white border-end-0">
                <Search size={15} className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search departments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-start-0 ps-0"
                style={{ fontSize: "0.875rem" }}
              />
            </InputGroup>
            {/* View Toggle */}
            <div
              className="d-flex border rounded overflow-hidden"
              style={{ fontSize: "0.8rem" }}
            >
              <button
                onClick={() => setViewMode("grid")}
                className={`btn btn-sm px-3 py-1 border-0 rounded-0 ${
                  viewMode === "grid" ? "btn-dark" : "btn-light"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`btn btn-sm px-3 py-1 border-0 rounded-0 ${
                  viewMode === "table" ? "btn-dark" : "btn-light"
                }`}
              >
                Table
              </button>
            </div>
          </div>
        </Card.Header>

        <Card.Body className={viewMode === "grid" ? "p-3" : "p-0"}>
          {/* Empty State */}
          {filtered.length === 0 ? (
            <div className="text-center py-5">
              <Building2 size={40} className="text-muted mb-3" />
              <p className="text-muted fw-semibold mb-1">
                No departments found
              </p>
              <p className="text-muted" style={{ fontSize: "0.85rem" }}>
                {searchQuery
                  ? "Try adjusting your search query"
                  : "Add a department to get started"}
              </p>
            </div>
          ) : viewMode === "grid" ? (
            /* ── GRID VIEW ── */
            <Row className="g-3">
              {filtered.map((dept, index) => {
                const color = getColor(dept.id);
                return (
                  <Col key={dept.id || index} xs={12} sm={6} md={4} lg={3}>
                    <Card
                      className="border-0 h-100"
                      style={{
                        background: color.bg,
                        borderRadius: 12,
                        transition: "transform 0.15s",
                        cursor: "default",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "translateY(-2px)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "translateY(0)")
                      }
                    >
                      <Card.Body className="p-3">
                        {/* Icon + Index badge */}
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div
                            className="d-flex align-items-center justify-content-center rounded-circle"
                            style={{
                              width: 44,
                              height: 44,
                              background: color.iconBg,
                              color: color.iconColor,
                              fontSize: "0.8rem",
                              fontWeight: 700,
                            }}
                          >
                            {getInitials(dept.name)}
                          </div>
                          <Badge
                            bg="light"
                            text="secondary"
                            className="fw-normal"
                            style={{ fontSize: "0.72rem" }}
                          >
                            #{index + 1}
                          </Badge>
                        </div>

                        {/* Name */}
                        <p
                          className="fw-semibold mb-1"
                          style={{
                            fontSize: "0.9rem",
                            color: color.iconColor,
                            lineHeight: 1.3,
                          }}
                        >
                          {dept.name}
                        </p>

                        {/* Status dot */}
                        <div className="d-flex align-items-center gap-1 mb-3">
                          <span
                            style={{
                              width: 7,
                              height: 7,
                              borderRadius: "50%",
                              background: color.dot,
                              display: "inline-block",
                            }}
                          />
                          <span
                            className="text-muted"
                            style={{ fontSize: "0.75rem" }}
                          >
                            Active
                          </span>
                        </div>

                        {/* Action buttons */}
                        <div className="d-flex gap-2">
                          <Button
                            size="sm"
                            variant="outline-primary"
                            className="flex-fill py-1"
                            style={{ fontSize: "0.78rem" }}
                            onClick={() => handleEdit(dept)}
                          >
                            <Pencil size={12} className="me-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            className="flex-fill py-1"
                            style={{ fontSize: "0.78rem" }}
                            onClick={() => handleDelete(dept.id)}
                          >
                            <Trash size={12} className="me-1" />
                            Delete
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          ) : (
            /* ── TABLE VIEW ── */
            <Table
              hover
              responsive
              className="mb-0"
              style={{ fontSize: "0.875rem" }}
            >
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="py-3">Department</th>
                  <th className="py-3">Status</th>
                  <th className="py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((dept, index) => {
                  const color = getColor(dept.id);
                  return (
                    <tr key={dept.id || index}>
                      <td className="px-4 py-3 text-muted">{index + 1}</td>

                      <td className="py-3">
                        <div className="d-flex align-items-center gap-2">
                          <div
                            className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                            style={{
                              width: 34,
                              height: 34,
                              background: color.iconBg,
                              color: color.iconColor,
                              fontSize: "0.72rem",
                              fontWeight: 700,
                            }}
                          >
                            {getInitials(dept.name)}
                          </div>
                          <p className="mb-0 fw-semibold">{dept.name}</p>
                        </div>
                      </td>

                      <td className="py-3">
                        <div className="d-flex align-items-center gap-2">
                          <span
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              background: color.dot,
                              display: "inline-block",
                            }}
                          />
                          <span
                            className="text-muted"
                            style={{ fontSize: "0.82rem" }}
                          >
                            Active
                          </span>
                        </div>
                      </td>

                      <td className="py-3 text-center">
                        <Button
                          size="sm"
                          variant="outline-primary"
                          className="me-2 px-2 py-1"
                          onClick={() => handleEdit(dept)}
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          className="px-2 py-1"
                          onClick={() => handleDelete(dept.id)}
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

export default Departments;
