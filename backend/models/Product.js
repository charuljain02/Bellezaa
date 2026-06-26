import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

  name: String,

  brand: String,

  skinType: String,

  concern: String,

  ingredients: [String],

  benefits: [String],

  rating: Number,

});

export default mongoose.model(
  "Product",
  productSchema
);