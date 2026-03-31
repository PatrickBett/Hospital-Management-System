import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
// Import Lucide icons
import {
  LayoutDashboard,
  HeartPulse,
  Users,
  CalendarCheck,
  Boxes,
  Building,
  LogOut,
  Menu,
  X,
} from "lucide-react";

function AdminSidebar({ isOpen, setIsOpen, handleLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to check if the route is active
  const isActive = (path) => location.pathname === path;

  // Common classes for menu items to keep code DRY
  const itemClass = "d-flex align-items-center p-3 mb-2 rounded transition-all";

  const handleNav = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Hamburger Toggle */}
      <div
        className="d-md-none position-fixed top-0 start-0 m-2 p-2 bg-light border border-secondary-subtle rounded text-dark shadow-sm"
        style={{ zIndex: 1050, cursor: "pointer" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </div>

      {/* Sidebar Container */}
      <div
        className={` border-end border-secondary-subtle p-3 vh-100 position-fixed top-0 start-0 d-flex flex-column justify-content-between ${
          isOpen ? "d-flex" : "d-none d-md-flex"
        }`}
        style={{
          backgroundColor: "#c6e8f0",
          width: "250px",
          zIndex: 1040,
          transition: "transform 0.3s ease",
          transform: isOpen
            ? "translateX(0)"
            : typeof window !== "undefined" && window.innerWidth < 768
              ? "translateX(-100%)"
              : "translateX(0)",
          boxShadow: isOpen ? "5px 0 15px rgba(0,0,0,0.05)" : "none",
        }}
      >
        {/* Top Section: Logo & Links */}
        <div>
          <div className="text-center my-4">
            <h4 className="fw-bold text-primary mb-0">MedAdmin</h4>
            <small className="text-muted">Hospital System</small>
          </div>

          <div className="border-bottom border-secondary-subtle mb-4"></div>

          {/* Navigation Links using Divs */}
          <div className="d-flex flex-column">
            {/* Dashboard Link */}
            <div
              onClick={() => handleNav("/admin/dashboard")}
              className={`${itemClass} ${
                isActive("/admin/dashboard")
                  ? "bg-primary text-white shadow-sm"
                  : "text-dark hover-bg-light-gray"
              }`}
              style={{ cursor: "pointer" }}
            >
              <LayoutDashboard
                size={20}
                className={`me-3 ${isActive("/admin/dashboard") ? "text-white" : "text-primary"}`}
              />
              <span className="fw-semibold">Dashboard</span>
            </div>

            {/* Staffs Link */}
            <div
              onClick={() => handleNav("/admin/staffs")}
              className={`${itemClass} ${
                isActive("/admin/staffs")
                  ? "bg-primary text-white shadow-sm"
                  : "text-dark hover-bg-light-gray"
              }`}
              style={{ cursor: "pointer" }}
            >
              <HeartPulse
                size={20}
                className={`me-3 ${isActive("/admin/staffs") ? "text-white" : "text-primary"}`}
              />
              <span className="fw-semibold">Staffs</span>
            </div>

            {/* Patients Link */}
            <div
              onClick={() => handleNav("/admin/patients")}
              className={`${itemClass} ${
                isActive("/admin/patients")
                  ? "bg-primary text-white shadow-sm"
                  : "text-dark hover-bg-light-gray"
              }`}
              style={{ cursor: "pointer" }}
            >
              <Users
                size={20}
                className={`me-3 ${isActive("/admin/patients") ? "text-white" : "text-primary"}`}
              />
              <span className="fw-semibold">Patients</span>
            </div>

            {/* Appointments Link */}
            <div
              onClick={() => handleNav("/admin/appointments")}
              className={`${itemClass} ${
                isActive("/admin/appointments")
                  ? "bg-primary text-white shadow-sm"
                  : "text-dark hover-bg-light-gray"
              }`}
              style={{ cursor: "pointer" }}
            >
              <CalendarCheck
                size={20}
                className={`me-3 ${isActive("/admin/appointments") ? "text-white" : "text-primary"}`}
              />
              <span className="fw-semibold">Appointments</span>
            </div>

            {/* Inventory Link */}
            <div
              onClick={() => handleNav("/admin/inventory")}
              className={`${itemClass} ${
                isActive("/admin/inventory")
                  ? "bg-primary text-white shadow-sm"
                  : "text-dark hover-bg-light-gray"
              }`}
              style={{ cursor: "pointer" }}
            >
              <Boxes
                size={20}
                className={`me-3 ${isActive("/admin/inventory") ? "text-white" : "text-primary"}`}
              />
              <span className="fw-semibold">Inventory</span>
            </div>

            {/* Departments Link */}
            <div
              onClick={() => handleNav("/admin/departments")}
              className={`${itemClass} ${
                isActive("/admin/departments")
                  ? "bg-primary text-white shadow-sm"
                  : "text-dark hover-bg-light-gray"
              }`}
              style={{ cursor: "pointer" }}
            >
              <Building
                size={20}
                className={`me-3 ${isActive("/admin/departments") ? "text-white" : "text-primary"}`}
              />
              <span className="fw-semibold">Departments</span>
            </div>
          </div>
        </div>

        {/* Bottom Section: Logout */}
        <div>
          <div className="border-bottom border-secondary-subtle mb-3"></div>

          <div
            onClick={handleLogout}
            className="d-flex align-items-center justify-content-center p-3 bg-danger text-white rounded transition-all shadow-sm"
            style={{ cursor: "pointer" }}
          >
            <LogOut size={20} className="me-2" />
            <span className="fw-bold">Logout</span>
          </div>
        </div>
      </div>

      {/* Dark overlay when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="d-md-none position-fixed top-0 start-0 w-100 h-100 bg-black opacity-25"
          style={{ zIndex: 1030 }}
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

export default AdminSidebar;
