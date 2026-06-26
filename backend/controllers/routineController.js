import Routine from "../models/Routine.js";
import Product from "../models/Product.js";


export const generateRoutine = async (req, res) => {
  try {
    const { skinType, concern } = req.body;

    if (!skinType || !concern) {
      return res.status(400).json({ message: "skinType and concern are required." });
    }

    let morningRoutine = [];
    let nightRoutine = [];

    if (skinType === "oily") {
      morningRoutine = ["Cleanser", "Niacinamide Serum", "Moisturizer", "Sunscreen SPF50"];
      nightRoutine = ["Cleanser", "Salicylic Acid", "Moisturizer"];
    }

    else if (skinType === "dry") {
      morningRoutine = ["Hydrating Cleanser", "Hyaluronic Acid Serum", "Moisturizer", "Sunscreen"];
      nightRoutine = ["Hydrating Cleanser", "Ceramide Cream", "Face Oil"];
    }

    else if (skinType === "combination") {
      morningRoutine = ["Gentle Cleanser", "Niacinamide Serum", "Light Moisturizer", "Sunscreen SPF50"];
      nightRoutine = ["Gentle Cleanser", "BHA Exfoliant", "Moisturizer"];
    }

    else if (skinType === "sensitive") {
      morningRoutine = ["Gentle Cleanser", "Centella Serum", "Barrier Moisturizer", "Mineral Sunscreen"];
      nightRoutine = ["Gentle Cleanser", "Calming Toner", "Ceramide Moisturizer"];
    }

    else if (skinType === "normal") {
      morningRoutine = ["Cleanser", "Vitamin C Serum", "Moisturizer", "Sunscreen SPF50"];
      nightRoutine = ["Cleanser", "Retinol Serum", "Moisturizer"];
    }

    else {
      return res.status(400).json({ message: `Unknown skinType: ${skinType}` });
    }

    const routine = await Routine.create({
      userId: req.user._id,
      skinType,
      concern,
      morningRoutine,
      nightRoutine,
    });

    res.status(201).json(routine);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyRoutines = async (req, res) => {
  try {
    const routines = await Routine.find({ userId: req.user._id })
      .populate(["morningRoutine", "nightRoutine"]);

    res.json(routines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};