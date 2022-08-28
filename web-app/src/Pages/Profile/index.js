import './Styles.css';
import Lists from '../../Components/Lists';
import Reviews from '../../Components/Reviews';
import Followers from '../../Components/Followers';
import Following from '../../Components/Following';
import EditProfile from '../../Components/EditProfile';
import { useState, useEffect } from 'react';
import { ThreeBounce } from 'better-react-spinkit';
import axios from 'axios';


function Profile({ User }) {

    const [ requestedUser, setRequestedUser ] = useState(null);
    const [actualEl, setActualEl] = useState(<></>);
    const [alert, SetAlert] = useState(<div className="AlertProfilePage"><ThreeBounce size={20}/></div>);

    useEffect(()=>{
        //pegando o final da URL
        const userToRequest = window.location.href.split("profile/")[1];
        //pegando as informações da página do usuário solicitado
        axios.get('http://localhost:8080/user/getinfo/'+userToRequest).then((response)=>{
            setRequestedUser(response.data);
            if(!response.data){
                SetAlert(<div className="AlertProfilePage">Usuário não encontrado.</div>);
            } 
        });

    }, [User]);

    function activeEl(event) {
        const items = document.querySelectorAll('.ProfileBarOptions');
        items.forEach((item) => item.classList.remove('Active'));

        const el = event.target || event.srcElement;
        el.classList.add('Active');
    }

    return (

        <div className="ProfilePage">
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
                                setActualEl(<Lists requestedUser={requestedUser}/>);
                                activeEl(e);}}>
                                Lists
                            </div>
                            <div className='ProfileBarOptions' onClick={(e)=>{
                                setActualEl(<Reviews requestedUser={requestedUser} User={User}/>);
                                activeEl(e);}}>
                                Reviews
                            </div>
                            <div className='ProfileBarOptions' onClick={(e)=>{
                                setActualEl(<Followers requestedUser={requestedUser} User={User}/>);
                                activeEl(e);}}>
                                Followers
                            </div>
                            <div className='ProfileBarOptions' onClick={(e)=>{
                                setActualEl(<Following requestedUser={requestedUser} User={User}/>);
                                activeEl(e);}}>
                                Following
                            </div>
                            {(requestedUser?.username===User?.username)?
                                <div className='ProfileBarOptions' onClick={(e)=>{
                                    setActualEl(<EditProfile requestedUser={requestedUser} User={User}/>);
                                    activeEl(e);}}>
                                    Edit Profile
                                </div>
                                :
                                <></>
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
