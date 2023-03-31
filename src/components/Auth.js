import React from 'react';
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth"
import Cookies from "universal-cookie";
const cookies = new Cookies()

const Auth = (props) => {
    const { setIsAuth } = props
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.refreshToken)
            setIsAuth(true)
        } catch (err) {
            console.error(err)
        }
    }

        return (
        <div className="auth">
            <p> Sign in with Google to continue </p>
            <button onClick={signInWithGoogle}>Sign In With Google </button>
        </div>
    );
};

export default Auth;
