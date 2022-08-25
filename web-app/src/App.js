import './App.css';
import HomePage from './Pages/HomePage';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

    //mock user logged in
    const user = {
        uid: 123,
        name: "André Luiz",
        username: "@andrezzz",
        followers: "10k",
        following: "293",
        bio: "bwbiuovwenjogoivbiuewbbienwbionieonbwewiobneibneoinbeiwnbiewbnbolabiweb0enewionbe0wibnienfownewiunbienbew0bndiewenibneibn0dncmib0nermwmcisnibnrenb0wewni0wenciwdançomvbcmsoidnbornbwepnvw",
        photoURL: "https://lh3.googleusercontent.com/a/AItbvmlht4uK2tnQF_wtuIBUKQzUS8_ZzOGCtdeXYK8H=s83-c-mo"
    };

    //mock user off
    //const user = null;

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<HomePage User={user}/>}/>
                    <Route path="/login" element={<Login User={user}/>}/>
                    <Route path="/signUp" element={<SignUp User={user}/>}/>
                    <Route path="/profile/:slug" element={<Profile User={user}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
