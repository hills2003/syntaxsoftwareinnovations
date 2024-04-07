"use client"
import React, { useState } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {app} from "./firebaseConfig"
export const LoginContext = React.createContext() 
export const DataContext = React.createContext() 
export const UpdaterContext = React.createContext() 

function AuthContext({children}) {

    const auth = getAuth(app);
    const user = auth.currentUser;
    const [place,setPlace] = useState("")

    const signup = () =>{
       

        
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
    }

    let obj = {
        signup,
        user:user
    }
  return (
    <UpdaterContext.Provider value={setPlace}>
    <DataContext.Provider value={place}>
    <LoginContext.Provider value={obj}>
        {children}
    </LoginContext.Provider>
    </DataContext.Provider>
    </UpdaterContext.Provider>
  )
}

export default AuthContext