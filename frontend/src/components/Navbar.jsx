import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-white shadow-sm">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="home">
          <span className="fw-bold">MediCare Pro</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#features">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#benefits">
                Benefits
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#testimonials">
                Testimonials
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">
                Contact
              </a>
            </li>
          </ul>
          <div className="d-flex ms-lg-3">
            <Link to="/login" className="btn btn-outline-primary me-2">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
