export default function Navbar() {
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
