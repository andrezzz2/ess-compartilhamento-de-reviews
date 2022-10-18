import axios from 'axios';
import './Styles.css';
import { useEffect, useRef, useState } from 'react';


function Login({ User, setUser }) {

    const usernameInput = useRef();
    const passwordInput = useRef();
    const [serverResponse, setServerResponse] = useState("");

    if(User) window.location.href = "http://localhost:3000";

    function login(){

        if(usernameInput.current.value==="" || passwordInput.current.value===""){
            setServerResponse("Os campos de usuário e senha devem estar preenchidos");
        } else {

            axios.post('http://localhost:8080/login', {username: usernameInput.current.value, password: passwordInput.current.value}).then((response)=>{
            
                setServerResponse(response.data.responseObject.message);

                if(response.data.responseObject.user){  //operação de login deu certo

                    localStorage.setItem("x-access-token", response.data.responseObject.accessToken);
                    localStorage.setItem("x-refresh-token", response.data.responseObject.refreshToken);
                    localStorage.setItem("user", JSON.stringify(response.data.responseObject.user));
                    setUser(response.data.responseObject.user);

                }
                
            }).catch(erro=>{
                console.error(erro.toJSON());
            });

        } 

    };

    function spanAnimation(event) {
        const el = event.target || event.srcElement;
        const el2 = el.nextSibling;
        el2.style.cssText = "font-size: 0.9rem;" +
                            "top: -0.7rem;" +
                            "left: 0.5rem;" +
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

                <div className="FloatInput">
                    <input className="LoginField" 
                        type="text" 
                        ref={usernameInput} 
                        onFocus={event=>spanAnimation(event)}
                    />
                    <span className="LoginSpan"> Username </span>
                </div>

                <div className="FloatInput">
                    <input className="LoginField" 
                        type="password" 
                        ref={passwordInput} 
                        onFocus={event=>spanAnimation(event)}
                    />
                    <span className="LoginSpan"> Password </span>
                </div>

                <p>{serverResponse}</p>
                <button id="loginButton" onClick={login}>Login</button>
                <a href="http://localhost:3000/signUp">Sign up</a>

            </div>
        </div>
    );
}

export default Login;
