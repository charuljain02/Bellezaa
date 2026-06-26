import { useState } from "react";

const QuizForm = ({ onSubmit }) => {

  const [formData, setFormData] =
    useState({
      sleepHours: "",
      waterIntake: "",
      sunscreenUsage: false,
      stressLevel: "",
      workoutFrequency: "",
      routineConsistency: "",
    });

  const handleChange = (e) => {

    const { name, value, type, checked } =
      e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3"
    >

      <input
        type="number"
        name="sleepHours"
        placeholder="Sleep Hours"
        onChange={handleChange}
      />

      <input
        type="number"
        name="waterIntake"
        placeholder="Water Intake"
        onChange={handleChange}
      />

      <label>
        Sunscreen Used?
      </label>

      <input
        type="checkbox"
        name="sunscreenUsage"
        onChange={handleChange}
      />

      <input
        type="number"
        name="stressLevel"
        placeholder="Stress Level"
        onChange={handleChange}
      />

      <input
        type="number"
        name="workoutFrequency"
        placeholder="Workout Frequency"
        onChange={handleChange}
      />

      <input
        type="number"
        name="routineConsistency"
        placeholder="Routine Consistency"
        onChange={handleChange}
      />

      <button type="submit">
        Calculate Glow Score
      </button>

    </form>
  );
};

export default QuizForm;