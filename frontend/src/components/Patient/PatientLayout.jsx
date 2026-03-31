import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./PatientSidebar";

function PatientLayout() {
  return (
    <div
      className="d-flex"
      style={{
        minHeight: "100vh",
        width: "100vw",
        overflowX: "hidden",
      }}
    >
      {/* 1. FORCE the sidebar to be exactly 250px and never shrink or grow */}
      <div style={{ width: "250px", minWidth: "250px", flexShrink: 0 }}>
        <Sidebar />
      </div>

      {/* 2. FORCE the main content area to take up the rest of the screen without sliding under */}
      <div
        className="flex-grow-1 bg-light"
        style={{
          maxWidth: "calc(100vw - 250px)",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div className="bg-primary text-white py-3 mb-4 shadow-sm w-100">
          <div className="d-flex justify-content-between align-items-center px-4">
            <h2 className="mb-0">Patient Dashboard</h2>

            <img
              src="https://www.shutterstock.com/image-photo/handsome-happy-african-american-bearded-260nw-2460702995.jpg"
              alt="Profile"
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
              }}
            />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default PatientLayout;
