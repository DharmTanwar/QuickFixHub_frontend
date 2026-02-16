import axios from "axios";
import { useState } from "react";
import {useNavigate} from "react-router-dom"
export default function Login() {
  const navigate=useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    const res = await axios.post("http://localhost:8080/login", user);
    console.log(res.data);
    console.log(res.data.token);
    localStorage.setItem("token", res.data.token);
     localStorage.setItem("role", res.data.data.role);
    alert("login succesfull");
    setUser({
      email: "",
      password: "",
    });
    navigate("/home");
  };

  return (
    <main
      className="flex-grow-1 min-vh-100 d-flex align-items-center"
      style={{
        background:
          "linear-gradient(135deg, #f8f9ff 0%, #e8f0ff 50%, #f0f4ff 100%)",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
         
          <div className="col-lg-9 col-xl-8">
            <div className="card border-0 shadow-lg overflow-hidden">
              <div className="row g-0">
              
                <div
                  className="col-lg-7 d-none d-lg-block p-5 text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  }}
                >
                  <h2 className="display-5 fw-bold mb-4">Welcome Back!</h2>
                  <p className="lead opacity-90 mb-4">
                    Access your QuickFix Hub account
                  </p>
                  <div className="mt-5">
                    <div className="d-flex align-items-center mb-3 p-3 bg-white bg-opacity-20 rounded-3">
                      <div className="fs-2 me-3">🔧</div>
                      <span className="fs-6 text-black">
                        Book services in 30 mins
                      </span>
                    </div>
                    <div className="d-flex align-items-center p-3 bg-white bg-opacity-20 rounded-3">
                      <div className="fs-2 me-3">💼</div>
                      <span className="fs-6 text-black">
                        Manage your bookings
                      </span>
                    </div>
                  </div>
                </div>

                {/* Form Side - Width BADHAI */}
                <div className="col-lg-5 p-5">
                  <div className="text-center mb-5">
                    <h1 className="h3 fw-bold text-dark mb-2">
                      <span className="text-warning">Quick</span>Fix Hub
                    </h1>
                    <p className="text-muted">Sign in to continue</p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* Email - Width BADHAI, Height SAME */}
                    <div className="mb-4">
                      <label className="form-label fw-bold mb-2">
                        Email or Phone
                      </label>
                      <input
                        type="text"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className="form-control form-control-lg shadow-sm"
                        style={{ width: "110%" }}
                        placeholder="Enter email or phone"
                        required
                      />
                    </div>

                    {/* Password - Width BADHAI, Height SAME */}
                    <div className="mb-4">
                      <label className="form-label fw-bold mb-2">
                        Password
                      </label>
                      <div className="input-group" style={{ width: "110%" }}>
                        <input
                          type="password"
                          name="password"
                          value={user.password}
                          onChange={handleChange}
                          className="form-control form-control-lg shadow-sm"
                          placeholder="Enter your password"
                          required
                        />
                        {/* <button
                          className="btn btn-outline-secondary "
                          type="button"
                        >
                          <i className="bi bi-eye"></i>
                        </button> */}
                      </div>
                    </div>

                    {/* Remember & Forgot */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="remember"
                        />
                        <label
                          className="form-check-label text-muted"
                          htmlFor="remember"
                        >
                          Remember me
                        </label>
                      </div>
                      {/* <a
                        href="#"
                        className="text-decoration-none text-primary fw-semibold"
                      >
                        Forgot Password?
                      </a> */}
                    </div>

                    {/* Submit */}
                    <div className="d-grid mb-4" style={{ width: "110%" }}>
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg fw-bold py-3 shadow-lg"
                      >
                        <i className="bi bi-box-arrow-in-right me-2"></i>Sign In
                      </button>
                    </div>

                    <div className="text-center">
                      <p className="text-muted mb-0">
                        Don't have an account?{" "}
                        <a
                          href="/signup"
                          className="text-decoration-none fw-bold text-warning"
                        >
                          Sign Up
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
