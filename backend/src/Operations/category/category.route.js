// This is an Express router for the Product API endpoints.
const express = require("express");
const app = express.Router();

// Import the Product controller functions
const { deleteCategoryByid, addCategory, updateCategory, getCategory, getSingleCategory, getCategoryByName } = require("./category.controller");

// GET endpoint to fetch all products
app.post('/add', addCategory)
app.patch("/update/:id",updateCategory)
app.get("/get",getCategory)
app.get("/get/:id",getSingleCategory)
app.get("/get/filtersort",getCategoryByName)
app.delete("/delete/:id",deleteCategoryByid)

// Export the router as a module
module.exports = app;