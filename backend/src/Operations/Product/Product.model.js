// Importing the mongoose library
const mongoose = require("mongoose");

// Defining the product schema
let productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

// Creating the Product model using the schema
let ProductModel = mongoose.model("product", productSchema);

// Exporting the Product model
module.exports = ProductModel;