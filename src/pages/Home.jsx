import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";


export default function Home() {
  const navigate = useNavigate();
  const [provider, setProvider] = useState([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [selected, setSelected] = useState(null);

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
      <main className="flex-grow-1 d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <div className="spinner-border text-primary fs-1" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </main>
    );
  }

  const handleBook = (item) => {
    setSelected(item);
    setBooking(true);
  };

  return (
    <>
      {/* Main Content */}
      <main
        className="flex-grow-1 bg-light min-vh-100"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Hero Section */}
        <section
          className="bg-primary text-white py-5 mb-5"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          <div className="container">
            <div className="row align-items-center py-5">
              <div className="col-lg-7">
                <h1 className="display-3 fw-bold mb-4">Find Top Providers</h1>
                <p className="lead fs-3 opacity-90 mb-0">
                  Verified professionals ready to serve 24/7. Book instantly!
                </p>
              </div>
              <div className="col-lg-5 text-center">
                <span style={{ fontSize: "12rem" }}>🔧👨‍🔧</span>
              </div>
            </div>
          </div>
        </section>

        {/* Providers Grid */}
        <section className="py-5">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="display-4 fw-bold mb-3">
                Available Providers ({provider.length})
              </h2>
              <p className="lead text-muted fs-5">
                Choose from verified professionals
              </p>
            </div>

            {provider.length === 0 ? (
              <div className="text-center py-5">
                <span className="display-1 mb-4 text-muted opacity-50">📭</span>
                <h3 className="text-muted mb-3">No providers found</h3>
                <p className="text-muted fs-4">
                  Check back soon for new professionals
                </p>
              </div>
            ) : (
              <div className="row g-4">
                {provider.map((item, index) => {
                  const nameInitial = item.name.charAt(0).toUpperCase();
                  return (
                    <div key={item._id} className="col-xl-3 col-lg-4 col-md-6">
                      <div className="card h-100 border-0 shadow-xl overflow-hidden position-relative rounded-4 hover-shadow-2xl transition-all">
                        {/* Status Badge */}
                        <div
                          className={`position-absolute top-1 start-2 p-3 rounded-pill shadow  fw-bold fs-6 ${item.isAvailable ? "bg-success text-white" : "bg-danger text-white"}`}
                        >
                          {item.isAvailable ? "🟢 Live" : "🔴 OFFLINE"}
                        </div>

                        {/* Header */}
                        <div
                          className="text-center pt-5 pb-4 px-4 bg-gradient position-relative"
                          style={{
                            minHeight: "200px",
                            background:
                              "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                          }}
                        >
                          <div
                            className="avatar-circle mx-auto mb-3 shadow-lg "
                            style={{
                              width: "140px",
                              height: "140px",
                              background:
                                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            }}
                          >
                            <span
                              className="position-absolute top-50 start-50 translate-middle text-white fs-2 fw-bold shadow-lg"
                              style={{ fontSize: "3rem" }}
                            >
                              {nameInitial}
                            </span>
                          </div>
                          <h4 className="fw-bold text-dark mb-0 fs-4 ">
                            {item.name}
                          </h4>
                        </div>

                        {/* Content */}
                        <div className="card-body p-4">
                          {/* Services */}
                          <div className="mb-4">
                            <h6 className="fw-bold text-muted mb-3 fs-6">
                              <i className="bi bi-tools me-2 text-primary"></i>
                              Services
                            </h6>
                            <div className="d-flex flex-wrap gap-2">
                              {item.service.slice(0, 4).map((service, i) => (
                                <span
                                  key={i}
                                  className="badge bg-light text-dark border rounded-pill px-3 py-2 shadow-sm fs-6 fw-medium"
                                >
                                  {service}
                                </span>
                              ))}
                              {item.service.length > 4 && (
                                <span className="badge bg-secondary text-white rounded-pill px-3 py-2 fs-6">
                                  +{item.service.length - 4}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Contact Details */}
                          <div className="contact-info mb-4 p-4 bg-light rounded-3 shadow-sm">
                            <div className="row g-3">
                              <div className="col-6 text-center">
                                <i className="bi bi-telephone-fill text-success fs-3 mb-2 d-block"></i>
                                <div className="fw-bold text-dark fs-6">
                                  {item.phone || "N/A"}
                                </div>
                                <small className="text-muted d-block">
                                  Contact Number
                                </small>
                              </div>
                              <div className="col-6 text-center">
                                <i className="bi bi-geo-alt-fill text-primary fs-3 mb-2 d-block"></i>
                                <div className="fw-bold text-dark fs-6">
                                  Faridabad Area
                                </div>
                                <small className="text-muted d-block">
                                  Service Location
                                </small>
                              </div>
                            </div>
                          </div>

                          {/* BOOK NOW Button */}
                          <div className="mb-4">
                            <button
                              onClick={() => handleBook(item)}
                              className="btn btn-warning btn-lg w-100 fw-bold py-3 shadow-xl rounded-3 fs-5"
                            >
                              <i className="bi bi-calendar2-check me-2"></i>
                              BOOK NOW - ₹299/hr
                            </button>
                          </div>
                        </div>

                        {/* Footer */}
                        <div
                          className="card-footer bg-gradient text-center p-4 border-0 rounded-0"
                          style={{
                            background:
                              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          }}
                        >
                          <div className="row align-items-center g-3">
                            <div className="col-8">
                              <div className="d-flex align-items-center justify-content-center gap-2">
                                <i className="bi bi-star-fill text-warning fs-5"></i>
                                <span className="text-white fw-bold fs-6">
                                  4.9 (128)
                                </span>
                              </div>
                            </div>
                            <div className="col-4 text-end">
                              <span
                                className={`badge fs-6 fw-bold px-3 py-2 rounded-pill ${item.isAvailable ? "bg-success" : "bg-danger"}`}
                              >
                                {/* {item.isAvailable ? "🟢 Online" : "⚠️ Offline"} */}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Stats */}
        <section className="py-5 bg-white">
          <div className="container">
            <div className="row text-center g-4">
              <div className="col-md-3">
                <h1 className="display-1 fw-bold text-warning">
                  {provider.length}
                </h1>
                <p className="h5 text-muted fw-semibold">Providers</p>
              </div>
              <div className="col-md-3">
                <h1 className="display-1 fw-bold text-primary">⭐ 4.9</h1>
                <p className="h5 text-muted fw-semibold">Avg Rating</p>
              </div>
              <div className="col-md-3">
                <h1 className="display-1 fw-bold text-success">24/7</h1>
                <p className="h5 text-muted fw-semibold">Available</p>
              </div>
              <div className="col-md-3">
                <h1 className="display-1 fw-bold text-info">10K+</h1>
                <p className="h5 text-muted fw-semibold">Services Done</p>
              </div>
            </div>
          </div>
        </section>
        {/* Booking Overlay - SABSE UPAR Z-1060 */}
        {booking && (
          <>
            {/* Backdrop */}
            <div
              className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-80 d-flex align-items-center  justify-content-center z-1060 p-3"
              style={{ minHeight: "100vh" }}
              onClick={() => setBooking(false)}
            />

            {/* Modal */}
            <div
              className="position-fixed z-1061 p-3 d-flex align-items-center justify-content-center"
              style={{ top: 0, left: 0, width: "100%", height: "100vh" }}
            >
              <div
                className="booking-overlay bg-white rounded-5 shadow-2xl p-0 overflow-hidden position-relative"
                style={{ maxWidth: "550px", width: "100%", maxHeight: "90vh" }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div
                  className="bg-gradient text-white p-5 text-center position-relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  }}
                >
                  <h3 className="display-6 fw-bold mb-2">
                    <i className="bi bi-calendar2-check me-2"></i>
                    Book {selected?.name}
                  </h3>
                  <p className="lead opacity-90 mb-0 fs-6">
                    Select date & time for service
                  </p>
                  <button
                    onClick={() => setBooking(false)}
                    className="position-absolute top-4 end-4 btn btn-sm btn-outline-light rounded-circle p-2 shadow"
                    style={{ width: "45px", height: "45px" }}
                  >
                    <i className="bi bi-x fs-5"></i>
                  </button>
                </div>

                {/* Form Content */}
                <div
                  className="p-5 pt-0"
                  style={{ maxHeight: "calc(90vh - 140px)", overflowY: "auto" }}
                >
                  {/* Provider Info */}
                  <div className="text-center mb-5 p-4 bg-light rounded-4 shadow-sm">
                    <div
                      className="avatar-circle mx-auto mb-3 shadow-lg d-inline-block"
                      style={{
                        width: "80px",
                        height: "80px",
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      }}
                    >
                      <span className="text-white fw-bold fs-3 d-flex align-items-center justify-content-center h-100">
                        {selected?.name?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <h5 className="fw-bold text-dark mb-1">{selected?.name}</h5>
                    <div className="badge bg-success fs-6 px-3 py-2 mb-2">
                      <i className="bi bi-check-circle me-1"></i>
                      {selected?.isAvailable
                        ? "Available Now"
                        : "Accepting Bookings"}
                    </div>
                    <div className="mt-2">
                      {selected?.service?.slice(0, 2).map((service, i) => (
                        <span
                          key={i}
                          className="badge bg-light text-dark me-2 fs-6"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <form className="booking-form">
                    {/* Date & Time Row */}
                    <div className="row g-4 mb-5">
                      <div className="col-md-6">
                        <label className="form-label fw-bold mb-3 fs-5 text-dark">
                          📅 Service Date
                        </label>
                        <input
                          type="date"
                          className="form-control form-control-lg shadow-sm py-4 px-5 rounded-4"
                          style={{
                            fontSize: "1.2rem",
                            border: "2px solid rgba(255,193,7,0.3)",
                          }}
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold mb-3 fs-5 text-dark">
                          🕒 Preferred Time
                        </label>
                        <div className="input-group">
                          <select
                            className="form-select form-control-lg shadow-sm py-4 px-5 rounded-start-4 border-warning flex-grow-1"
                            style={{
                              fontSize: "1.2rem",
                              border: "2px solid rgba(255,193,7,0.3)",
                            }}
                          >
                            <option value="">Select Time</option>
                            <option>09:00 AM</option>
                            <option>10:00 AM</option>
                            <option>11:00 AM</option>
                            <option>12:00 PM</option>
                            <option>01:00 PM</option>
                            <option>02:00 PM</option>
                            <option>03:00 PM</option>
                            <option>04:00 PM</option>
                            <option>05:00 PM</option>
                            <option>06:00 PM</option>
                            <option>07:00 PM</option>
                            <option>08:00 PM</option>
                          </select>
                          <span
                            className="input-group-text bg-warning border-start-0 rounded-end-4"
                            style={{ border: "2px solid rgba(255,193,7,0.3)" }}
                          >
                            <i className="bi bi-clock fs-5"></i>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Service Selection */}
                    <div className="mb-5">
                      <label className="form-label fw-bold mb-3 fs-5 text-dark">
                        🛠️ Select Service
                      </label>
                      <div className="row g-3">
                        {selected?.service?.map((service, index) => (
                          <div key={index} className="col-6">
                            <label className="service-option p-4 border rounded-4 shadow-sm hover-shadow-xl cursor-pointer d-block text-center transition-all w-100 h-100">
                              <div className="fs-4 fw-bold mb-2 text-primary">
                                {service}
                              </div>
                              <div className="form-check mt-2">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="selectedService"
                                  value={service}
                                />
                                <span className="form-check-label fw-semibold fs-6">
                                  Select
                                </span>
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price & Duration */}
                    <div className="row g-4 mb-5">
                      <div className="col-md-6">
                        <div
                          className="text-center p-4 bg-gradient rounded-4 shadow-lg text-white"
                          style={{
                            background:
                              "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
                          }}
                        >
                          <div className="fs-2 fw-bold mb-1">₹499</div>
                          <div className="fs-6 opacity-90">Starting Price</div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div
                          className="text-center p-4 bg-gradient rounded-4 shadow-lg text-white"
                          style={{
                            background:
                              "linear-gradient(135deg, #007bff 0%, #0056b3 100%)",
                          }}
                        >
                          <div className="fs-2 fw-bold mb-1">2 Hours</div>
                          <div className="fs-6 opacity-90">Estimated Time</div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-grid gap-3">
                      <button
                        type="submit"
                        className="btn btn-warning btn-lg fw-bold py-4 shadow-2xl fs-5 rounded-4 border-0 position-relative overflow-hidden"
                        style={{
                          background:
                            "linear-gradient(45deg, #ffc107 0%, #ffed4e 100%)",
                          fontSize: "1.4rem",
                          boxShadow: "0 10px 30px rgba(255,193,7,0.4)",
                        }}
                      >
                        <i className="bi bi-check-circle-fill me-2 fs-4"></i>
                        CONFIRM BOOKING
                      </button>
                      <button
                        type="button"
                        onClick={() => setBooking(false)}
                        className="btn btn-outline-secondary btn-lg fw-bold py-4 fs-5 rounded-4"
                      >
                        <i className="bi bi-x-circle me-2"></i>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
