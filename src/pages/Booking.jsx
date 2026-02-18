import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Booking() {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8080/getbooking", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooking(res.data.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAction = async (bookingId, action) => {
    setActionLoading((prev) => ({ ...prev, [bookingId]: true }));

    try {
      const token = localStorage.getItem("token");

      // Optimistic Update - Instant UI change
      setBooking((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? {
                ...booking,
                status: action === "accept" ? "accepted" : "rejected",
              }
            : booking,
        ),
      );

      // Backend call
      await axios.put(
        `http://localhost:8080/${action}/${bookingId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    } catch (err) {
      // Revert on error
      console.log(`Failed to ${action} booking`);
      // Refresh data on error
      const res = await axios.get("http://localhost:8080/getbooking", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooking(res.data.data || []);
    } finally {
      setActionLoading((prev) => ({ ...prev, [bookingId]: false }));
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: "bg-warning text-dark",
      accepted: "bg-success text-white",
      rejected: "bg-danger text-white",
      completed: "bg-primary text-white",
    };
    return `badge rounded-pill px-3 py-2 fs-6 fw-bold shadow-sm ${badges[status] || "bg-secondary"}`;
  };

  if (loading) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient"
        style={{
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <div className="spinner-border text-primary fs-1" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="display-3 fw-bold mb-3">
            <i className="bi bi-calendar-check-fill text-warning me-3"></i>
            <span className="text-primary">Your</span> Bookings
          </h1>
          <p className="lead fs-4 text-muted mb-0">
            Manage all your service bookings
          </p>
        </div>

        {booking.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-5">
              <i className="bi bi-calendar-x display-1 text-muted opacity-50"></i>
            </div>
            <h3 className="text-muted mb-3 fw-bold">No Bookings Found</h3>
            <p className="text-muted fs-5 mb-4">
              You haven't booked any services yet
            </p>
            <a
              href="/home"
              className="btn btn-warning btn-lg px-5 py-3 fs-5 fw-bold rounded-pill shadow-lg"
            >
              <i className="bi bi-arrow-left me-2"></i>Find Providers
            </a>
          </div>
        ) : (
          <div className="row g-4">
            {booking.map((item) => (
              <div key={item._id} className="col-xl-4 col-lg-6 col-md-12">
                <div className="card border-0 shadow-lg h-100 rounded-4 overflow-hidden position-relative hover-shadow-xl transition-all">
                  {/* Header */}
                  <div
                    className="p-4 pt-5 pb-3 text-white position-relative"
                    style={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h4 className="fw-bold mb-1">{item.service}</h4>
                        <small className="opacity-90">
                          <i className="bi bi-calendar3 me-1"></i>
                          {new Date(item.bookingDate).toLocaleDateString(
                            "en-IN",
                          )}
                        </small>
                      </div>
                      <span className={getStatusBadge(item.status)}>
                        {item.status?.toUpperCase() || "PENDING"}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="card-body p-4">
                    <div className="row g-3 mb-4">
                      <div className="col-6">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-clock-fill text-warning fs-4 me-3"></i>
                          <div>
                            <strong className="d-block fs-6">Time</strong>
                            <span className="fw-bold fs-5">
                              {item.bookingTime}
                            </span>
                          </div>
                        </div>
                      </div>
                      {item.providerName && (
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="bi bi-person-fill text-primary fs-4 me-3"></i>
                            <div>
                              <strong className="d-block fs-6">Provider</strong>
                              <span className="fw-bold fs-5">
                                {item.providerName}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons - Only for pending */}
                    {item.status === "pending" && (
                      <div className="d-grid gap-3">
                        <button
                          className="btn btn-success btn-lg fw-bold py-4 rounded-3 shadow-lg fs-6"
                          onClick={() => handleAction(item._id, "accept")}
                          disabled={actionLoading[item._id]}
                        >
                          {actionLoading[item._id] ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2"></span>
                              Processing...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-check-circle-fill me-2"></i>
                              Accept Booking
                            </>
                          )}
                        </button>
                        <button
                          className="btn btn-outline-danger btn-lg fw-bold py-4 rounded-3 shadow-lg fs-6"
                          onClick={() => handleAction(item._id, "reject")}
                          disabled={actionLoading[item._id]}
                        >
                          {actionLoading[item._id] ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2"></span>
                              Processing...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-x-circle-fill me-2"></i>
                              Reject Booking
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="card-footer bg-light border-0 p-4 text-center">
                    <div className="d-flex align-items-center justify-content-center gap-3">
                      <i className="bi bi-star-fill text-warning fs-4"></i>
                      <span className="fs-5 fw-bold text-primary">
                        QuickFix Guaranteed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
