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
        <Outlet />
      </div>
    </div>
  );
}

export default PatientLayout;
