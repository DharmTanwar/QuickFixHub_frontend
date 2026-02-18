import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProvider, setIsProvider] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const userRole = localStorage.getItem("role");

      if (token) {
        setIsLoggedIn(true);
        setIsProvider(userRole === "provider");
      } else {
        setIsLoggedIn(false);
        setIsProvider(false);
      }
    };

    // Initial check
    checkAuth();

    // Cross-tab support
    window.addEventListener("storage", checkAuth);

    // Custom events for same tab
    window.addEventListener("loginEvent", checkAuth);
    window.addEventListener("logoutEvent", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("loginEvent", checkAuth);
      window.removeEventListener("logoutEvent", checkAuth);
    };
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Trigger event for same tab update
    window.dispatchEvent(new Event("logoutEvent"));

    setIsLoggedIn(false);
    setIsProvider(false);
    navigate("/");
  };

  const handleHomeClick = () => {
    navigate("/home");
  };

  if (isLoggedIn) {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="container-fluid">
          <a className="navbar-brand fw-bold fs-3" href="/" onClick={handleHomeClick}>
            <span className="text-warning">Quick</span>
            <span className="text-white">Fix Hub</span>
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
              {isProvider ? (
                <>
                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-outline-light fw-bold px-4 ms-2"
                      onClick={handleHomeClick}
                    >
                      <i className="bi bi-house-door me-1"></i>Home
                    </button>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link btn btn-warning text-dark fw-bold px-4 ms-2"
                      href="/booking"
                    >
                      <i className="bi bi-calendar-check me-1"></i>My Bookings
                    </a>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-outline-light fw-bold px-4 ms-2"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-1"></i>Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-outline-light fw-bold px-4 ms-2"
                      onClick={handleHomeClick}
                    >
                      <i className="bi bi-house-door me-1"></i>Home
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-outline-light fw-bold px-4 ms-2"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-1"></i>Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div className="container-fluid">
        <a className="navbar-brand fw-bold fs-3" href="/" onClick={handleHomeClick}>
          <span className="text-warning">Quick</span>
          <span className="text-white">Fix Hub</span>
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
              <button
                className="nav-link btn btn-outline-light fw-bold px-4 ms-2"
                onClick={handleHomeClick}
              >
                <i className="bi bi-house-door me-1"></i>Home
              </button>
            </li>
            <li className="nav-item">
              <a
                className="nav-link btn btn-warning text-dark fw-bold px-4 ms-2"
                href="/login"
              >
                <i className="bi bi-box-arrow-in-right me-1"></i>Login
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link btn btn-warning text-dark fw-bold px-4 ms-2"
                href="/signup"
              >
                <i className="bi bi-person-plus me-1"></i>Sign Up
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
