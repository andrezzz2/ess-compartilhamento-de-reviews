import axios from 'axios';
import './Styles.css';
import { useEffect, useRef, useState } from 'react';


function Login({ User, setUser }) {

    const usernameInput = useRef();
    const passwordInput = useRef();
    const [serverResponse, setServerResponse] = useState("");

    if(User) {
        window.location.href = "http://localhost:3000";
    }

    function login(){
        if(!User){

            axios.post('http://localhost:8080/login', {username: usernameInput.current.value, password: passwordInput.current.value}).then((response)=>{
                
                setServerResponse(response.data.message);

                if(response.data.user){
                    localStorage.setItem("x-access-token", response.data.accessToken);
                    localStorage.setItem("x-refresh-token", response.data.refreshToken);
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    setUser(response.data.user);
                }
                
            });
            
        } else {
            window.location.href = "http://localhost:3000";
        }

    };

    function spanAnimation(event) {
        const el = event.target || event.srcElement;
        const el2 = el.nextSibling;
        el2.style.cssText = "font-size: 0.9rem;" +
                      "top: -4rem;" +
                      "left: -10rem;" +
                      "color: #240047;";
    }

    useEffect(()=>{
        usernameInput.current.addEventListener('keyup', function(e){
            let key = e.which || e.keyCode;
            if (key === 9) { // codigo da tecla enter
              login();
            }
        });
        passwordInput.current.addEventListener('keyup', function(e){
            let key = e.which || e.keyCode;
            if (key === 9) { // codigo da tecla enter
              login();
            }
        });
    }, []);

    return (
        <div className="LoginPage">
            <div className="LoginContainer">
                <div className="LoginTitle">Login</div>
                <input className="loginField" 
                       type="text" 
                       ref={usernameInput} 
                       onFocus={event=>spanAnimation(event)}
                />
                <span className="loginSpan"> Username </span>
                <input className="loginField" 
                       type="password" 
                       ref={passwordInput} 
                       onFocus={event=>spanAnimation(event)}
                />
                <span className="loginSpan"> Password </span>
                <p>{serverResponse}</p>
                <button id="loginButton" onClick={login}>Login</button>
                <a href="/signUp">Sign up</a>
            </div>
        </div>
    );
}

export default Login;
