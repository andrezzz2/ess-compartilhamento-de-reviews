import axios from 'axios';
import './Styles.css';
import { useEffect } from 'react';

let notSending = true;

function Login({ User, setUser }) {

    useEffect(()=>{
        //fake login
        if(!User && notSending){
            notSending = false;
            axios.post('http://localhost:8080/login', {username: "andrezzz"}).then((response)=>{
                
                console.log(response.data.message);

                if(response.data.user){
                    localStorage.setItem("x-access-token", response.data.accessToken);
                    localStorage.setItem("x-refresh-token", response.data.refreshToken);
                    localStorage.setItem("user", JSON.stringify(response.data.user));
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
