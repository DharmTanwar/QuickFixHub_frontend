import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [provider, setProvider] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchProvider = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:8080/provider", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProvider(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProvider();
  }, [navigate]);

  if (loading) {
    return (
      <main className="flex-grow-1 d-flex align-items-center justify-content-center min-vh-100">
        <div className="spinner-border text-primary fs-1" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow-1">
      {/* Hero Section */}
      <section
        className="bg-primary text-white py-5 mb-5"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="container">
          <div className="row align-items-center py-5">
            <div className="col-lg-6">
              <h1 className="display-3 fw-bold mb-4 animate__animated animate__fadeInUp">
                Find Providers
              </h1>
              <p className="lead fs-4 opacity-90 mb-4 animate__animated animate__fadeInUp animate__delay-1s">
                Verified professionals for all your home services. Book
                instantly with verified providers.
              </p>
            </div>
            <div className="col-lg-6 text-center animate__animated animate__zoomIn animate__delay-2s">
              <div className="hero-icon" style={{ fontSize: "10rem" }}>
                🔧👨‍🔧✨
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Providers Grid */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold mb-3">Available Providers</h2>
            <p className="lead text-muted">
              {provider.length} professionals ready to serve you
            </p>
          </div>

          {provider.length === 0 ? (
            <div className="text-center py-5">
              <div className="display-1 mb-4 text-muted">📭</div>
              <h3 className="text-muted mb-3">
                No providers available right now
              </h3>
              <p className="text-muted fs-5">
                Check back later for new professionals
              </p>
            </div>
          ) : (
            <div className="row g-4">
              {provider.map((item, index) => (
                <div
                  key={item._id}
                  className="col-xl-4 col-lg-6 col-md-6 animate__animated animate__fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="card h-100 border-0 shadow-lg hover-shadow-xl overflow-hidden position-relative">
                    {/* Available Badge */}
                    <div
                      className={`position-absolute top-1 start-1 p-3 rounded-end shadow-sm z-3 ${item.isAvailable ? "bg-success" : "bg-danger"}`}
                      style={{ fontSize: "0.9rem", fontWeight: "bold" }}
                    >
                      {item.isAvailable ? "🟢 AVAILABLE" : "🔴 BUSY"}
                    </div>

                    {/* Avatar */}
                    <div className="p-4 text-center bg-light">
                      <div
                        className="avatar-circle mx-auto mb-3 shadow-lg"
                        style={{
                          width: "120px",
                          height: "120px",
                          background:
                            "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                        }}
                      >
                        <div className="fs-1" style={{ lineHeight: "120px" }}>
                          👨‍🔧
                        </div>
                      </div>
                      <h4 className="fw-bold text-dark mb-1">{item.name}</h4>
                      <span className="badge bg-warning text-dark fs-6 px-3 py-2">
                        ⭐ 4.9 (128)
                      </span>
                    </div>

                    {/* Content */}
                    <div className="card-body p-4">
                      <div className="mb-4">
                        <h6 className="fw-bold text-muted mb-2">
                          <i className="bi bi-tools me-2 text-warning"></i>
                          Services
                        </h6>
                        <div className="service-tags">
                          {item.service.slice(0, 3).map((service, i) => (
                            <span
                              key={i}
                              className="badge bg-light text-dark me-2 mb-1 shadow-sm"
                            >
                              {service}
                            </span>
                          ))}
                          {item.service.length > 3 && (
                            <span className="badge bg-secondary text-white">
                              +{item.service.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="row g-3 mb-4">
                        <div className="col-6">
                          <div className="text-center p-3 bg-light rounded-3 shadow-sm">
                            <div className="fs-4 fw-bold text-success mb-1">
                              ₹{Math.floor(Math.random() * 500 + 200)}
                            </div>
                            <small className="text-muted">Starting Price</small>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="text-center p-3 bg-light rounded-3 shadow-sm">
                            <div className="fs-4 fw-bold text-primary mb-1">
                              <i className="bi bi-clock me-1"></i>30 mins
                            </div>
                            <small className="text-muted">Avg Response</small>
                          </div>
                        </div>
                      </div>

                      {/* Contact Buttons */}
                      <div className="d-grid gap-2">
                        <a
                          href={`tel:${item.phone}`}
                          className="btn btn-success btn-lg fw-bold shadow-lg"
                        >
                          <i className="bi bi-telephone me-2"></i>Call Now
                        </a>
                        <button className="btn btn-outline-primary btn-lg fw-bold shadow-lg">
                          <i className="bi bi-chat-dots me-2"></i>Message
                        </button>
                      </div>
                    </div>

                    {/* Footer */}
                    <div
                      className="card-footer bg-gradient text-center p-3 border-0"
                      style={{
                        background:
                          "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                      }}
                    >
                      <small className="text-white opacity-75">
                        Verified Provider • Joined {new Date().getFullYear()}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md-3">
              <h1 className="display-1 fw-bold text-warning">
                {provider.length}
              </h1>
              <p className="h5 text-muted">Providers Online</p>
            </div>
            <div className="col-md-3">
              <h1 className="display-1 fw-bold text-primary">24/7</h1>
              <p className="h5 text-muted">Service Ready</p>
            </div>
            <div className="col-md-3">
              <h1 className="display-1 fw-bold text-success">⭐ 4.9</h1>
              <p className="h5 text-muted">Avg Rating</p>
            </div>
            <div className="col-md-3">
              <h1 className="display-1 fw-bold text-info">10K+</h1>
              <p className="h5 text-muted">Bookings Done</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
