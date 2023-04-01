// Import necessary modules and components
import React, { useState } from "react";
import styles from "./Form.module.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import GetImage from "../GetImageUrl/GetImage";
import { signupUser } from "../../redux/auth/auth.action";

// Define the SignupForm component
export default function SignupForm() {
  // Set initial states for the component
  const [view1, setView1] = useState(false); // State for showing/hiding password
  const [selectedImage, setSelectedImage] = useState(null); // State for image upload
  const [formData, setFormData] = useState({ // State for form data
    userName: "",
    fullName: "",
    email: "",
    password: "",
    avatar: "https://res.cloudinary.com/dmb6cupsg/image/upload/v1680299712/m03ubqt5helrobvxxzag.jpg", // Set initial value to default image URL
  });

  const [isLoading, setIsLoading] = useState(false); // State for showing loading spinner

  const Navigate = useNavigate(); // Hook for programmatic navigation

  // Handle form input changes
  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      // If the input field is for image upload, set the value to the uploaded file
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      // If not an image upload input, set the value to the input value
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Handle image upload changes
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all form fields are filled out
    if (formData.userName.length > 0 && formData.fullName.length > 0 && formData.email.length > 0 && formData.password.length > 0) {

      // Validate email address using regex
      let reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
      if (!reg.test(formData.email)) {
        alert("Please Enter a valid email");
        return;
      }

      // If all validations pass, set loading state to true and make signupUser API call
      setIsLoading(true);
      let res = await signupUser(formData);
      if (res) {
        setIsLoading(false);
        Navigate("/login"); // Navigate to login page after successful signup
      } else {
        setIsLoading(false);
      }
    }
  };

  // If loading state is true, show loading spinner
  if (isLoading) {
    return (
      <h1>...Loading</h1>
    );
  }

  // If loading state is false, render signup form

  return (
    <div className={styles.box}>
      <div className={styles.child}>
        <div className={styles.sqr}></div>
        <h1>App Name</h1>
        <p className={styles.text}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </p>
        <div className={styles.form_div}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.input_div}>
              <input
                type="text"
                name="userName"
                id="userName"
                className={styles.input}
                placeholder="User Name"
                value={formData.userName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.input_div}>
              {" "}
              <input
                type="text"
                name="fullName"
                id="fullName"
                className={styles.input}
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.input_div}>
              {" "}
              <input
                type="email"
                name="email"
                id="email"
                className={styles.input}
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.input_div}>
              <input
                type={view1 ? "text" : "password"}
                name="password"
                id="password"
                className={styles.input}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {view1 ? (
                <AiFillEye onClick={() => setView1(!view1)} />
              ) : (
                <AiFillEyeInvisible onClick={() => setView1(!view1)} />
              )}
            </div>
            <div className={styles.input_div}>
              <input
                type="file" // Set the type to "file"
                name="image"
                id="image"
                className={styles.input}
                onChange={handleImageChange}
              />
            </div>
            <input type="submit" placeholder="Submit" className={styles.btn} />
          </form>
        </div>
        <div className={styles.text2}>
          <p>
            Already have an account?{" "}
            <Link to="/login">
              <span className={styles.text2_color}>Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
