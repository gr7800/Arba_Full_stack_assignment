import React, { useState } from "react";
import styles from "./Form.module.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [view, setView] = useState(false);
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
              <input
                type={view ? "text" : "password"}
                name="password"
                id="password"
                className={styles.input}
                placeholder="Password"
              />
              {view ? (
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
