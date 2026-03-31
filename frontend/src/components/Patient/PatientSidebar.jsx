import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  LayoutDashboard,
  FileHeart,
  MessageSquareText,
  LogOut,
  Menu,
  X,
} from "lucide-react";

function PatientSidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const itemClass = "d-flex align-items-center p-3 mb-2 rounded transition-all";

  const handleNav = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    toast.success("Logged Out Successfully");
    navigate("/login");
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
        className={`border-end border-secondary-subtle p-3 vh-100 position-fixed top-0 start-0 d-flex flex-column justify-content-between ${
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
            <h4 className="fw-bold text-primary mb-0">MedPatient</h4>
            <small className="text-muted">Hospital System</small>
          </div>

          <div className="border-bottom border-secondary-subtle mb-4"></div>

          <div className="d-flex flex-column">
            {/* Dashboard */}
            <div
              onClick={() => handleNav("/patient/dashboard")}
              className={`${itemClass} ${isActive("/patient/dashboard") ? "bg-primary text-white shadow-sm" : "text-dark hover-bg-light-gray"}`}
              style={{ cursor: "pointer" }}
            >
              <LayoutDashboard size={20} className="me-3" />
              <span className="fw-semibold">Dashboard</span>
            </div>

            {/* Records */}
            <div
              onClick={() => handleNav("/patient/records")}
              className={`${itemClass} ${isActive("/patient/records") ? "bg-primary text-white shadow-sm" : "text-dark hover-bg-light-gray"}`}
              style={{ cursor: "pointer" }}
            >
              <FileHeart size={20} className="me-3" />
              <span className="fw-semibold">Medical Records</span>
            </div>

            {/* Messages */}
            <div
              onClick={() => handleNav("/patient/messages")}
              className={`${itemClass} ${isActive("/patient/messages") ? "bg-primary text-white shadow-sm" : "text-dark hover-bg-light-gray"}`}
              style={{ cursor: "pointer" }}
            >
              <MessageSquareText size={20} className="me-3" />
              <span className="fw-semibold">Messages</span>
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

export default PatientSidebar;
