import './App.css';
import Header from '../src/Components/Header';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import HomePage from './Pages/HomePage';
import Profile from './Pages/Profile';
import NotFound from './Pages/NotFound';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import axios from 'axios';

function App() {

    const user = useRef(null);

    console.log(user.current);
   
    useEffect(()=>{

        fetchUserData();

    }, []);


    function fetchUserData (newAccessToken) {

        const accessToken = newAccessToken || localStorage.getItem('x-access-token');
        const refreshToken = localStorage.getItem('x-refresh-token');

        if(accessToken){
            
            axios.get('http://localhost:8080/user/getmyinfo', {headers: {"x-access-token": accessToken, "x-refresh-token": refreshToken}}).then((response)=>{
            
                console.log(response.data.message);

                if(response.data.auth){
                    //accessToken ativo
                    user.current = response.data.user;

                } else if (response.data.refresh){
                    //accessToken expirou mas refreshToken conseguiu atualizar ele
                    localStorage.setItem('x-access-token', response.data.newAccessToken);
                    fetchUserData(response.data.newAccessToken);

                } else {
                    //accessToken expirado e refreshToken também expirado ou houve sequestro de sessão
                    localStorage.clear();
                }

            });

        } else {

            //garantir que não tenha lixo de outras sessões aqui
            localStorage.clear();

        }

    }


    return (
        <div className="App">
            <Header User={user}/>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<HomePage User={user}/>}/>
                    <Route path="/login" element={<Login User={user}/>}/>
                    <Route path="/signUp" element={<SignUp User={user}/>}/>
                    <Route path="/profile/:username" element={<Profile User={user}/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
