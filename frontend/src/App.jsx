import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Bootstrap & Toastify CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Common & Public Components
import HospitalLandingPage from "./components/HospitalLandingPage";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ProtectedRoute from "./components/ProtectedRoute";

// General App Components
import Inbox from "./components/Inbox";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar";
import ViewMessage from "../ViewMessage";

// Admin Imports
import AdminLayout from "./components/Admin/AdminLayout";
import AdminDashboard from "./components/Admin/AdminDashboard";
import InventoryPage from "./components/Admin/InventoryPage";
import AdminAppointments from "./components/Admin/AdminAppointments";
import Departments from "./components/Admin/Departments";
import Patients from "./components/Admin/Patients";
import Staffs from "./components/Admin/Staffs";

// Doctor Imports
import DoctorLayout from "./components/Doctor/DoctorLayout";
import DoctorDashboard from "./components/Doctor/DoctorDashboard";

// Patient Imports
import PatientLayout from "./components/Patient/PatientLayout";
import PatientDashboard from "./components/Patient/PatientDashboard";

const Placeholder = ({ title }) => (
  <div className="p-4 bg-white rounded shadow-sm m-4">
    <h3 className="fw-bold">{title} Page</h3>
    <p className="text-muted">This component is under development.</p>
  </div>
);

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HospitalLandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/view-message" element={<ViewMessage />} />

          {/* ============================================== */}
          {/* GENERAL PROTECTED ROUTES                       */}
          {/* ============================================== */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inbox"
            element={
              <ProtectedRoute>
                <Inbox />
              </ProtectedRoute>
            }
          />

          {/* ============================================== */}
          {/* NESTED PATIENT ROUTES                          */}
          {/* ============================================== */}
          <Route
            path="/patient"
            element={
              <ProtectedRoute>
                <PatientLayout />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={<Navigate to="/patient/dashboard" replace />}
            />
            <Route path="dashboard" element={<PatientDashboard />} />
            <Route
              path="records"
              element={<Placeholder title="Medical Records" />}
            />
            <Route path="messages" element={<Placeholder title="Messages" />} />
          </Route>

          {/* =/* NESTED DOCTOR ROUTES */}
          <Route
            path="/doctor"
            element={
              <ProtectedRoute>
                <DoctorLayout />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={<Navigate to="/doctor/dashboard" replace />}
            />
            <Route path="dashboard" element={<DoctorDashboard />} />
            <Route
              path="appointments"
              element={<Placeholder title="Doctor Appointments" />}
            />
            <Route
              path="patients"
              element={<Placeholder title="My Patients" />}
            />
          </Route>

          {/* NESTED ADMIN ROUTES */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="staffs" element={<Staffs />} />
            <Route path="patients" element={<Patients />} />
            <Route path="appointments" element={<AdminAppointments />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="departments" element={<Departments />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}

export default App;
