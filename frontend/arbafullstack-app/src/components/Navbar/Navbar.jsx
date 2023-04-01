import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/auth.action";

export default function Navbar() {
  // State for showing/hiding dropdown menu
  const [showMenu, setShowMenu] = useState(false);

  // Redux dispatch function for logging out user
  const dispatch = useDispatch();

  // Get cart data from local storage, or empty object if not available
  const cart = JSON.parse(localStorage.getItem("cartdata")) || {};

  // Default profile image for logged-in user
  let profileImage = "https://avatars.githubusercontent.com/u/97174581?v=4";

  // Count number of items in cart
  let totalcart = Object.keys(cart).length || 0;

  // Get user information from local storage, if available
  let users = JSON.parse(localStorage.getItem("userres"));

  // If user information is available, use their profile image
  if (users && users.length > 0) {
    profileImage = users.userpersent.avatar;
  }

  // Function to toggle dropdown menu
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Function to handle logout
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.nav}>
      {/* Logo */}
      <div className={styles.logo}>
        <Link to={"/"}>
          <img
            src={"https://logos.flamingtext.com/City-Logos/Arba-Logo.png"}
            alt="logo"
            width={"100%"}
          />
        </Link>
      </div>
      {/* Cart icon and count */}
      <div className={styles.bx_1}>
        <Link to={"/cartpage"}>
          <div className={styles.cartvalue}>
            <FaShoppingCart color="#24bed1" size={"3em"} />
          </div>
        </Link>
        <div className={styles.count}>
          <p>{totalcart}</p>
        </div>
        {/* Dropdown menu */}
        <div className={styles.dropdown}>
          <img
            src={profileImage}
            alt="error"
            className={styles.img}
            onClick={toggleMenu}
          />
          {/* Show dropdown menu if toggle is true */}
          {showMenu && (
            <div className={styles.dropdownContent}>
              <Link to={"/mystore"}>My Store</Link>
              <Link to="/profile">Profile</Link>
              {/* Logout button */}
              <Link to="/login" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
