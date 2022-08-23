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


    return (
        <div className="HomePage">
            {/*
            <Header/>
            */}
            <div className='HomeContainer'>

                <header>
                    {/*
                    <div className='NavBar'>
                        <a href="/#">Anime</a>
                        <a href="/#">Manga</a>
                        <a href="/#">Community</a>
                        <a href="/#">Industry</a>
                        <a href="/#">Watch</a>
                        <a href="/#">Read</a>
                        <a href="/#">Help</a>
                    </div>

                    <div className='SearchBar'>
                        <input placeholder='Search Anime, Manga, and more...'/>
                        <img alt="search icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABiUlEQVRIie2Wu04CQRSGP0G2EUtIbHwA8B3EQisLIcorEInx8hbEZ9DKy6toDI1oAgalNFpDoYWuxZzJjoTbmSXERP7kZDbZ859vdmb27MJcf0gBUAaugRbQk2gBV3IvmDa0BLwA4Zh4BorTACaAU6fwPXAI5IAliTxwBDScvJp4vWWhH0BlTLEEsC+5Fu6lkgNdV/gKDnxHCw2I9rSiNQNV8baBlMZYJtpTn71KAg9SY3dUYn9xezLPgG8P8BdwLteq5X7CzDbnAbXKS42WxtQVUzoGeFlqdEclxXrnhmhhkqR+8KuMqzHA1vumAddl3IwB3pLxVmOyr1NjwKQmURJ4lBp7GmOAafghpg1qdSDeDrCoNReJWmZB4dsAPsW7rYVa1Rx4FbOEw5TEPKmFvgMZX3DCgYeYNniMaQ5piTXghGhPLdTmZ33hYNpem98f/UHRwSxvhqhXx4anMA3/EmhiOlJPJnSBOb3uQcpOE65VhujPpAms/Bu4u+x3swRbeB24mTV4LgB+AFuLedkPkcmmAAAAAElFTkSuQmCC">
                        </img>
                    </div>
                    */}
                </header>


                <main> 

                    <article>
                        /login    - {response1}
                    </article>

                    <article>
                        /signup   - {response2}
                    </article>

                    <article>
                        /user/getfriends/:id   - {response3}
                    </article>

                    <article>
                        /user/getinfo/:id    - {response4}
                    </article>

                    <article>
                        /user/update/:id     - {response5}
                    </article>

                    <article>
                        /user/delete/:id     - {response6}
                    </article>

                    <article>
                        /user/history/:id    - {response7}
                    </article>


                </main>

                    
                <footer>
                </footer>

            </div>    
        </div>
    );
}

export default HomePage;
