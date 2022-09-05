import axios from 'axios';
import './Styles.css';
import { useEffect } from 'react';

function Login({ User, setUser }) {

    useEffect(()=>{
        //fake login
        if(!User){
            axios.post('http://localhost:8080/login', {username: "andrezzz"}).then((response)=>{
                
                console.log(response.data.message);

                if(response.data.user){
                    console.log(response.data);
                    localStorage.setItem("session-token", String(response.data.sessionToken));
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    console.log("session-token", localStorage.getItem('session-token'));
                    console.log("user", JSON.parse(localStorage.getItem('user')));
                    setUser(response.data.user);
                }
                
            });
        }

    }, []);

    return (
        <div className="LoginPage">
            <div className="LoginContainer">

            </div>
        </div>
    );
}

export default Login;
