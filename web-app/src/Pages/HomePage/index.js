import './Styles.css';
import Header from '../../Components/Header';
import axios from 'axios';
import { useState, useEffect } from 'react';


var routes = {
    "/login": "",
    "/signup": "",
    "/user/getfriends/:id": "",
    "/user/getinfo/:id": "",
    "/user/update/:id": "",
    "/user/delete/:id": "",
    "/user/history/:id": ""
}

function HomePage() {

    /*
    const [response1, setResponse1] = useState("");
    const [response2, setResponse2] = useState("");
    const [response3, setResponse3] = useState("");
    const [response4, setResponse4] = useState("");
    const [response5, setResponse5] = useState("");
    const [response6, setResponse6] = useState("");
    const [response7, setResponse7] = useState("");

    useEffect(()=>{
        axios.post("http://localhost:8080/login").then((response)=>{
            setResponse1(response.data);
        })
        axios.post("http://localhost:8080/signup").then((response)=>{
            setResponse2(response.data);
        })
        axios.get("http://localhost:8080/user/getfriends/123").then((response)=>{
            setResponse3(response.data);
        })
        axios.get("http://localhost:8080/user/getinfo/123").then((response)=>{
            setResponse4(response.data);
        })
        axios.post("http://localhost:8080/user/update/123").then((response)=>{
            setResponse5(response.data);
        })
        axios.put("http://localhost:8080/user/delete/123").then((response)=>{
            setResponse6(response.data);
        })
        axios.get("http://localhost:8080/user/history/123").then((response)=>{
            setResponse7(response.data);
        })
    }, []);

    */
   
    return (
        <div className="HomePage">
            <Header/>
            
            <main> 
                
                <div className='HomeContainer'>

                </div>


            </main>
   
        </div>
    );
}

export default HomePage;
