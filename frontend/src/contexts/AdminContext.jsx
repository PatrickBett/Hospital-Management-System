import { createContext, useState, useEffect } from "react";
import api from "../api";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [doctorappointments, setDoctorAppointments] = useState([]);

  // Check if token exists
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Departments
  const fetchDepartments = async () => {
    try {
      const res = await api.get("api/departments");
      setDepartments(res.data);
    } catch (error) {
      console.log("error fetching departments", error);
    }
  };

  // Doctors
  const fetchDoctors = async () => {
    try {
      const res = await api.get("/api/users/");
      console.log("Fetched users/doctors:", res.data);
      setAllUsers(res.data);
      setDoctors(res.data.filter((user) => user.role === "doctor"));
    } catch (error) {
      console.log("error fetching doctors", error);
    }
  };

  // Appointments
  const fetchAppointments = async () => {
    try {
      const res = await api.get("api/appointments");
      setAppointments(res.data);
    } catch (error) {
      console.log("error fetching appointments", error);
    }
  };

  // Doctor Appointments
  const fetchDoctorAppointments = async () => {
    try {
      const res = await api.get("/api/appointments/doctor/");
      setDoctorAppointments([res.data]);
    } catch (error) {
      console.log("error fetching doctor appointments", error);
    }
  };

  // Run on mount (catches page refreshes)
  useEffect(() => {
    if (isAuthenticated) {
      fetchDepartments();
      fetchDoctorAppointments();
      fetchDoctors();
      fetchAppointments();
    }
  }, [isAuthenticated]);

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        appointments,
        setAppointments,
        departments,
        setDepartments,
        doctors,
        setDoctors,
        allUsers,
        setAllUsers,
        doctorappointments,
        setDoctorAppointments,
        // Exposing this to the app!
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
