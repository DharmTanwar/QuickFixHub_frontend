export default function LandingPage() {
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
          <div className="row align-items-center min-vh-100">
            <div className="col-lg-6">
              <h1 className="display-3 fw-bold mb-4 animate__animated animate__fadeInUp">
                QuickFix Hub
              </h1>
              <p className="lead fs-4 opacity-90 mb-4 animate__animated animate__fadeInUp animate__delay-1s">
                Plumber • Electrician • Painter • Designer • AC Repair •
                <br />
                Carpenter • All Home Services 24/7 Available
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 animate__animated animate__fadeInUp animate__delay-2s">
                <a
                  href="/signup"
                  className="btn btn-warning btn-lg fw-bold px-5 py-3 fs-5 shadow-lg"
                >
                  Get Services Now
                </a>
                <a
                  href="/login"
                  className="btn btn-outline-light btn-lg px-5 py-3 fs-5"
                >
                  Login
                </a>
              </div>
            </div>
            <div className="col-lg-6 text-center animate__animated animate__zoomIn animate__delay-3s">
              <div className="hero-icon" style={{ fontSize: "8rem" }}>
                🔧✨
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold mb-3">Our Services</h2>
            <p className="lead text-muted w-50 mx-auto">
              Trusted professionals for all your home service needs
            </p>
          </div>

          <div className="row g-4">
            {[
              {
                icon: "🔧",
                title: "Plumber",
                desc: "Leakage • Pipeline • Water Pump",
              },
              {
                icon: "⚡",
                title: "Electrician",
                desc: "Wiring • Lights • Panels",
              },
              {
                icon: "🎨",
                title: "Painter",
                desc: "Interior • Exterior • Waterproofing",
              },
              {
                icon: "💻",
                title: "Designer",
                desc: "Interior • Modular • Furniture",
              },
              {
                icon: "❄️",
                title: "AC Repair",
                desc: "Installation • Service • Gas Refill",
              },
              {
                icon: "🔨",
                title: "Carpenter",
                desc: "Furniture • Doors • Kitchen",
              },
            ].map((service, index) => (
              <div
                className="col-lg-4 col-md-6 animate__animated animate__fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card h-100 border-0 shadow-lg hover-shadow-xl transition-all">
                  <div className="card-body text-center p-5">
                    <div className="fs-1 mb-3">{service.icon}</div>
                    <h4 className="card-title fw-bold mb-3">{service.title}</h4>
                    <p className="card-text text-muted">{service.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md-3">
              <h1 className="display-1 fw-bold text-warning">10K+</h1>
              <p className="h5 text-muted">Happy Customers</p>
            </div>
            <div className="col-md-3">
              <h1 className="display-1 fw-bold text-primary">500+</h1>
              <p className="h5 text-muted">Expert Workers</p>
            </div>
            <div className="col-md-3">
              <h1 className="display-1 fw-bold text-success">24/7</h1>
              <p className="h5 text-muted">Service Available</p>
            </div>
            <div className="col-md-3">
              <h1 className="display-1 fw-bold text-danger">99%</h1>
              <p className="h5 text-muted">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5">
        <div className="container text-center">
          <div
            className="bg-warning text-dark p-5 rounded-4 shadow-lg"
            style={{ maxWidth: "600px", margin: "auto" }}
          >
            <h2 className="display-5 fw-bold mb-3">Ready to Fix?</h2>
            <p className="lead mb-4">
              Book your service now - Fast, Reliable, Affordable
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <a href="/signup" className="btn btn-dark btn-lg px-5 py-3 fs-5">
                Book Service Now
              </a>
              <a
                href="/login"
                className="btn btn-outline-dark btn-lg px-5 py-3 fs-5"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
