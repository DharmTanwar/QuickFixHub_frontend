import { useEffect, useState } from "react";

function AppLoader({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://quickfixhub-backend.onrender.com/health") 
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "120px" }}>
        <h2>Server starting... ⏳</h2>
        <p>Please wait 10–20 seconds</p>
      </div>
    );
  }

  return children;
}

export default AppLoader;
