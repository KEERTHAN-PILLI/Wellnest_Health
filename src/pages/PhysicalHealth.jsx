import { useState } from "react";
import { savePhysicalHealthData } from "../api/api";

function PhysicalHealth() {
  const [steps, setSteps] = useState("");
  const [water, setWater] = useState("");
  const [sleep, setSleep] = useState("");
  const [calories, setCalories] = useState(null);
  const [error, setError] = useState("");

  const calculateCalories = (steps) => {
    return Math.round(steps * 0.04);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const stepsNum = Number(steps);
    const waterNum = Number(water);
    const sleepNum = Number(sleep);

    if (stepsNum < 0 || waterNum < 0 || sleepNum < 0) {
      setError("Values must be 0 or positive only ❌");
      return;
    }

    const calculatedCalories = calculateCalories(stepsNum);
    setCalories(calculatedCalories);

    const payload = {
      steps: stepsNum,
      water: waterNum,
      sleep: sleepNum,
      calories: calculatedCalories,
      date: new Date(),
    };

    try {
      await savePhysicalHealthData(payload);
      alert("Physical health data saved ✅");
    } catch (err) {
      console.warn("Backend not connected yet");
    }

    setSteps("");
    setWater("");
    setSleep("");
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2>💪 Physical Health Tracker</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            min="0"
            placeholder="Daily Steps 🚶"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="number"
            min="0"
            step="0.1"
            placeholder="Water Intake (liters) 💧"
            value={water}
            onChange={(e) => setWater(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="number"
            min="0"
            step="0.1"
            placeholder="Sleep Hours 😴"
            value={sleep}
            onChange={(e) => setSleep(e.target.value)}
            required
            style={inputStyle}
          />

          <button style={btnStyle}>Submit</button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {calories !== null && !error && (
          <h3 style={{ marginTop: "20px" }}>
            🔥 Calories Burned: {calories}
          </h3>
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

export default PhysicalHealth;