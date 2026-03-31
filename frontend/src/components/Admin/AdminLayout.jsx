import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { toast } from "react-toastify";

function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    toast.success("Logged Out Success");
    navigate("/login");
  };

  return (
    <div
      className="d-flex"
      style={{ backgroundColor: "#f4f6f9", minHeight: "100vh" }}
    >
      {/* Sidebar remains fixed on the left */}
      <AdminSidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleLogout={handleLogout}
      />

      {/* Dynamic Content Area on the right */}
      <div
        className="flex-grow-1"
        style={{ transition: "margin-left 0.3s ease" }}
      >
        <div style={{ marginLeft: window.innerWidth > 768 ? "250px" : "0px" }}>
          {/* Global Minimal Header */}
          <div className="p-4 d-flex justify-content-between align-items-center">
            <div>
              <h2 className="fw-bold mb-0">Overview</h2>
              <small className="text-muted">
                Welcome back, {username || "Admin"}
              </small>
            </div>
          </div>

          {/* Child pages (Dashboard, Inventory, etc.) render here */}
          <div className="p-4 pt-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
