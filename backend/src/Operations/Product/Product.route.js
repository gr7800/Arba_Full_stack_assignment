// This is an Express router for the Product API endpoints.
const express = require("express");
const app = express.Router();

// Import the Product controller functions
const { addProduct, updateProduct, getProduct, getSingleProduct, deleteProductByid } = require('./Product.controller')

// GET endpoint to fetch all products
app.post('/add', addProduct)
app.patch("/update/:id",updateProduct)
app.get("/get",getProduct)
app.get("/get/:id",getSingleProduct)
app.delete("/delete/:id",deleteProductByid)

// Export the router as a module
module.exports = app;