import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import LoginForm from '../../components/SignupForm/LoginForm'
// import SignupForm from '../../components/SignupForm/SignupForm'
import styles from "./Login.module.css"

export default function Login() {
  return (
    <div className={styles.main}>
        <Sidebar/>
        <LoginForm/>        
    </div>
  )
}
