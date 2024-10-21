import React from 'react'
import './App.css'
import Navbar from './Navbar'
import Login from './Login'
import { Link } from 'react-router-dom'
function LandingPage() {
  return (
    <div className='container-fluid ' id='landing-page'>
        <h1 className='py-3'>Landing page</h1>
        <Link to='/hms/mpesa-payment/'>Pay</Link>

    </div>
  )
}

export default LandingPage