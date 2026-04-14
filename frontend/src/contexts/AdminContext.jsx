import { createContext, useState, useEffect } from "react";
import api from "../api";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [medicine, setMedicine] = useState([]);
  const [doctorappointments, setDoctorAppointments] = useState([]);

  // Check if token exists
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);


  // Departments
  const fetchDepartments = async () => {
    try {
      const res = await api.get("api/departments");
      setDepartments(res.data);
      console.log("Fetched departments:", res.data);
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
  // Medicine
  const fetchMedicine = async () => {
    try {
      const res = await api.get("/api/inventory/");
      console.log("Fetched medicine:", res.data);
      setMedicine(res.data);
    } catch (error) {
      console.log("error fetching medicine", error);
    }
  };

  // Expiring soon
  const today = new Date();

  const fiveDaysFromNow = new Date();
  fiveDaysFromNow.setDate(today.getDate() + 5);

  const expiringSoon = medicine.flat().filter((med) => {
    const expiry = new Date(med.expiry_date);
    return expiry >= today && expiry <= fiveDaysFromNow;
  });

  

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
      fetchMedicine();
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
        medicine,
        setMedicine,
        expiringSoon,
        // Exposing this to the app!
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
