import './App.css';
import Header from '../src/Components/Header';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import HomePage from './Pages/HomePage';
import Profile from './Pages/Profile';
import NotFound from './Pages/NotFound';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

    const [ User, setUser ] = useState(JSON.parse(localStorage.getItem('user')));
   
    useEffect(()=>{

        console.log("App mounted.");
        if(localStorage.getItem('user')) fetchUserData();

    }, []);


    function fetchUserData () {

        const accessToken = localStorage.getItem('x-access-token');
        const refreshToken = localStorage.getItem('x-refresh-token');
            
        axios.get('http://localhost:8080/user/getmyinfo', {headers: {"x-access-token": accessToken, "x-refresh-token": refreshToken}}).then((response)=>{
        
            console.log(response.data.responseObject.authMessage);

            if(response.data.responseObject.auth){
                if(response.data.responseObject.newAccessToken){
                    localStorage.setItem('x-access-token', response.data.responseObject.newAccessToken);
                }
                console.log(response.data.responseObject.message);
                setUser(response.data.responseObject.user);
            } else {
                //accessToken expirado e refreshToken também expirado ou houve sequestro de sessão
                setUser(null);
                localStorage.clear();
            }

        });

    }


    return (
        <div className="App">
            <Header User={User} setUser={setUser}/>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<HomePage User={User}/>}/>
                    <Route exact path="/login" element={<Login User={User} setUser={setUser}/>}/>
                    <Route exact path="/signUp" element={<SignUp User={User} setUser={setUser}/>}/>
                    <Route exact path="/profile/:username" element={<Profile User={User} setUser={setUser}/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
