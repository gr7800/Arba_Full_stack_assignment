// Import Mongoose library
const mongoose = require("mongoose");

// Define Category schema
let categorySchema = new mongoose.Schema({
    name: {
        type: String, // Define the field data type
        required: true // Specify that the field is required
    },
    slug: {
        type: String, // Define the field data type
        required: true // Specify that the field is required
    },
    image: {
        type: String, // Define the field data type
        required: true // Specify that the field is required
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, // Define the field data type as an ObjectId
        ref: "user" // Specify the reference model for the field
    },
});

// Create a model based on the Category schema
let CategoryModel = mongoose.model("category", categorySchema);

// Export the Category model for use in other modules
module.exports = CategoryModel;