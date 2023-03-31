// Load environment variables from .env file
require("dotenv").config();

// Import required packages
const express = require('express');
const connect = require('./config/db');
const cors = require('cors');

// Set port number
const PORT = process.env.PORT || 8080;

// Create an instance of express
const app = express();

// Import routes
const UserRoutes = require('./Operations/UserAuth/User.route');
const ProductRoutes = require('./Operations/Product/Product.route');
const CategoryRoutes = require("./Operations/category/category.route");

// Import middleware for protecting routes
const AuthenticationMedilware = require('./Middleware/Authentication.Middleware');

// Enable CORS for all origins
app.use(cors({ origin: true, credentials: true }));

// Parse JSON request bodies
app.use(express.json());

// Routes
app.use('/user', UserRoutes);
app.use(AuthenticationMedilware); // Middleware for protecting routes
app.use('/product', ProductRoutes);
app.use('/category',CategoryRoutes);

// Connect to database and start server
app.listen(PORT||8080, async () => {
  await connect();
  console.log(`running at http://localhost:${PORT}`);
});
