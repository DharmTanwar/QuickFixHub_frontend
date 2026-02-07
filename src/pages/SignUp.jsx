import { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const initialState = {
    name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
    service: [],
    isAvailable: true,
  };
  const [user, setUser] = useState(initialState);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...user };
    if (user.role !== "provider") {
      delete payload.phone;
      delete payload.service;
    }
    const res = await axios.post("http://localhost:8080/signup", payload);
    localStorage.setItem("token", res.data.token);
    alert("user created");
    setUser(initialState);
  };

  return (
    <main className="flex-grow-1 min-vh-100 bg-light d-flex align-items-center py-5">
      <div className="container-fluid px-lg-5">
        <div className="row justify-content-center">
          <div className="col-xxl-8 col-xl-10 col-lg-10">
            <div className="card border-0 shadow-xl overflow-hidden h-100">
              <div className="row g-0 h-100">
                {/* Left Decor - Wider */}
                <div
                  className="col-lg-7 d-none d-lg-flex p-5 text-white align-self-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  }}
                >
                  <div>
                    <h2 className="display-4 fw-bold mb-4">
                      Join QuickFix Hub
                    </h2>
                    <p className="lead fs-4 opacity-90 mb-5">
                      Choose your role & get started instantly
                    </p>

                    {/* Role Cards */}
                    <div className="row g-4 mb-5">
                      <div className="col-md-6">
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-4 shadow">
                          <div className="fs-1 mb-3 text-center">👤</div>
                          <h5 className="fw-bold mb-2 text-black">User</h5>
                          <p className="opacity-90 mb-0 text-black fs-6">
                            Book services instantly
                            <br />
                            <small>
                              Plumber • Electrician • Painter • 24/7
                            </small>
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-4 shadow">
                          <div className="fs-1 mb-3 text-center">💼</div>
                          <h5 className="fw-bold mb-2 text-black">Provider</h5>
                          <p className="opacity-90 mb-0 text-black fs-6">
                            Get bookings directly
                            <br />
                            <small>
                              Electrician • Painter • AC Repair • Set Rates
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="fs-5 opacity-75">
                        10K+ users • 500+ providers
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Form - Wider */}
                <div className="col-lg-5 p-5 p-lg-5 align-self-center">
                  <div className="text-center mb-5 pb-4">
                    <h1 className="display-5 fw-bold text-dark mb-2">
                      <span className="text-warning">Quick</span>Fix Hub
                    </h1>
                    <p className="text-muted fs-5">Create your account</p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* Name & Email Row */}
                    <div className="row mb-4 g-4">
                      <div className="col-md-6">
                        <label className="form-label fw-bold mb-2 fs-6">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={user.name}
                          onChange={handleChange}
                          className="form-control form-control-lg shadow-sm border-warning"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold mb-2 fs-6">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={user.email}
                          onChange={handleChange}
                          className="form-control form-control-lg shadow-sm border-warning"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="mb-5">
                      <label className="form-label fw-bold mb-2 fs-6">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        className="form-control form-control-lg shadow-sm border-warning"
                        placeholder="Create strong password"
                        required
                      />
                    </div>

                    {/* Role Selection - Fixed Font Issue */}
                    <div className="mb-5 p-4 bg-light rounded-4 shadow-sm">
                      <label className="form-label fw-bold mb-4 d-block fs-5 text-center">
                        Choose Account Type
                      </label>
                      <div className="row text-center g-3">
                        <div className="col-6">
                          <label className="d-block p-4 border rounded-3 hover-shadow cursor-pointer bg-white shadow-sm h-100">
                            <div className="fs-2 mb-2">👤</div>
                            <div className="fs-5 fw-bold mb-1">User</div>
                            <div className="text-muted small">
                              Book Services
                            </div>
                            <input
                              className="form-check-input d-none"
                              type="radio"
                              name="role"
                              value="user"
                              checked={user.role === "user"}
                              onChange={handleChange}
                            />
                          </label>
                        </div>
                        <div className="col-6">
                          <label className="d-block p-4 border rounded-3 hover-shadow cursor-pointer bg-white shadow-sm h-100">
                            <div className="fs-2 mb-2">💼</div>
                            <div className="fs-5 fw-bold mb-1">Provider</div>
                            <div className="text-muted small">
                              Offer Services
                            </div>
                            <input
                              className="form-check-input d-none"
                              type="radio"
                              name="role"
                              value="provider"
                              checked={user.role === "provider"}
                              onChange={handleChange}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Provider Fields */}
                    {user.role === "provider" && (
                      <div className="mb-5 p-4 bg-light rounded-4 shadow-sm">
                        <h6 className="fw-bold mb-4 text-center">
                          Provider Details
                        </h6>
                        <div className="row g-4">
                          <div className="col-12">
                            <label className="form-label fw-bold mb-2 fs-6">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={user.phone}
                              onChange={handleChange}
                              className="form-control form-control-lg shadow-sm border-warning"
                              placeholder="+91 9876543210"
                            />
                          </div>
                          <div className="col-12">
                            <label className="form-label fw-bold mb-2 fs-6">
                              Services Offered
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg shadow-sm border-warning"
                              placeholder="Electrician, Painter, Plumber, AC Repair"
                              onChange={(e) =>
                                setUser({
                                  ...user,
                                  service: e.target.value
                                    .split(",")
                                    .map((s) => s.trim()),
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="form-check mt-4 p-3 bg-white rounded-3 shadow-sm">
                          <input
                            className="form-check-input fs-4"
                            type="checkbox"
                            checked={user.isAvailable}
                            onChange={(e) =>
                              setUser({
                                ...user,
                                isAvailable: e.target.checked,
                              })
                            }
                            id="available"
                          />
                          <label
                            className="form-check-label fw-semibold ms-3 fs-6"
                            htmlFor="available"
                          >
                            ✅ Currently Available for Bookings
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-warning btn-lg fw-bold py-4 shadow-lg fs-5 rounded-4"
                      >
                        <i className="bi bi-person-plus me-2"></i>Create Account
                      </button>
                    </div>

                    <div className="text-center mt-4 pt-4 border-top">
                      <p className="text-muted mb-0 fs-6">
                        Already have an account?{" "}
                        <a
                          href="/login"
                          className="text-decoration-none fw-bold text-primary fs-5"
                        >
                          Sign In Now →
                        </a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
