// Importing the React library and the CSS module for the sidebar component.
import React from "react";
import styles from "./Sidebar.module.css";

// Sidebar component definition.
export default function Sidebar() {
  // Rendering the sidebar component with a div element having a className of "box" defined in the CSS module.
  return <div className={styles.box}></div>;
}
