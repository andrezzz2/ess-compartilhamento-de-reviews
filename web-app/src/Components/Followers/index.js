import axios from 'axios';
import './Styles.css';
import {useState,useEffect} from 'react';


function Followers ( {requestedUser, User} ){

    const [lista, updateLista] = useState([]);
    const [tupla, updateTupla] = useState([]);
    
    useEffect (()=>{
        if(lista.length === 0){
            requestedUser.followersList.forEach((follower)=> {
                axios.get('http://localhost:8080/user/getinfo/'+follower).then((response)=>{
                    updateLista( arr => [...arr, response.data.photoURL]);
                });
            });
        }
    },[]);

    useEffect (()=>{
        if(lista.length === requestedUser.followersList.length){
            for(let i = 0; i<lista.length;i+=1){
                updateTupla( arr => [...arr, [requestedUser.followersList[i], lista[i]]]);
            }
        }
    },[lista]);
    console.log("lista de fotos:",lista);
    console.log("tupla de usuario",tupla);
    return (
        <div className="Followers">
            <div className="Followers-container">
                {tupla?.map((follower) =>{
                    return( 
                    <>
                    <a href={"http://localhost:3000/profile/"+follower[0]}>
                        <img id="friend-icon" alt="Friend Icon" src={follower[1]}/>
                    </a>
                    <a href={"http://localhost:3000/profile/"+follower[0]}>
                        <p id="friend-nick">{follower[0]}</p>
                    </a>
                    </>
                    )
                })}
                
            </div>
        </div>
    )

}

export default Followers;