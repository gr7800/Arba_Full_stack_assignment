import React, { useState } from "react";
import styles from "./Form.module.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function SignupForm() {
  const [view1, setView1] = useState(false);
  const [view2, setView2] = useState(false);
  return (
    <div className={styles.box}>
      <div className={styles.child}>
        <div className={styles.sqr}></div>
        <h1>App Name</h1>
        <p className={styles.text}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </p>
        <div className={styles.form_div}>
          <form className={styles.form}>
            <div className={styles.input_div}>
              <input
                type="text"
                name="userName"
                id="userName"
                className={styles.input}
                placeholder="User Name"
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
              />
            </div>
            <div className={styles.input_div}>
              <input
                type={view1 ? "text" : "password"}
                name="password"
                id="password"
                className={styles.input}
                placeholder="Password"
              />
              {view1 ? (
                <AiFillEye onClick={() => setView1(!view1)} />
              ) : (
                <AiFillEyeInvisible onClick={() => setView1(!view1)} />
              )}
            </div>
            <div className={styles.input_div}>
              <input
                type={view2 ? "text" : "password"}
                name="cPassword"
                id="cPassword"
                className={styles.input}
                placeholder="Confirm Password"
              />
              {view2 ? (
                <AiFillEye onClick={() => setView2(!view2)} />
              ) : (
                <AiFillEyeInvisible onClick={() => setView2(!view2)} />
              )}
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
