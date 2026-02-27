import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password: password,
          role: role
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Registration failed");
      }

      const data = await response.json();

      setMessage("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);

    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Cannot connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create Account 🌱💪</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={styles.input}
        />

        <div style={styles.radioContainer}>
          <label>
            <input
              type="radio"
              value="USER"
              checked={role === "USER"}
              onChange={(e) => setRole(e.target.value)}
            />
            User
          </label>

          <label style={{ marginLeft: "20px" }}>
            <input
              type="radio"
              value="TRAINER"
              checked={role === "TRAINER"}
              onChange={(e) => setRole(e.target.value)}
            />
            Trainer
          </label>
        </div>

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {message && <p style={styles.success}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    maxWidth: "400px",
    margin: "auto",
    textAlign: "center"
  },
  heading: {
    marginBottom: "20px"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px"
  },
  radioContainer: {
    marginBottom: "15px",
    textAlign: "left"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#2e7d32",
    color: "white",
    border: "none",
    cursor: "pointer"
  },
  success: {
    color: "green",
    marginTop: "10px"
  },
  error: {
    color: "red",
    marginTop: "10px"
  }
};

export default Register;