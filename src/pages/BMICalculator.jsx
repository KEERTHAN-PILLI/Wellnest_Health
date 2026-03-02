import { useState, useEffect } from "react";

function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [tip, setTip] = useState(null);

  const DAILY_TIPS = [
    { title: "Stay Hydrated", text: "Drink at least 8 glasses of water daily for optimal health.", icon: "💧" },
    { title: "Sleep Well", text: "Aim for 7-8 hours of quality sleep every night.", icon: "😴" },
    { title: "Regular Exercise", text: "Exercise for at least 30 minutes daily to stay fit.", icon: "🏃" },
    { title: "Eat Healthy", text: "Include fruits and vegetables in every meal.", icon: "🥗" },
    { title: "Manage Stress", text: "Practice meditation or yoga for mental wellness.", icon: "🧘" },
    { title: "Walk More", text: "Aim for 10,000 steps per day.", icon: "👟" },
  ];

  useEffect(() => {
    const randomTip = DAILY_TIPS[Math.floor(Math.random() * DAILY_TIPS.length)];
    setTip(randomTip);
  }, []);

  const calculateBMI = () => {
    if (!height || !weight) {
      alert("Please enter both height and weight!");
      return;
    }

    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    const bmiValue = w / (h * h);
    setBmi(bmiValue.toFixed(1));

    let cat = "";
    if (bmiValue < 18.5) cat = "Underweight";
    else if (bmiValue < 25) cat = "Normal Weight";
    else if (bmiValue < 30) cat = "Overweight";
    else cat = "Obese";

    setCategory(cat);
  };

  const handleReset = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setCategory("");
  };

  return (
    <div style={containerStyle}>
      <h1>⚖️ BMI Calculator - Week 5 Milestone</h1>
      <p style={subtitleStyle}>Know your Body Mass Index and stay healthy!</p>

      <div style={cardStyle}>
        <div style={inputGroupStyle}>
          <div style={inputWrapperStyle}>
            <label style={labelStyle}>Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter height in cm"
              style={inputStyle}
            />
          </div>

          <div style={inputWrapperStyle}>
            <label style={labelStyle}>Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight in kg"
              style={inputStyle}
            />
          </div>
        </div>

        <div style={buttonGroupStyle}>
          <button onClick={calculateBMI} style={btnCalculateStyle}>
            📊 Calculate BMI
          </button>
          <button onClick={handleReset} style={btnResetStyle}>
            🔄 Reset
          </button>
        </div>

        {bmi && (
          <div style={resultStyle}>
            <h2>Your BMI: {bmi}</h2>
            <p style={categoryStyle}>
              Status: <span style={getCategoryColor(category)}>{category}</span>
            </p>
            <p style={adviceStyle}>
              {category === "Normal Weight" && "Great! You are in a healthy weight range. Keep it up! 🎉"}
              {category === "Underweight" && "You may need to gain weight. Consult a nutritionist. 🥤"}
              {category === "Overweight" && "Try to increase physical activity and monitor diet. 🏃"}
              {category === "Obese" && "Please consult a healthcare professional for guidance. 🏥"}
            </p>
          </div>
        )}
      </div>

      {tip && (
        <div style={tipCardStyle}>
          <div style={tipHeaderStyle}>
            <h3 style={tipTitleStyle}>{tip.icon} Daily Health Tip</h3>
          </div>
          <p style={tipTextStyle}>{tip.text}</p>
        </div>
      )}
    </div>
  );
}

const containerStyle = {
  padding: "40px",
  maxWidth: "600px",
  margin: "0 auto",
};

const subtitleStyle = {
  textAlign: "center",
  color: "#666",
  marginBottom: "30px",
  fontSize: "16px",
};

const cardStyle = {
  background: "#ffffff",
  borderRadius: "12px",
  padding: "30px",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  marginBottom: "25px",
};

const inputGroupStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "15px",
  marginBottom: "20px",
};

const inputWrapperStyle = {
  display: "flex",
  flexDirection: "column",
};

const labelStyle = {
  marginBottom: "8px",
  fontWeight: "600",
  color: "#333",
  fontSize: "14px",
};

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "2px solid #e0e0e0",
  fontSize: "14px",
  transition: "border-color 0.3s",
};

const buttonGroupStyle = {
  display: "flex",
  gap: "10px",
  justifyContent: "center",
  marginBottom: "20px",
};

const btnCalculateStyle = {
  padding: "12px 25px",
  backgroundColor: "#1e40af",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const btnResetStyle = {
  padding: "12px 25px",
  backgroundColor: "#64748b",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const resultStyle = {
  background: "#f0f9ff",
  padding: "20px",
  borderRadius: "8px",
  marginTop: "20px",
  textAlign: "center",
  borderLeft: "4px solid #1e40af",
};

const categoryStyle = {
  fontSize: "16px",
  marginTop: "10px",
};

const adviceStyle = {
  marginTop: "10px",
  fontSize: "14px",
  color: "#555",
  fontStyle: "italic",
};

const getCategoryColor = (category) => ({
  color:
    category === "Normal Weight"
      ? "#22c55e"
      : category === "Underweight"
      ? "#f59e0b"
      : category === "Overweight"
      ? "#ff6b6b"
      : "#dc2626",
  fontWeight: "bold",
});

const tipCardStyle = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  borderRadius: "12px",
  padding: "25px",
  color: "white",
  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
};

const tipHeaderStyle = {
  marginBottom: "15px",
};

const tipTitleStyle = {
  fontSize: "18px",
  fontWeight: "700",
  margin: "0",
};

const tipTextStyle = {
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0",
};

export default BMICalculator;
