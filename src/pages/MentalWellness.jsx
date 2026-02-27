import { useState } from "react";
import { saveMentalWellnessData } from "../api/api";

function MentalWellness() {
  const [mood, setMood] = useState("");
  const [stressLevel, setStressLevel] = useState("");
  const [meditationMinutes, setMeditationMinutes] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (stressLevel < 0 || meditationMinutes < 0) {
      setMessage("Values must be positive ❌");
      return;
    }

    const payload = {
      mood,
      stressLevel: Number(stressLevel),
      meditationMinutes: Number(meditationMinutes),
      date: new Date(),
    };

    try {
      await saveMentalWellnessData(payload);
      setMessage("Mental wellness data saved ✅");
    } catch (err) {
      console.warn("Backend not connected yet");
    }

    setMood("");
    setStressLevel("");
    setMeditationMinutes("");
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2>🧠 Mental Wellness Tracker</h2>

        <form onSubmit={handleSubmit}>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            required
            style={inputStyle}
          >
            <option value="">Select Mood</option>
            <option value="Happy">😊 Happy</option>
            <option value="Neutral">😐 Neutral</option>
            <option value="Sad">😔 Sad</option>
            <option value="Stressed">😣 Stressed</option>
          </select>

          <input
            type="number"
            min="0"
            max="10"
            placeholder="Stress Level (0-10)"
            value={stressLevel}
            onChange={(e) => setStressLevel(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="number"
            min="0"
            placeholder="Meditation Minutes"
            value={meditationMinutes}
            onChange={(e) => setMeditationMinutes(e.target.value)}
            required
            style={inputStyle}
          />

          <button style={btnStyle}>Submit</button>
        </form>

        {message && (
          <p style={{ marginTop: "20px", color: "green" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "85vh",
};

const cardStyle = {
  background: "white",
  padding: "40px",
  borderRadius: "12px",
  width: "400px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
  textAlign: "center",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
};

const btnStyle = {
  width: "100%",
  padding: "10px",
  background: "#2e7d32",
  color: "white",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
};

export default MentalWellness;