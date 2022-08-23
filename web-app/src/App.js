import './App.css';
import HomePage from './Pages/HomePage';
import Profile from './Pages/Profile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<HomePage/>}/>
                    <Route path="/profile/:slug" element={<Profile/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
