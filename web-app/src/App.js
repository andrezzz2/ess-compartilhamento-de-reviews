import './App.css';
import HomePage from './Pages/HomePage';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
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
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<HomePage User={user} setUser={setUser}/>}/>
                    <Route path="/login" element={<Login User={user} setUser={setUser}/>}/>
                    <Route path="/signUp" element={<SignUp User={user} setUser={setUser}/>}/>
                    <Route path="/profile/:slug" element={<Profile User={user} setUser={setUser}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
