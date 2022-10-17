import axios from 'axios';
import './Styles.css';
import { useEffect, useRef, useState } from 'react';
import swal from 'sweetalert';

function SignUp({ User }) {

	if(User) window.location.href = "http://localhost:3000";

	const firstNameInput = useRef();
	const lastNameInput = useRef();
	const usernameInput = useRef();
	const emailInput = useRef();
	const passwordInput = useRef();
	const [response, setResponse] = useState("");

	function signUp() {

		const password = passwordInput.current.value;

		if(firstNameInput.current.value === ""){
			setResponse("First Name field invalid!");
			return;
		}
		if(lastNameInput.current.value === ""){
			setResponse("Last Name field invalid!");
			return;
		}
		if(usernameInput.current.value === ""){
			setResponse("Username field invalid!");
			return;
		}
		if(emailInput.current.value === ""){
			setResponse("Email Name field invalid!");
			return;
		}
		if(password === ""){
			setResponse("Password field is empty!");
			return;
		}else{
			if (password.length < 8){	
				setResponse("Password must have more than 8 charaters!");
				return;
			}
			if (!(/\d/.test(password))){
				setResponse("Password must have at least a number!");
				return;
			}
			if (!(/[a-zA-Z]/.test(password))){
				setResponse("Password must have at least a letter!");
				return
			}

			const body = {
				firstName: firstNameInput.current.value,
				lastName: lastNameInput.current.value,
				username: usernameInput.current.value,
				email: emailInput.current.value,
				password: passwordInput.current.value,
			}
			
			axios.post("http://localhost:8080/signup", body).then(response=>{
				if(response.data.responseObject.accepted){
					swal({
						text:response.data.responseObject.message + "\n Você será redirecionado para a página de login.",
						buttons:{
							confirm: true,
							cancel: true
						}})
					.then(value=>{
						if(value){
							window.location.href = "http://localhost:3000/login";
						} 
					});
				}else{
					setResponse(response.data.responseObject.message);
				}
			}).catch(erro=>{
				console.error(erro.toJSON());
			});
		}

	}

	useEffect(()=>{
		firstNameInput.current.addEventListener('keyup', function(e){
            let key = e.which || e.keyCode;
            if (key === 13) { // codigo da tecla enter
              signUp();
            }
        });
		lastNameInput.current.addEventListener('keyup', function(e){
            let key = e.which || e.keyCode;
            if (key === 13) { // codigo da tecla enter
              signUp();
            }
        });
		usernameInput.current.addEventListener('keyup', function(e){
            let key = e.which || e.keyCode;
            if (key === 13) { // codigo da tecla enter
              signUp();
            }
        });
        emailInput.current.addEventListener('keyup', function(e){
            let key = e.which || e.keyCode;
            if (key === 13) { // codigo da tecla enter
              signUp();
            }
        });
        passwordInput.current.addEventListener('keyup', function(e){
            let key = e.which || e.keyCode;
            if (key === 13) { // codigo da tecla enter
              signUp();
            }
        });
    }, []);

	function spanAnimation(event) {
		const el = event.target || event.srcElement;
		const el2 = el.nextSibling;
		el2.style.cssText = "font-size: 0.9rem;" +
			"top: -0.7rem;" +
			"left: 0.5rem;" +
			"color: #240047;" +
			"background-color: white;";
	}

	return (
		<div className="SignUpPage">
			<div className="SignUpContainer">

				<div className="SignUpTitle">Sign Up</div>

				<div className="FloatInput">
					<input className="SignUpField"
						type="text"
						ref={firstNameInput}
						onFocus={event => spanAnimation(event)}
					/>
					<span className="SignUpSpan"> First Name </span>
				</div>

				<div className="FloatInput">
					<input className="SignUpField"
						type="text"
						ref={lastNameInput}
						onFocus={event => spanAnimation(event)}
					/>
					<span className="SignUpSpan"> Last Name</span>
				</div>

				<div className="FloatInput">
					<input className="SignUpField"
						type="text"
						ref={usernameInput}
						onFocus={event => spanAnimation(event)}
					/>
					<span className="SignUpSpan"> Username </span>
				</div>

				<div className="FloatInput">
					<input className="SignUpField"
						type="text"
						ref={emailInput}
						onFocus={event => spanAnimation(event)}
					/>
					<span className="SignUpSpan"> Email </span>
				</div>

				<div className="FloatInput">
					<input className="SignUpField"
						type="password"
						ref={passwordInput}
						onFocus={event => spanAnimation(event)}
					/>
					<span className="SignUpSpan"> Password </span>
				</div>

				<p>{response}</p>
				<button id="signUpButton" onClick={signUp}>Sign Up</button>
				<a href="http://localhost:3000/login">Login</a>

			</div>
		</div>
	);
}

export default SignUp;
