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

  if (isLoggedIn) {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="container-fluid">
          <a className="navbar-brand fw-bold fs-3" href="/">
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
                    <a
                      className="nav-link btn btn-warning text-dark fw-bold px-4 ms-2"
                      href="/mybookings"
                    >
                      My Bookings
                    </a>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-outline-light fw-bold px-4 ms-2"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-outline-light fw-bold px-4 ms-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
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
        <a className="navbar-brand fw-bold fs-3" href="/">
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
              <a
                className="nav-link btn btn-warning text-dark fw-bold px-4 ms-2"
                href="/login"
              >
                Login
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link btn btn-warning text-dark fw-bold px-4 ms-2"
                href="/signup"
              >
                Sign Up
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
