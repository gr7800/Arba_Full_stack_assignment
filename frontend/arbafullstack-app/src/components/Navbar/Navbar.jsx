import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {

  }

  return (
    <div className={styles.nav}>
      <div className={styles.logo}>
        <p>Logo</p>
      </div>
      <div className={styles.bx_1}>
        <div className={styles.cartvalue}>
          <FaShoppingCart color="#24bed1" size={"3em"} />
        </div>
        <div className={styles.count}>
          <p>0</p>
        </div>
        <div className={styles.dropdown}>
          <img
            src="https://avatars.githubusercontent.com/u/97174581?v=4"
            alt="error"
            className={styles.img}
            onClick={toggleMenu}
          />
          {showMenu && (
            <div className={styles.dropdownContent}>
              <Link to={"/mystore"}>My Store</Link>
              <Link to="/profile">Profile</Link>
              <Link onClick={handleLogout}>Logout</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
