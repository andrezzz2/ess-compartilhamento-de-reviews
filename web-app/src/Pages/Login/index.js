import axios from 'axios';
import './Styles.css';
import { useEffect } from 'react';


function Login({ User }) {

    useEffect(()=>{
        //can't duplicate login
        if(!User.current){

            axios.post('http://localhost:8080/login', {username: "andrezzz"}).then((response)=>{
                
                console.log(response.data.message);

                if(response.data.user){
                    localStorage.setItem("x-access-token", response.data.accessToken);
                    localStorage.setItem("x-refresh-token", response.data.refreshToken);
                    User.current = response.data.user;
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
