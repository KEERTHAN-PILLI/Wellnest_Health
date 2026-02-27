import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>WellNest</h2>

      <div style={styles.links}>
        <Link to="/">Home</Link>

        {role === "TRAINER" ? (
          <>
            <Link to="/trainer-dashboard">Dashboard</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/physical-health">Physical Health</Link>
            <Link to="/nutrition">Nutrition</Link>
            <Link to="/weekly-summary">Weekly Summary</Link>
          </>
        )}

        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#2f3e46",
    color: "white",
  },
  logo: {
    margin: 0,
  },
  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  logout: {
    backgroundColor: "#e63946",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Navbar;