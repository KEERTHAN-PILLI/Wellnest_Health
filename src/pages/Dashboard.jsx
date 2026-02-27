import { Link } from "react-router-dom";
import { useEffect } from "react";

function Dashboard() {

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={containerStyle}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Health Dashboard 📊</h1>
        <button onClick={handleLogout} style={logoutBtn}>
          Logout
        </button>
      </div>

      <div style={gridStyle}>
        <Link to="/physical-health" style={cardStyle}>
          <h2>💪 Physical Health</h2>
          <p>Steps, Water, Sleep, Calories</p>
        </Link>

        <Link to="/nutrition" style={cardStyle}>
          <h2>🥗 Nutrition</h2>
          <p>Daily food & calorie tracking</p>
        </Link>

        <Link to="/mental-wellness" style={cardStyle}>
          <h2>🧠 Mental Wellness</h2>
          <p>Mood & stress monitoring</p>
        </Link>

        <Link to="/weekly-summary" style={cardStyle}>
          <h2>📅 Weekly Summary</h2>
          <p>Overall health report</p>
        </Link>
      </div>
    </div>
  );
}

/* Styles */

const containerStyle = {
  padding: "40px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "25px",
};

const cardStyle = {
  textDecoration: "none",
  color: "#000",
  background: "#ffffff",
  padding: "25px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const logoutBtn = {
  padding: "8px 15px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#ff4d4d",
  color: "#fff",
  cursor: "pointer",
};

export default Dashboard;