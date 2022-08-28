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

    const [ user, setUser ] = useState(null);
    
    useEffect(()=>{
        axios.post('http://localhost:8080/user/getmyinfo', {username: "andrezzz"}).then((response)=>{
            setUser(response.data);
        });
    }, []);

    function IAmAlive() {
        if(user){
            axios.post("http://localhost:8080/user/alive", {username: user.username}).then((response)=>{
                if(!response.data){
                    setUser(null);
                    console.log("Your session has expired.")
                    window.location.reload();
                }
            });
        }
    }

    return (
        <div className="App" onClick={IAmAlive}>
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
