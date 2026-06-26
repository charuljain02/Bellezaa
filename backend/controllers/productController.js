import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const { skinType, concern } = req.query;

    let query = {};

    // If both provided, filter by both
    if (skinType && concern) {
      query = { skinType, concern };
    }
    // If only skinType, show all products for that skin type
    else if (skinType) {
      query = { skinType };
    }
    // If only concern, show all products for that concern
    else if (concern) {
      query = { concern };
    }
    // If nothing provided, return all products
    // else query = {}

    const products = await Product.find(query);

    if (!products.length) {
      return res.status(404).json({ message: "No products found." });
    }

    res.json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};