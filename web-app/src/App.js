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

    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('user')));
   
    useEffect(()=>{

        const sessionToken = localStorage.getItem('session-token');

        if(sessionToken){
            
            axios.get('http://localhost:8080/user/getmyinfo', {headers: {"session-token": sessionToken}}).then((response)=>{
            
                console.log(response.data.message);

                setUser(response.data.user);

                if(response.data.auth) {
                    //se está em sessão atualiza token e cache do usuário
                    localStorage.setItem('user', JSON.stringify(response.data.user));

                }else{
                    //se não está em sessão, anular token e cache do usuário
                    localStorage.clear();

                }

            });

        }

    }, []);


    function refreshSession() {

        if(user){

            const sessionToken = localStorage.getItem('session-token');

            axios.get("http://localhost:8080/user/refreshsession", {headers: {"session-token": sessionToken}}).then((response)=>{
                
                console.log(response.data.message);
                
                if(!response.data.auth){
                    //sessão foi esgotada, então anular token e cache do usuário
                    setUser(null);
                    localStorage.clear();
                }

            });
            
        } 

    }

    return (
        <div className="App" onClick={refreshSession}>
            <Header User={user} setUser={setUser}/>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<HomePage User={user}/>}/>
                    <Route path="/login" element={<Login User={user} setUser={setUser}/>}/>
                    <Route path="/signUp" element={<SignUp User={user} setUser={setUser}/>}/>
                    <Route path="/profile/:username" element={<Profile User={user}/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
