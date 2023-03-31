// Import necessary modules and models
const User = require('../UserAuth/User.model');
const jwt = require('jsonwebtoken');
const CategoryModel = require('./category.model');
require("dotenv").config();

// Controller function to add category to the database
exports.addCategory = async (req, res) => {
    // Get name, slug, and image from the request body
    let { name, slug, image } = req.body;
    // Get the token from the request headers
    let { token } = req.headers;
    // Decode the token to get the user's email using the jwt module
    let decode = jwt.decode(token, process.env.JWT_SECRET);
    try {
        // Find the user with the decoded email using the User model
        let user = await User.findOne({ email: decode.email });
        // Create a new category using the CategoryModel with the provided name, slug, image, and the user's id as the owner
        let createCategory = await CategoryModel.create({
            name,
            slug,
            image,
            owner: user._id,
        });
        // Return a success response with status code 200 and a message
        return res.status(200).send({ status: true, messege: "category added successfully" });
    } catch (error) {
        // Return an error response with status code 401 and a message if there is an error
        return res.status(401).send({ status: false, messege: "something went wrong" });
    }
}

// Controller function to update category in the database
exports.updateCategory = async (req, res) => {
    // Get the updated data from the request body
    let data = req.body;
    // Get the category id from the request parameters
    let { id } = req.params;
    console.log(id);
    try {
        // Find the category with the provided id and update it with the new data using the CategoryModel
        let updateCategory = await CategoryModel.findByIdAndUpdate({ _id: id }, { ...data });
        // Return a success response with status code 200 and a message
        return res.status(200).send({ status: true, messege: "category updated successfully" });
    } catch (error) {
        // Handle error if the category cannot be updated in the database and return an error response with status code 404 and a message
        console.log(error);
        return res.status(404).send({ status: false, messege: "something went wrong" });
    }
}

// Controller function to get all categories from the database
exports.getCategory = async (req, res) => {
    try {
        // Find all categories from the database using the CategoryModel
        let category = await CategoryModel.find();
        // Return a success response with status code 200, a message, and the fetched categories
        return res.status(200).send({ status: true, messege: "Category fetched successfully", result: category });
    } catch (error) {
        // Return an error response with status code 401 and a message if there is an error
        return res.status(401).send({ status: false, messege: "something went wrong" });
    }
}

// This function fetches a single category by its ID
exports.getSingleCategory = async (req, res) => {
    let { id } = req.params; // Get the ID from the request parameters
    try {
        let category = await CategoryModel.findById({ _id: id }); // Find the category by its ID using the CategoryModel
        return res.status(200).send({ status: true, messege: "Category fetched sucesfully", result: category }); // Return the category as a successful response
    } catch (error) {
        return res.status(401).send({ status: false, messege: "something went wrong" }); // Return an error response if something went wrong
    }
}

// This function fetches a category by its name
exports.getCategoryByName = async (req, res) => {
    let { name } = req.query; // Get the name from the query parameters
    console.log(req.query);
    try {
        let category = await CategoryModel.find({ name }); // Find the category by its name using the CategoryModel
        if (category.length === 0) { // If no category was found, return a not found response
            return res.status(404).send({ status: false, messege: "Category not found" });
        } else if (category.length === 1) { // If only one category was found, return it as a successful response
            return res.status(200).send({ status: true, messege: "OK", result: category[0] });
        } else { // If multiple categories were found, return an array of categories as a successful response
            return res.status(200).send({ status: true, messege: "OK", result: category });
        }
    } catch (error) {
        return res.status(500).send({ status: false, messege: "Something went wrong" }); // Return a generic error response if something went wrong
    }
}

// This function deletes a category by its ID
exports.deleteCategoryByid = async (req, res) => {
    let { id } = req.params; // Get the ID from the request parameters
    try {
        let category = await CategoryModel.findByIdAndDelete({ _id: id }); // Find and delete the category by its ID using the CategoryModel
        return res.status(200).send({ status: true, messege: "category deleted successfully" }); // Return a success response if the category was deleted successfully
    } catch (error) {
        console.log(error);
        return res.send({ status: false, messege: "something went wrong" }); // Return an error response if something went wrong
    }
}