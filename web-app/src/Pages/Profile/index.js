import './Styles.css';
import Header from '../../Components/Header';
import { useState } from 'react';
import Lists from '../../Components/Lists';
import Reviews from '../../Components/Reviews';
import Followers from '../../Components/Followers';
import Following from '../../Components/Following';
import EditProfile from '../../Components/EditProfile';
import { useEffect } from 'react';
import axios from 'axios';


function Profile({ User }) {

    const [ requestedUser, setRequestedUser ] = useState(null);
    const [actualEl, setActualEl] = useState(<></>);
    const [alert, SetAlert] = useState("Loading...");


    useEffect(()=>{

        if(User){
            //pegando o final da url
            const userToRequest = window.location.href.split("profile/")[1];
            //pegando as informaçoes do usuario da pagina solicitada
            axios.get('http://localhost:8080/user/getinfo/'+userToRequest).then((response)=>{
                setRequestedUser(response.data);
                if(!response.data){
                    SetAlert("Usuário não encontrado...");
                } 
            });
        }

    }, [User]);

    useEffect(()=>{

        if(requestedUser){
            setActualEl(<Lists requestedUser={requestedUser}/>)
        } 

    }, [requestedUser]);

    function activeEl(event) {
        const items = document.querySelectorAll('.ProfileBarOptions');
        items.forEach((item) => item.classList.remove('Active'));

        const el = event.target || event.srcElement;
        el.classList.add('Active');
    }

    return (

        <div className="ProfilePage">
            <Header User={User}/>
            {requestedUser?
                <div className="ProfileContainer">
                    <div className='LeftProfileSide'>
                        <img alt='User Profile Icon' src={requestedUser.photoURL}></img>
                        <span className="ProfileUserName">{requestedUser.name}</span>
                        <span>{requestedUser.username}</span>
                        <span>{requestedUser.followers+" followers - "+requestedUser.following+" following"}</span>
                        <div className='ProfileBio'>
                            <p>{requestedUser.bio}</p>
                        </div>
                        
                    </div>
                    <div className='RightProfileSide'>
                        <div className='ProfileBar'>
                            <div className='ProfileBarOptions Active' onClick={(e)=>{setActualEl(<Lists requestedUser={requestedUser}/>); activeEl(e);}}>Lists</div>
                            <div className='ProfileBarOptions' onClick={(e)=>{setActualEl(<Reviews requestedUser={requestedUser}/>); activeEl(e);}}>Reviews</div>
                            <div className='ProfileBarOptions' onClick={(e)=>{setActualEl(<Followers requestedUser={requestedUser}/>); activeEl(e);}}>Followers</div>
                            <div className='ProfileBarOptions' onClick={(e)=>{setActualEl(<Following requestedUser={requestedUser}/>); activeEl(e);}}>Following</div>
                            {("http://localhost:3000/profile/"+User?.id)===window.location.href?
                                <>
                                    <div className='ProfileBarOptions' onClick={(e)=>{setActualEl(<EditProfile User={User}/>); activeEl(e);}}>Edit Profile</div>
                                </>:<>
                                </>   
                            }
                        </div>
                        {actualEl}
                    </div>
                    
                </div>:<>
                    {alert}
                </>
            }
        </div>
    );
}

export default Profile;
