import axios from 'axios';
import './Styles.css';
import {useState,useEffect} from 'react';


function Followers ( {requestedUser} ){

    const [lista, updateLista] = useState([]);
    const [tupla, updateTupla] = useState([]);
    
    useEffect (()=>{
        if(lista.length === 0){
            requestedUser.followersList.forEach((follower)=> {
                axios.get('http://localhost:8080/user/getinfo/'+follower).then((response)=>{
                    updateLista( arr => [...arr, response.data.user.photoURL]);
                });
            });
        }
        console.log("lista de fotos:",lista);
    },[]);

    useEffect (()=>{
        if(lista.length === requestedUser.followersList.length){
            for(let i = 0; i<lista.length;i+=1){
                updateTupla( arr => [...arr, [requestedUser.followersList[i], lista[i]]]);
            }
        }
        console.log("tupla de usuario",tupla);
    },[lista]);
    
    return (
        <div className="Followers">
            <div className="Followers-div">
                {tupla?.map((follower) =>{
                    return( 
                        <div key={follower[0]} className="Followers-container">
                            <a href={"http://localhost:3000/profile/"+follower[0]}>
                                <img id='friend-icon' alt="Friend Icon" src={follower[1]}/>
                            </a>
                            
                            <a href={"http://localhost:3000/profile/"+follower[0]}>
                                <p id='friend-nick'>{follower[0]}</p>
                            </a>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}

export default Followers;