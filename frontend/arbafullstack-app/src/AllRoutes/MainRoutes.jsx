// This code defines the routes for the main application
import { Route, Routes } from "react-router-dom";

// Importing the necessary pages for the routes
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Home from "../pages/HomePage/Home";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import MyStore from "../pages/MyStore/MyStore";
import PrivateRoutes from "./PrivateRoute"; // Custom private route component for authentication
import CartPage from "../pages/CartPage/CartPage";

// Defining the main routes using the React Router Routes component
export default function MainRoutes() {
  return (
    <Routes>
      {/* Route for the home page, which is protected by the PrivateRoutes component */}
      <Route path="/" element={<PrivateRoutes><Home /></PrivateRoutes>}></Route>
      <Route path="/signup" element={<Signup />}></Route> // Route for the signup page
      <Route path="/login" element={<Login />}></Route> // Route for the login page
      <Route path="/profile" element={<ProfilePage />}></Route> // Route for the profile page
      <Route path="/mystore" element={<MyStore />}></Route> // Route for the user's store page
      <Route path="/cartpage" element={<CartPage />}></Route> // Route for the cart page
    </Routes>
  );
}