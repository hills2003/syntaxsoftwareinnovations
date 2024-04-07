"use client"
import React, { useContext } from 'react'
import styles from "../page.module.css";
import Image from "next/image";
import { Button, Flex } from 'antd';
import { LoginContext } from '../AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../firebaseConfig';
function SignupComponent() {

    const {signup} = useContext(LoginContext)
    const {user} = useContext(LoginContext)
  return (
    <div className={styles.mainLogin}>
        <div className={styles.container}>
             <nav className={styles.header}>
             <Image
              className={styles.logo}
              src="/logo.svg"
              alt="SyntaxSoftwareInnovations Logo"
              width={180}
              height={37}
              priority
            />

            <div className={styles.right}>
              <div className={styles.login} onClick={()=>{
                
                const auth = getAuth(app);
                signOut(auth).then(() => {
                  // Sign-out successful.
                  console.group('successful')
                }).catch((error) => {
                  // An error happened.
                  console.log(error)
                });
              }}>LOGIN</div>
              
            </div>
             </nav>
        </div>

        <div className={styles.loginCard}>
           <Image
              className={styles.logo}
              src="/Google.svg"
              alt="Google Logo"
              width={180}
              height={37}
              priority
              style={{cursor:"pointer",width:'250px',height:'50px'}}
              onClick={signup}
            />
            
        </div>
    </div>
  )
}

export default SignupComponent