import React, { useState } from "react";
import styles from "./Form.module.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth/auth.action";

export default function LoginForm() {
  const [view, setView] = useState(false); // State for toggling password visibility
  const [formData, setFormData] = useState({ // State for holding form data
    username: "",
    password: "",
  });

  const { loading } = useSelector((store) => store.auth); // Selecting the "loading" state from the Redux store

  const dispatch = useDispatch(); // Creating a dispatch function for Redux actions
  const navigate = useNavigate(); // Creating a navigation function for React Router

  const handleInputChange = (event) => { // Function to handle form input changes
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  if (loading) { // If loading state is true, display loading message
    return <h1>...Loading</h1>;
  }

  const handleSubmit = async (event) => { // Function to handle form submission
    event.preventDefault();
    if (formData.username.length > 0 && formData.password.length > 0) { // If both fields are filled, dispatch the login action
      dispatch(loginUser(formData))
        .then((res) => { // If successful, display success message and navigate to home page
          if (res) {
            alert("Login Sucessfull !");
            navigate("/");
          }
        })
        .catch((error) => { // If unsuccessful, display error message
          alert("Something went wrong");
        });
    } else { // If either field is empty, display error message
      alert("Please fill the credentials properly");
    }
    console.log(formData); // Log the form data for debugging purposes
  };

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
                name="username"
                id="username"
                className={styles.input}
                placeholder="User Name"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.input_div}>
              <input
                type={view ? "text" : "password"}
                name="password"
                id="password"
                className={styles.input}
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
              {view ? ( // Show "eye" icon if password is visible, and "eye slash" icon if password is hidden
                <AiFillEye onClick={() => setView(!view)} />
              ) : (
                <AiFillEyeInvisible onClick={() => setView(!view)} />
              )}
            </div>
            <input type="submit" placeholder="Submit" className={styles.btn} />
          </form>
        </div>
        <div className={styles.text2}>
          <p>
            Already have an account?{" "}
            <Link to="/signup">
              <span className={styles.text2_color}>Signup</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
