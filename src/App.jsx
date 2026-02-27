import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Pages
import Login from "./pages/login";
import ForgetPassword from "./pages/ForgetPassword";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PhysicalHealth from "./pages/PhysicalHealth";
import Nutrition from "./pages/Nutrition";
import Mentalwellness from "./pages/MentalWellness";
import WeeklySummary from "./pages/WeeklySummary";
import TrainerDashboard from "./pages/TrainerDashboard";
import WorkoutTracker from "./pages/WorkoutTracker";

// ==================== Navbar Component ====================
function Navbar({ isLoggedIn, setIsLoggedIn }) {

  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>WellNest</div>

      <ul style={styles.navLinks}>
        <li>
          <Link to="/" style={styles.link}>Home</Link>
        </li>

        {isLoggedIn && role === "USER" && (
          <>
            <li>
              <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            </li>
            <li>
              <Link to="/physical-health" style={styles.link}>Physical Health</Link>
            </li>
            <li>
              <Link to="/nutrition" style={styles.link}>Nutrition</Link>
            </li>
            <li>
              <Link to="/mental-wellness" style={styles.link}>Mental Wellness</Link>
            </li>
            <li>
              <Link to="/workout-tracker" style={styles.link}>Workout Tracker</Link>
            </li>
            <li>
              <Link to="/weekly-summary" style={styles.link}>Weekly Summary</Link>
            </li>
            <li>
              <button onClick={handleLogout} style={styles.logoutButton}>
                Logout
              </button>
            </li>
          </>
        )}

        {isLoggedIn && role === "TRAINER" && (
          <>
            <li>
              <Link to="/trainer-dashboard" style={styles.link}>
                Trainer Dashboard
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} style={styles.logoutButton}>
                Logout
              </button>
            </li>
          </>
        )}

        {!isLoggedIn && (
          <>
            <li>
              <Link to="/login" style={styles.link}>Login</Link>
            </li>
            <li>
              <Link to="/register" style={styles.link}>Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

// ==================== Home ====================
function Home() {
  return (
    <main style={styles.homeContainer}>
      <h1>Your Health, Our Priority 🫀💚</h1>
      <p>Track your fitness, nutrition, and wellness easily.</p>
    </main>
  );
}

// ==================== Footer ====================
function Footer() {
  return (
    <footer style={styles.footer}>
      © {new Date().getFullYear()} WellNest. All Rights Reserved.
    </footer>
  );
}

// ==================== App ====================
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const role = localStorage.getItem("role");

  return (
    <div style={styles.appContainer}>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <div style={styles.content}>
        <Routes>

          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />

          {/* USER Protected */}
          <Route
            path="/dashboard"
            element={isLoggedIn && role === "USER" ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/physical-health"
            element={isLoggedIn && role === "USER" ? <PhysicalHealth /> : <Navigate to="/login" />}
          />
          <Route
            path="/nutrition"
            element={isLoggedIn && role === "USER" ? <Nutrition /> : <Navigate to="/login" />}
          />
          <Route
            path="/mental-wellness"
            element={isLoggedIn && role === "USER" ? <Mentalwellness /> : <Navigate to="/login" />}
          />
          <Route
            path="/weekly-summary"
            element={isLoggedIn && role === "USER" ? <WeeklySummary /> : <Navigate to="/login" />}
          />
          <Route
            path="/workout-tracker"
            element={isLoggedIn && role === "USER" ? <WorkoutTracker /> : <Navigate to="/login" />}
          />

          {/* TRAINER Protected */}
          <Route
            path="/trainer-dashboard"
            element={isLoggedIn && role === "TRAINER" ? <TrainerDashboard /> : <Navigate to="/login" />}
          />

        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;

// ==================== Styles ====================
const styles = {
  appContainer: { minHeight: "100vh", display: "flex", flexDirection: "column" },
  content: { flex: 1, padding: "20px" },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#2c3e50",
  },
  logo: { color: "#fff", fontSize: "1.5rem", fontWeight: "bold" },
  navLinks: { listStyle: "none", display: "flex", gap: "1.5rem", alignItems: "center" },
  link: { color: "#fff", textDecoration: "none" },
  logoutButton: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    borderRadius: "5px",
  },
  homeContainer: { padding: "40px", textAlign: "center" },
  footer: {
    padding: "1rem",
    textAlign: "center",
    backgroundColor: "#2c3e50",
    color: "#fff",
  },
};