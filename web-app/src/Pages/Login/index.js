import axios from 'axios';
import './Styles.css';
import { useEffect, useRef, useState } from 'react';


function Login({ User, setUser }) {

    const usernameInput = useRef();
    const passwordInput = useRef();
    const [serverResponse, setServerResponse] = useState("");

    if(User) window.location.href = "http://localhost:3000";

    function login(){

        axios.post('http://localhost:8080/login', {username: usernameInput.current.value, password: passwordInput.current.value}).then((response)=>{
            
            setServerResponse(response.data.responseObject.message);

            if(response.data.responseObject.user){  //operação de login deu certo

                localStorage.setItem("x-access-token", response.data.responseObject.accessToken);
                localStorage.setItem("x-refresh-token", response.data.responseObject.refreshToken);
                localStorage.setItem("user", JSON.stringify(response.data.responseObject.user));
                setUser(response.data.responseObject.user);

            }
            
        });

    };

    function spanAnimation(event) {
        const el = event.target || event.srcElement;
        const el2 = el.nextSibling;
        el2.style.cssText = "font-size: 0.9rem;" +
                            "top: -3.5rem;" +
                            "left: -6.1rem;" +
                            "color: #240047;"+
                            "background-color: white;";
    }

    useEffect(()=>{
        usernameInput.current.addEventListener('keyup', function(e){
            let key = e.which || e.keyCode;
            if (key === 13) { // codigo da tecla enter
              login();
            }
        });
        passwordInput.current.addEventListener('keyup', function(e){
            let key = e.which || e.keyCode;
            if (key === 13) { // codigo da tecla enter
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
