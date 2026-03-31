import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";

function DoctorSidebar({ isOpen, setIsOpen, handleLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
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
          transform: isOpen ? "translateX(0)" : "translateX(0)",
          boxShadow: isOpen ? "5px 0 15px rgba(0,0,0,0.05)" : "none",
        }}
      >
        <div>
          <div className="text-center my-4">
            <h4 className="fw-bold text-success mb-0">MedDoctor</h4>
            <small className="text-muted">Hospital System</small>
          </div>

          <div className="border-bottom border-secondary-subtle mb-4"></div>

          <div className="d-flex flex-column">
            {/* Dashboard */}
            <div
              onClick={() => handleNav("/doctor/dashboard")}
              className={`${itemClass} ${isActive("/doctor/dashboard") ? "bg-success text-white shadow-sm" : "text-dark hover-bg-light-gray"}`}
              style={{ cursor: "pointer" }}
            >
              <LayoutDashboard size={20} className="me-3" />
              <span className="fw-semibold">Dashboard</span>
            </div>

            {/* Appointments */}
            <div
              onClick={() => handleNav("/doctor/appointments")}
              className={`${itemClass} ${isActive("/doctor/appointments") ? "bg-success text-white shadow-sm" : "text-dark hover-bg-light-gray"}`}
              style={{ cursor: "pointer" }}
            >
              <CalendarCheck size={20} className="me-3" />
              <span className="fw-semibold">Appointments</span>
            </div>

            {/* Patients */}
            <div
              onClick={() => handleNav("/doctor/patients")}
              className={`${itemClass} ${isActive("/doctor/patients") ? "bg-success text-white shadow-sm" : "text-dark hover-bg-light-gray"}`}
              style={{ cursor: "pointer" }}
            >
              <Users size={20} className="me-3" />
              <span className="fw-semibold">My Patients</span>
            </div>
          </div>
        </div>

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

export default DoctorSidebar;
