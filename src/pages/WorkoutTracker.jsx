import { useState, useEffect } from "react";

function WorkoutTracker() {

  const email = localStorage.getItem("email");

  const [exerciseType, setExerciseType] = useState("");
  const [duration, setDuration] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [message, setMessage] = useState("");

  const fetchWorkouts = async () => {
    const response = await fetch(`http://localhost:8080/workouts/${email}`);
    const data = await response.json();
    setWorkouts(data);
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = {
      exerciseType,
      duration: parseInt(duration),
      caloriesBurned: caloriesBurned ? parseInt(caloriesBurned) : null
    };

    const response = await fetch(`http://localhost:8080/workouts/${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(workout)
    });

    if (response.ok) {
      setMessage("Workout added successfully 💪");
      setExerciseType("");
      setDuration("");
      setCaloriesBurned("");
      fetchWorkouts();
    } else {
      setMessage("Failed to add workout");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Workout Tracker 🏋️</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Exercise Type (Cardio, Yoga...)"
          value={exerciseType}
          onChange={(e) => setExerciseType(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Calories Burned (optional)"
          value={caloriesBurned}
          onChange={(e) => setCaloriesBurned(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Add Workout
        </button>
      </form>

      {message && <p>{message}</p>}

      <h3>Your Workouts</h3>

      {workouts.length === 0 ? (
        <p>No workouts logged yet.</p>
      ) : (
        workouts.map((w, index) => (
          <div key={index} style={styles.card}>
            <p><strong>Type:</strong> {w.exerciseType}</p>
            <p><strong>Duration:</strong> {w.duration} mins</p>
            <p><strong>Calories:</strong> {w.caloriesBurned || "N/A"}</p>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "30px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "10px",
    backgroundColor: "#2e7d32",
    color: "white",
    border: "none",
    borderRadius: "5px"
  },
  card: {
    backgroundColor: "#f4f4f4",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "5px"
  }
};

export default WorkoutTracker;