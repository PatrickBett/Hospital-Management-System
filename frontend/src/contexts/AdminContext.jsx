import { createContext, useState, useEffect } from "react";
import api from "../api";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [allUsers, SetAllUsers] = useState([]);
  const [doctorappointments, setDoctorAppointments] = useState([]);

  // Check if token exists
  const hasToken = () => !!localStorage.getItem("access_token");

  // Departments
  const fetchDepartments = async () => {
    if (!hasToken()) return;
    try {
      const res = await api.get("api/departments");
      setDepartments(res.data);
    } catch (error) {
      console.log("error fetching departments", error);
    }
  };

  // Doctors
  const fetchDoctors = async () => {
    if (!hasToken()) return;
    try {
      const res = await api.get("/api/users/");
      SetAllUsers(res.data);
      setDoctors(res.data.filter((user) => user.role === "doctor"));
    } catch (error) {
      console.log("error fetching doctors", error);
    }
  };

  // Appointments
  const fetchAppointments = async () => {
    if (!hasToken()) return;
    try {
      const res = await api.get("api/appointments");
      setAppointments(res.data);
    } catch (error) {
      console.log("error fetching appointments", error);
    }
  };

  // Doctor Appointments
  const fetchDoctorAppointments = async () => {
    if (!hasToken()) return;
    try {
      const res = await api.get("/api/appointments/doctor/");
      setDoctorAppointments([res.data]);
    } catch (error) {
      console.log("error fetching doctor appointments", error);
    }
  };

  // Centralized function to load everything
  const refreshData = () => {
    fetchDepartments();
    fetchDoctors();
    fetchAppointments();
    fetchDoctorAppointments();
  };

  // Run on mount (catches page refreshes)
  useEffect(() => {
    refreshData();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        appointments,
        setAppointments,
        departments,
        setDepartments,
        doctors,
        setDoctors,
        allUsers,
        SetAllUsers,
        doctorappointments,
        setDoctorAppointments,
        refreshData, // Exposing this to the app!
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
