import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Calendar,
  Users,
  FileText,
  Activity,
  Shield,
  ArrowRight,
  CheckCircle,
} from "react-feather";

import { Link } from "react-router-dom";
import Navbar from "./Navbar";
const HospitalLandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header
        className="py-5"
        style={{
          backgroundImage:
            "url('https://www.appletechsoft.com/wp-content/uploads/2020/06/Hospital-Management-System.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        <div className="container position-relative py-5" style={{ zIndex: 2 }}>
          <div className="row py-5">
            <div className="col-lg-6 mb-4 mb-lg-0 text-white py-4">
              <h1 className="display-4 fw-bold">
                Streamline Your Hospital Operations
              </h1>
              <p className="lead my-4">
                A comprehensive hospital management system designed to optimize
                workflows, improve patient care, and increase operational
                efficiency.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <button className="btn btn-light btn-lg">Request Demo</button>
                <button className="btn btn-outline-light btn-lg">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 123, 255, 0.7)", // blue overlay to maintain the blue theme
            zIndex: 1,
          }}
        ></div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Key Features</h2>
            <p className="lead text-muted">
              Everything you need to manage your hospital effectively
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="icon-box bg-primary bg-opacity-10 rounded-circle p-3 mb-4 d-inline-flex">
                    <Calendar size={24} className="text-primary" />
                  </div>
                  <h5 className="card-title fw-bold">Appointment Management</h5>
                  <p className="card-text">
                    Efficiently schedule, reschedule, and manage patient
                    appointments with automated reminders and calendar
                    synchronization.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="icon-box bg-primary bg-opacity-10 rounded-circle p-3 mb-4 d-inline-flex">
                    <Users size={24} className="text-primary" />
                  </div>
                  <h5 className="card-title fw-bold">Patient Records</h5>
                  <p className="card-text">
                    Securely store and access patient medical histories,
                    diagnostics, prescriptions, and treatment plans in one
                    central location.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="icon-box bg-primary bg-opacity-10 rounded-circle p-3 mb-4 d-inline-flex">
                    <FileText size={24} className="text-primary" />
                  </div>
                  <h5 className="card-title fw-bold">Billing & Insurance</h5>
                  <p className="card-text">
                    Streamline your billing process with automated invoicing,
                    insurance claim management, and payment tracking.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="icon-box bg-primary bg-opacity-10 rounded-circle p-3 mb-4 d-inline-flex">
                    <Activity size={24} className="text-primary" />
                  </div>
                  <h5 className="card-title fw-bold">Laboratory Management</h5>
                  <p className="card-text">
                    Track lab tests, manage samples, and automatically deliver
                    results to doctors and patients through the integrated
                    portal.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="icon-box bg-primary bg-opacity-10 rounded-circle p-3 mb-4 d-inline-flex">
                    <Shield size={24} className="text-primary" />
                  </div>
                  <h5 className="card-title fw-bold">Pharmacy Integration</h5>
                  <p className="card-text">
                    Manage medication inventory, process electronic
                    prescriptions, and monitor drug interactions for enhanced
                    patient safety.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="icon-box bg-primary bg-opacity-10 rounded-circle p-3 mb-4 d-inline-flex">
                    <Activity size={24} className="text-primary" />
                  </div>
                  <h5 className="card-title fw-bold">Analytics & Reporting</h5>
                  <p className="card-text">
                    Gain valuable insights with customizable reports and
                    dashboards that help you make data-driven decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img
                src="https://www.philips.com/c-dam/corporate/newscenter/global/standard/resources/healthcare/2024/fhi-informatics-data-cut/header-global-future-health-index-data-cut.jpg"
                alt="Healthcare professionals using the system"
                className="img-fluid rounded shadow"
                style={{ height: 400, objectFit: "cover" }}
              />
            </div>
            <div className="col-lg-6">
              <h2 className="display-5 fw-bold mb-4">
                Why Choose MediCare Pro?
              </h2>

              <div className="d-flex mb-3">
                <div className="me-3">
                  <CheckCircle size={24} className="text-primary" />
                </div>
                <div>
                  <h5>Improved Patient Care</h5>
                  <p className="text-muted">
                    Enhance patient satisfaction through efficient service
                    delivery and reduced wait times.
                  </p>
                </div>
              </div>

              <div className="d-flex mb-3">
                <div className="me-3">
                  <CheckCircle size={24} className="text-primary" />
                </div>
                <div>
                  <h5>Reduced Operational Costs</h5>
                  <p className="text-muted">
                    Minimize paperwork and administrative overhead while
                    maximizing staff productivity.
                  </p>
                </div>
              </div>

              <div className="d-flex mb-3">
                <div className="me-3">
                  <CheckCircle size={24} className="text-primary" />
                </div>
                <div>
                  <h5>Data-Driven Decisions</h5>
                  <p className="text-muted">
                    Make informed strategic decisions based on comprehensive
                    analytics and reports.
                  </p>
                </div>
              </div>

              <div className="d-flex">
                <div className="me-3">
                  <CheckCircle size={24} className="text-primary" />
                </div>
                <div>
                  <h5>Enhanced Security & Compliance</h5>
                  <p className="text-muted">
                    Stay compliant with healthcare regulations and protect
                    sensitive patient information.
                  </p>
                </div>
              </div>

              <button className="btn btn-primary mt-4">
                Learn More <ArrowRight size={16} className="ms-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Trusted by Healthcare Leaders</h2>
            <p className="lead text-muted">
              See what our clients have to say about MediCare Pro
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="mb-3">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="text-warning me-1">
                        ★
                      </i>
                    ))}
                  </div>
                  <p className="card-text mb-3">
                    "MediCare Pro has transformed our hospital operations. The
                    intuitive interface and comprehensive features have
                    significantly improved our efficiency and patient care
                    quality."
                  </p>
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle bg-primary me-3"
                      style={{ width: 50, height: 50 }}
                    >
                      <img
                        src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png"
                        alt="Dr. Johnson"
                        className="rounded-circle"
                        style={{ width: 50, height: 50, objectFit: "cover" }}
                      />
                    </div>
                    <div>
                      <h6 className="mb-0">Dr. Sarah Johnson</h6>
                      <small className="text-muted">
                        Medical Director, Metro Hospital
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="mb-3">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="text-warning me-1">
                        ★
                      </i>
                    ))}
                  </div>
                  <p className="card-text mb-3">
                    "The billing and insurance module has saved us countless
                    hours and reduced errors. Our administrative staff can now
                    focus on providing better patient service."
                  </p>
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle bg-primary me-3"
                      style={{ width: 50, height: 50 }}
                    >
                      <img
                        src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
                        alt="James Wilson"
                        className="rounded-circle"
                        style={{ width: 50, height: 50, objectFit: "cover" }}
                      />
                    </div>
                    <div>
                      <h6 className="mb-0">James Wilson</h6>
                      <small className="text-muted">
                        CFO, Central Healthcare
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="mb-3">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="text-warning me-1">
                        ★
                      </i>
                    ))}
                  </div>
                  <p className="card-text mb-3">
                    "As a nurse, I appreciate how MediCare Pro has streamlined
                    our workflows. Patient information is now easily accessible,
                    and documentation is much more efficient."
                  </p>
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle bg-primary me-3"
                      style={{ width: 50, height: 50 }}
                    >
                      <img
                        src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
                        alt="Emily Chen"
                        className="rounded-circle"
                        style={{ width: 50, height: 50, objectFit: "cover" }}
                      />
                    </div>
                    <div>
                      <h6 className="mb-0">Emily Chen, RN</h6>
                      <small className="text-muted">
                        Head Nurse, Westside Medical
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-5">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h2 className="display-5 fw-bold mb-4">
                Ready to Transform Your Hospital?
              </h2>
              <p className="lead mb-4">
                Join hundreds of healthcare facilities that have improved
                patient care and operational efficiency with MediCare Pro.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-light btn-lg">Schedule Demo</button>
                <button className="btn btn-outline-light btn-lg">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="d-flex align-items-center mb-3">
                <span className="fw-bold fs-4">MediCare Pro</span>
              </div>
              <p className="text-muted">
                Empowering healthcare providers with innovative technology
                solutions for enhanced patient care.
              </p>
              <div className="d-flex gap-3 mt-4">
                <a href="#" className="text-white">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="bi bi-linkedin"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
            </div>

            <div className="col-lg-2 col-md-4">
              <h5 className="mb-3">Product</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="text-muted text-decoration-none">
                    Features
                  </a>
                </li>

                <li className="mb-2">
                  <a href="#" className="text-muted text-decoration-none">
                    Case Studies
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-muted text-decoration-none">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-4">
              <h5 className="mb-3">Company</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="text-muted text-decoration-none">
                    About Us
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-muted text-decoration-none">
                    Careers
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-muted text-decoration-none">
                    Blog
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-muted text-decoration-none">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-4">
              <h5 className="mb-3">Subscribe to our newsletter</h5>
              <p className="text-muted">
                Get the latest updates and news about MediCare Pro.
              </p>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your email"
                />
                <button className="btn btn-primary" type="button">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <hr className="my-4 bg-secondary" />

          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="text-muted mb-md-0">
                © 2025 MediCare Pro. All rights reserved.
              </p>
            </div>
            <div className="col-md-6">
              <ul className="list-inline text-center text-md-end mb-0">
                <li className="list-inline-item">
                  <a href="#" className="text-muted text-decoration-none">
                    Privacy Policy
                  </a>
                </li>
                <li className="list-inline-item ms-3">
                  <a href="#" className="text-muted text-decoration-none">
                    Terms of Service
                  </a>
                </li>
                <li className="list-inline-item ms-3">
                  <a href="#" className="text-muted text-decoration-none">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HospitalLandingPage;
