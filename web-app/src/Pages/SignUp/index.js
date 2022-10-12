import axios from 'axios';
import './Styles.css';
import { useEffect, useRef, useState } from 'react';

function SignUp({ User, setUser }) {

    const usernameInput = useRef();
    const passwordInput = useRef();
    const [serverResponse, setServerResponse] = useState("");

    function signUp(){

    }

    function spanAnimation(event) {
        const el = event.target || event.srcElement;
        const el2 = el.nextSibling;
        el2.style.cssText = "font-size: 0.9rem;" +
                            "top: -3.5rem;" +
                            "left: -6.1rem;" +
                            "color: #240047;"+
                            "background-color: white;";
    }

    return (
        <div className="SignUpPage">
            <div className="SignUpContainer">
                <div className="SignUpTitle">Sign Up</div>
                <input  className="SignUpField" 
                        type="text"
                        ref={usernameInput} 
                        onFocus={event=>spanAnimation(event)} 
                />
                <span className="SignUpSpan"> First Name </span>
                <input  className="SignUpField" 
                        type="text"
                        ref={usernameInput} 
                        onFocus={event=>spanAnimation(event)}
                />
                <span className="SignUpSpan"> Last Name</span>
                <input  className="SignUpField" 
                        type="text"
                        ref={usernameInput} 
                        onFocus={event=>spanAnimation(event)}
                />
                <span className="SignUpSpan"> Username </span>
                <input  className="SignUpField" 
                        type="text"
                        ref={usernameInput} 
                        onFocus={event=>spanAnimation(event)}
                />
                <span className="SignUpSpan"> Email </span>
                <input  className="SignUpField"  
                        type="password"
                        ref={usernameInput} 
                        onFocus={event=>spanAnimation(event)}
                />
                <span className="SignUpSpan"> Password </span>

                <button id="signUpButton" onClick={signUp}>Sign Up</button>
                {/*<a href="/login">Login</a> não sei pq não funciona*/}
                
            </div>
        </div>
    );
}

export default SignUp;
