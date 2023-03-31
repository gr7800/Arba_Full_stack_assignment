import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import SignupForm from '../../components/SignupForm/SignupForm'
import styles from "./Signup.module.css"

export default function Signup() {
  return (
    <div className={styles.main}>
      <Sidebar/>
      <SignupForm/>   
    </div>
  )
}
