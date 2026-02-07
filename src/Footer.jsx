export default function Footer() {
  return (
    <footer
      className="bg-dark text-light py-5 mt-auto"
      style={{
        background: "linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)",
      }}
    >
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="fw-bold mb-3">
              <span className="text-warning">Quick</span>
              <span className="text-white">Fix Hub</span>
            </h5>
            <p className="opacity-75">
              Your trusted platform for quick fixes and reliable services.
              Premium quality at your doorstep.
            </p>
            <div className="d-flex gap-2">
              <span className="text-light">
                <i className="bi bi-facebook fs-5"></i>
              </span>
              <span className="text-light">
                <i className="bi bi-twitter fs-5"></i>
              </span>
              <span className="text-light">
                <i className="bi bi-instagram fs-5"></i>
              </span>
            </div>
          </div>

          {/* Quick Links - NON-CLICKABLE */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3 text-warning">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <span className="text-light opacity-75">Home</span>
              </li>
              <li>
                <span className="text-light opacity-75">Services</span>
              </li>
              <li>
                <span className="text-light opacity-75">About</span>
              </li>
              <li>
                <span className="text-light opacity-75">Contact</span>
              </li>
            </ul>
          </div>

          {/* Support - NON-CLICKABLE */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="fw-bold mb-3 text-warning">Support</h6>
            <ul className="list-unstyled">
              <li>
                <span className="text-light opacity-75">Help Center</span>
              </li>
              <li>
                <span className="text-light opacity-75">Privacy Policy</span>
              </li>
              <li>
                <span className="text-light opacity-75">Terms of Service</span>
              </li>
            </ul>
          </div>

          {/* Contact - NON-CLICKABLE */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="fw-bold mb-3 text-warning">Contact Us</h6>
            <p className="opacity-75 mb-1">
              <i className="bi bi-telephone me-2"></i>+91 98765 43210
            </p>
            <p className="opacity-75 mb-1">
              <i className="bi bi-envelope me-2"></i>support@quickfixhub.com
            </p>
            <p className="opacity-75">Faridabad, Haryana, India</p>
          </div>
        </div>

        <hr className="my-4 opacity-25" />
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0 opacity-75">
              © 2026 QuickFix Hub. All rights reserved.
              <span className="text-warning ms-3">
                Created by Dharmender Tanwar
              </span>
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <span className="text-light opacity-75 me-3">Privacy</span>
            <span className="text-light opacity-75">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
