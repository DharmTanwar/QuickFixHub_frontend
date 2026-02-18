import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Booking from "./pages/Booking";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/booking" element={<Booking/>}/>
          <Route
            path="*"
            element={
              <div className="container py-5 text-center">
                <h1 className="display-4 text-muted">404 - Page Not Found</h1>
                <p className="lead">This Page is UnderWorking...</p>
                <a href="/" className="btn btn-warning btn-lg">
                  ← Go Home
                </a>
              </div>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
