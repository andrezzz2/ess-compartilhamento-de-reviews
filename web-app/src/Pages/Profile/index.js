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
import { ThreeBounce } from 'better-react-spinkit';


function Profile({ User, setUser }) {

    const [ requestedUser, setRequestedUser ] = useState(null);
    const [actualEl, setActualEl] = useState(<></>);
    const [alert, SetAlert] = useState(<div className="AlertProfilePage"><ThreeBounce size={20}/></div>);


    useEffect(()=>{

        if(User){
            //pegando o final da url
            const userToRequest = window.location.href.split("profile/")[1];
            //pegando as informaçoes do usuario da pagina solicitada
            axios.get('http://localhost:8080/user/getinfo/'+userToRequest).then((response)=>{
                setRequestedUser(response.data);
                if(!response.data){
                    SetAlert(<div className="AlertProfilePage">Usuário não encontrado.</div>);
                } 
            });
        }

    }, [User]);

    useEffect(()=>{

        if(requestedUser){
            setActualEl(<Lists requestedUser={requestedUser}/>)
        } else{
            if(!User){
                SetAlert(<div className="AlertProfilePage">Você não tem acesso a esta página.</div>);
            }
        }

    }, [requestedUser]);

    function activeEl(event) {
        const items = document.querySelectorAll('.ProfileBarOptions');
        items.forEach((item) => item.classList.remove('Active'));

        const el = event.target || event.srcElement;
        el.classList.add('Active');
    }

    function IAmAlive() {
        if(User){
            axios.post("http://localhost:8080/user/alive", {username: User.username}).then((response)=>{
                if(!response.data){
                    setUser(null);
                }
            });
        }
    }

    return (

        <div className="ProfilePage">
            <Header User={User} setUser={setUser}/>
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
                            <div className='ProfileBarOptions Active' onClick={(e)=>{
                                setActualEl(<Lists requestedUser={requestedUser} User={User} setUser={setUser}/>);
                                activeEl(e);
                                IAmAlive();}}>
                                Lists
                            </div>
                            <div className='ProfileBarOptions' onClick={(e)=>{
                                setActualEl(<Reviews requestedUser={requestedUser} User={User} setUser={setUser}/>);
                                activeEl(e);
                                IAmAlive();}}>
                                Reviews
                            </div>
                            <div className='ProfileBarOptions' onClick={(e)=>{
                                setActualEl(<Followers requestedUser={requestedUser} User={User} setUser={setUser}/>);
                                activeEl(e);
                                IAmAlive();}}>
                                Followers
                            </div>
                            <div className='ProfileBarOptions' onClick={(e)=>{
                                setActualEl(<Following requestedUser={requestedUser} User={User} setUser={setUser}/>);
                                activeEl(e);
                                IAmAlive();}}>
                                Following
                            </div>

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
