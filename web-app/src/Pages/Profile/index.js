import './Styles.css';
import Lists from '../../Components/Lists';
import Reviews from '../../Components/Reviews';
import Followers from '../../Components/Followers';
import Following from '../../Components/Following';
import EditProfile from '../../Components/EditProfile';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {PacmanLoader} from 'react-spinners';
import axios from 'axios';


function Profile({ User }) {

    const { username } = useParams();
    const [ alert, SetAlert ] = useState(<div className="AlertProfilePage"><PacmanLoader color={"#240047"} size={30} speedMultiplier={1}/></div>);
    const [ requestedUser, setRequestedUser ] = useState(null);
    const [ actualEl, setActualEl ] = useState(<></>);
    

    useEffect(()=>{

        axios.get('http://localhost:8080/user/getinfo/'+username).then((response)=>{
            
            console.log(response.data.message);
            setRequestedUser(response.data.user);

            if(!response.data.user){
                SetAlert(<div className="AlertProfilePage">Usuário não encontrado.</div>);
            } 

        });

    }, [User, username]);

    //logo após requestedUser ser definido, o componente de listas vai ser mostrado
    useEffect(()=>{
        if(requestedUser){
            setActualEl(<Lists requestedUser={requestedUser}/>);
        }
    }, [requestedUser])

    function activeEl(event) {
        const items = document.querySelectorAll('.ProfileBarOptions');
        items.forEach((item) => item.classList.remove('Active'));

        const el = event.target || event.srcElement;
        el.classList.add('Active');
    }

    function activeElFollowers() {
        const items = document.querySelectorAll('.ProfileBarOptions');
        items.forEach((item) => item.classList.remove('Active'));

        const el = document.querySelector('.FollowersOption');
        el.classList.add('Active');
    }

    function activeElFollowing() {
        const items = document.querySelectorAll('.ProfileBarOptions');
        items.forEach((item) => item.classList.remove('Active'));

        const el = document.querySelector('.FollowingOption');
        el.classList.add('Active');
    }

    function FollowUnfollow(){
        if(User.followingList.includes(requestedUser.username))
            return (<button className='Unfollow-button'>Unfollow</button>)
        else
            return (<button className='Follow-button'>Follow</button>)
    }

    return (

        <div className="ProfilePage">
            {requestedUser?
                <div className="ProfileContainer">
                    <div className='LeftProfileSide'>

                        <img alt='User Profile Icon' src={requestedUser.photoURL}></img>
                        <span className="ProfileUserName">{requestedUser.firstName+" "+requestedUser.lastName}</span>
                        <span className="ProfileUsername">{"@"+requestedUser.username}</span>
                        <div className="ProfileFollowersFollowing">
                            <div className='ProfileFollowersOrFollowing' onClick={()=>{setActualEl(<Followers requestedUser={requestedUser} User={User}/>); activeElFollowers();}}>
                                {requestedUser.followers+" followers"}
                            </div>
                            <span>
                                -
                            </span>
                            <div className='ProfileFollowersOrFollowing' onClick={()=>{ setActualEl(<Following requestedUser={requestedUser} User={User}/>); activeElFollowing();}}>
                                {requestedUser.following+" following"}
                            </div>
                        </div>

                        <div>
                        {(requestedUser?.username===User?.username)?    
                            <>
                            </>
                            :
                            <>

                                {<FollowUnfollow/>}
                            </>
                        }
                        </div>

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
                            <div className='ProfileBarOptions FollowersOption' onClick={(e)=>{
                                setActualEl(<Followers requestedUser={requestedUser} User={User}/>);
                                activeEl(e);}}>
                                Followers
                            </div>
                            <div className='ProfileBarOptions FollowingOption' onClick={(e)=>{
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
                                <>
                                </>
                            }                   

                        </div>
                        {actualEl}
                    </div>
                    
                </div>
                :
                <>
                    {alert}
                </>
            }
        </div>
    );
}

export default Profile;
