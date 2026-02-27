import React, { useState } from "react";
import { saveNutritionData } from "../api/api";

const Nutrition = () => {
  const [formData, setFormData] = useState({
    mealType: "",
    foodItem: "",
    quantity: "",
    calories: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await saveNutritionData(formData);
      alert("Nutrition Data Saved Successfully!");

      setFormData({
        mealType: "",
        foodItem: "",
        quantity: "",
        calories: "",
        date: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      console.error(error);
      alert("Error saving data");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>Nutrition Tracker</h2>

        <input
          type="text"
          name="mealType"
          placeholder="Meal Type (Breakfast/Lunch)"
          value={formData.mealType}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="foodItem"
          placeholder="Food Item"
          value={formData.foodItem}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="number"
          name="calories"
          placeholder="Calories"
          value={formData.calories}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Save
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
  },
  form: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    width: "350px",
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    marginBottom: "15px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#205d24",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },
};

export default Nutrition;