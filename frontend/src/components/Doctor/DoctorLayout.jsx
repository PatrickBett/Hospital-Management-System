import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DoctorSidebar from "./DoctorSidebar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function DoctorLayout() {
  const [isOpen, setIsOpen] = useState(false);
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
    <div className="d-flex bg-light min-vh-100 position-relative">
      {/* Sidebar gets the states it needs */}
      <DoctorSidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div
        className="flex-grow-1"
        style={{
          marginLeft: "250px", // Pushes content right of the desktop sidebar
          transition: "margin 0.3s ease",
          width: "100%",
        }}
      >
        {/* Responsive margin adjustments for smaller screens */}
        <style>
          {`
            @media (max-width: 768px) {
              .flex-grow-1 {
                margin-left: 0 !important;
              }
            }
          `}
        </style>

        {/* This will render whichever doctor sub-page is active! */}
        <Outlet />
      </div>
    </div>
  );
}

export default DoctorLayout;
