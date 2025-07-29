import "./App.css";
import HospitalLandingPage from "./components/HospitalLandingPage";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Inbox from "./components/Inbox";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar";
import ViewMessage from "../ViewMessage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // includes Popper

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
