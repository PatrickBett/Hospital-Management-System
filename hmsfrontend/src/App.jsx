import { useState } from 'react'
import './App.css'
import LandingPage from './LandingPage';
import DoctorDashboard from './DoctorDashboard';
import Login from './Login';
import Register from './Register';
import PatientDashboard from './PatientDashboard';
import StaffDashboard from './StaffDashboard';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Contactus from './Contactus';
import 'bootstrap/dist/css/bootstrap.min.css';
import MpesaPayment from './MpesaPayment';



function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/conta-us' element={<Contactus />} />
        <Route path='/hms/mpesa-payment' element ={<MpesaPayment />} />
 
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
