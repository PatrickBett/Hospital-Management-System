import React, { useContext, useState, useMemo } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import AddMedicineModal from "./AddModals/AddMedicineModal";
import api from "../../api";
import { Pencil, Trash, Plus } from "lucide-react";
import {
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";

const STATUS = {
  expired: { label: "Expired", bg: "danger" },
  expiring: { label: "Expiring soon", bg: "warning", text: "dark" },
  instock: { label: "In stock", bg: "success" },
};


function getStatus(expiryDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDate);
  const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  if (daysLeft < 0) return "expired";
  if (daysLeft <= 30) return "expiring";
  return "instock";
}

const TABS = ["all", "instock", "expiring", "expired"];
const TAB_LABELS = {
  all: "All medicines",
  instock: "In stock",
  expiring: "Expiring soon",
  expired: "Expired",
};

function InventoryPage() {
  const { medicine, setMedicine } = useContext(AdminContext);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this medicine?"))
      return;
    try {
      await api.delete(`api/inventory/${id}/`);
      setMedicine(medicine.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEdit = (med) => {
    console.log("Edit:", med);
    // open modal or navigate
  };

  // Derived counts
  const counts = useMemo(() => {
    const all = medicine || [];
    return {
      all: all.length,
      instock: all.filter((m) => getStatus(m.expiry_date) === "instock").length,
      expiring: all.filter((m) => getStatus(m.expiry_date) === "expiring")
        .length,
      expired: all.filter((m) => getStatus(m.expiry_date) === "expired").length,
    };
  }, [medicine]);

  const filtered = useMemo(() => {
    let list = medicine || [];
    if (activeTab !== "all")
      list = list.filter((m) => getStatus(m.expiry_date) === activeTab);
    if (search.trim())
      list = list.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase()),
      );
    list = [...list].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "expiry")
        return new Date(a.expiry_date) - new Date(b.expiry_date);
      if (sortBy === "stock") return b.quantity_in_stock - a.quantity_in_stock;
      if (sortBy === "price") return a.price_per_unit - b.price_per_unit;
      return 0;
    });
    return list;
  }, [medicine, activeTab, search, sortBy]);

  const tabBadgeVariant = {
    all: "secondary",
    instock: "success",
    expiring: "warning",
    expired: "danger",
  };
  const tabBadgeText = { expiring: "dark" };

  return (
    <div className="p-3 p-md-4">
      {/* Page header */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h4 className="fw-bold mb-1">Inventory</h4>
          <p className="text-muted mb-0" style={{ fontSize: "0.875rem" }}>
            Manage medicines, stock levels, and expiry tracking
          </p>
        </div>
        <button
          className="d-flex align-items-center gap-2 btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          <Plus size={16} /> Add medicine
        </button>
        <AddMedicineModal
          show={showModal}
          handleClose={() => setShowModal(false)}
        />
      </div>

      {/* Stats row */}
      <Row className="g-3 mb-4">
        {[
          {
            label: "Total medicines",
            value: counts.all,
            sub: "in inventory",
            color: "text-dark",
          },
          {
            label: "In stock",
            value: counts.instock,
            sub: "healthy stock",
            color: "text-success",
          },
          {
            label: "Expiring soon",
            value: counts.expiring,
            sub: "within 5 days",
            color: "text-warning",
          },
          {
            label: "Already expired",
            value: counts.expired,
            sub: "requires action",
            color: "text-danger",
            blink: true,
          },
        ].map(({ label, value, sub, color, blink }) => (
          <Col xs={6} md={3} key={label}>
            <Card
              className="border-0 h-100"
              style={{ background: "var(--bs-secondary-bg, #f8f9fa)" }}
            >
              <Card.Body className="py-3">
                <p
                  className="text-muted mb-1"
                  style={{
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  {label}
                </p>
                <h3 className={`fw-bold mb-1 ${color}`}>{value}</h3>
                <p
                  className="mb-0 d-flex align-items-center gap-1"
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--bs-secondary-color)",
                  }}
                >
                  {blink && (
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: "#dc3545",
                        display: "inline-block",
                        animation: "blink 1.2s ease-in-out infinite",
                      }}
                    />
                  )}
                  {sub}
                </p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Main table card */}
      <Card className="shadow-sm border-0">
        {/* Tabs */}
        <div className="border-bottom px-3 pt-2 d-flex gap-1 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="btn btn-link text-decoration-none px-3 py-2 d-flex align-items-center gap-2"
              style={{
                fontSize: "0.875rem",
                color: activeTab === tab ? "#0d6efd" : "#6c757d",
                borderBottom:
                  activeTab === tab
                    ? "2px solid #0d6efd"
                    : "2px solid transparent",
                borderRadius: 0,
                fontWeight: activeTab === tab ? 500 : 400,
              }}
            >
              {TAB_LABELS[tab]}
              <Badge
                bg={tabBadgeVariant[tab]}
                text={tabBadgeText[tab]}
                pill
                style={{ fontSize: "0.7rem" }}
              >
                {counts[tab]}
              </Badge>
            </button>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="p-3 border-bottom d-flex gap-2 flex-wrap align-items-center">
          <InputGroup style={{ maxWidth: 320 }}>
            <InputGroup.Text className="bg-white border-end-0">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </InputGroup.Text>
            <Form.Control
              placeholder="Search medicines..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-start-0"
              style={{ fontSize: "0.875rem" }}
            />
          </InputGroup>
          <Form.Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ width: "auto", fontSize: "0.875rem" }}
          >
            <option value="name">Sort: Name</option>
            <option value="expiry">Sort: Expiry date</option>
            <option value="stock">Sort: Stock level</option>
            <option value="price">Sort: Price</option>
          </Form.Select>
          <span className="text-muted ms-auto" style={{ fontSize: "0.8rem" }}>
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <Table hover className="mb-0" style={{ fontSize: "0.875rem" }}>
            <thead>
              <tr className="table-light">
                <th className="ps-3" style={{ width: 40 }}>
                  #
                </th>
                <th>Medicine</th>
                <th>Stock</th>
                <th>Price / unit</th>
                <th>Date stocked</th>
                <th>Expiry date</th>
                <th>Status</th>
                <th style={{ width: 90 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center text-muted py-5">
                    No medicines found.
                  </td>
                </tr>
              ) : (
                filtered.map((med, index) => {
                  const status = getStatus(med.expiry_date);
                  const isExpired = status === "expired";
                  return (
                    <tr
                      key={med.id || index}
                      style={isExpired ? { background: "#fff8f8" } : {}}
                    >
                      <td
                        className="ps-3 text-muted"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {index + 1}
                      </td>
                      <td>
                        <div className="fw-semibold">{med.name}</div>
                        {med.batch && (
                          <div
                            className="text-muted"
                            style={{ fontSize: "0.75rem" }}
                          >
                            Batch #{med.batch}
                          </div>
                        )}
                      </td>
                      <td>
                        <span className="fw-semibold">
                          {med.quantity_in_stock}
                        </span>{" "}
                        <span
                          className="text-muted"
                          style={{ fontSize: "0.8rem" }}
                        >
                          units
                        </span>
                      </td>
                      <td>${med.price_per_unit}</td>
                      <td className="text-muted">{med.date_added}</td>
                      <td>
                        {isExpired ? (
                          <Badge bg="danger" className="fw-normal">
                            {med.expiry_date}
                          </Badge>
                        ) : status === "expiring" ? (
                          <span className="text-warning fw-semibold">
                            {med.expiry_date}
                          </span>
                        ) : (
                          med.expiry_date
                        )}
                      </td>
                      <td>
                        <Badge
                          bg={STATUS[status].bg}
                          text={STATUS[status].text}
                          className="fw-normal d-inline-flex align-items-center gap-1"
                        >
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: "currentColor",
                              display: "inline-block",
                            }}
                          />
                          {STATUS[status].label}
                        </Badge>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          className="me-1 p-1"
                          onClick={() => handleEdit(med)}
                        >
                          <Pencil size={13} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          className="p-1"
                          onClick={() => handleDelete(med.id)}
                        >
                          <Trash size={13} />
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        </div>

        {/* Footer */}
        <div className="px-3 py-2 border-top d-flex align-items-center justify-content-between">
          <span className="text-muted" style={{ fontSize: "0.8rem" }}>
            Showing {filtered.length} of {counts.all} medicines
          </span>
        </div>
      </Card>

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }`}</style>
    </div>
  );
}

export default InventoryPage;
