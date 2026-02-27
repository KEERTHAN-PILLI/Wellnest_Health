import { useEffect, useState } from "react";

function TrainerDashboard() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/trainer/dashboard")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setUsersData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("Unable to load trainer dashboard.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading trainer dashboard...</h2>;
  }

  if (error) {
    return <h2 style={{ padding: "20px", color: "red" }}>{error}</h2>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Trainer Dashboard 🏋️</h2>

      {usersData.length === 0 && (
        <p>No users found.</p>
      )}

      {usersData.map((user, index) => (
        <div key={index} style={styles.card}>
          <h3 style={styles.userName}>{user.name}</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>

          <div style={styles.section}>
            <h4>Physical Health Data</h4>
            {user.physicalHealthData?.length > 0 ? (
              <pre style={styles.pre}>
                {JSON.stringify(user.physicalHealthData, null, 2)}
              </pre>
            ) : (
              <p>No physical health records.</p>
            )}
          </div>

          <div style={styles.section}>
            <h4>Nutrition Data</h4>
            {user.nutritionData?.length > 0 ? (
              <pre style={styles.pre}>
                {JSON.stringify(user.nutritionData, null, 2)}
              </pre>
            ) : (
              <p>No nutrition records.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    maxWidth: "1000px",
    margin: "auto",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "28px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
  userName: {
    marginBottom: "10px",
  },
  section: {
    marginTop: "15px",
  },
  pre: {
    backgroundColor: "#eee",
    padding: "10px",
    borderRadius: "6px",
    overflowX: "auto",
  },
};

export default TrainerDashboard;
