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
import swal from 'sweetalert';


function Profile({ User, setUser }) {

    const { username } = useParams();
    const [ alert, SetAlert ] = useState(<div className="AlertProfilePage"><PacmanLoader color={"#240047"} size={30} speedMultiplier={1}/></div>);
    const [ requestedUser, setRequestedUser ] = useState(null);
    const [ actualEl, setActualEl ] = useState(<></>);
    

    useEffect(()=>{

        if(username) fetchRequestedUser(username);

    }, [username]);

    function fetchRequestedUser(username) {

        axios.get('http://localhost:8080/user/getinfo/'+username).then((response)=>{
                
            console.log(response.data.responseObject.message);
            setRequestedUser(response.data.responseObject.user);

            if(!response.data.responseObject.user){
                SetAlert(<div className="AlertProfilePage">Usuário não encontrado.</div>);
            } 

        }).catch(error=>{
            console.error(error.toJSON());
            SetAlert(<div className="AlertProfilePage">Usuário não encontrado.</div>);
        });

    }

    //logo após requestedUser ser definido, o componente de listas vai ser mostrado
    useEffect(()=>{
        if(requestedUser){
            setActualEl(<Lists User={User} requestedUser={requestedUser}/>);
        }
    }, [requestedUser, User]);

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
        if(User?.followingList.includes(requestedUser.username))
            return (<button className='Unfollow-button' data-testid = "unfollow" onClick={unfollowUser}>Unfollow</button>)
        else
            return (<button className='Follow-button' data-testid = "follow" onClick={followUser}>Follow</button>)
    }

    function followUser(){
        
        const accessToken = localStorage.getItem('x-access-token');
        const refreshToken = localStorage.getItem('x-refresh-token');

        if(User && accessToken && refreshToken){
            const followingList = User.followingList;
            const followersList = requestedUser.followersList;

            axios.post('http://localhost:8080/user/addfollower/'+requestedUser.username,{followingList: followingList, followersList: followersList},{headers: {"x-access-token": accessToken, "x-refresh-token": refreshToken}} ).then((response)=>{
                console.log(response.data.responseObject.authMessage);
                if(response.data.responseObject.auth){
                    if(response.data.responseObject.newAccessToken){
                        localStorage.setItem('x-access-token', response.data.responseObject.newAccessToken);
                    }
                    console.log(response.data.responseObject.message);
                    fetchRequestedUser(username);
                }
                
            }).catch(error=>{
                console.error(error.toJSON());
            });
        } else {

            swal({
                text:"Para seguir alguém você precisa estar logado, deseja ir para página de login?",
                buttons:{
                    confirm: true,
                    cancel: true
                }})
            .then(value=>{
                if(value){
                    window.location.href = "http://localhost:3000/login";
                } else {
                    window.location.reload();
                }
            });

        } 
    }

    function unfollowUser(){

        const accessToken = localStorage.getItem('x-access-token');
        const refreshToken = localStorage.getItem('x-refresh-token');

        if(User && accessToken && refreshToken){
            const followingList = User.followingList;
            const followersList = requestedUser.followersList;

            axios.post('http://localhost:8080/user/removefollower/'+requestedUser.username,{followingList: followingList, followersList: followersList},{headers: {"x-access-token": accessToken, "x-refresh-token": refreshToken}} ).then((response)=>{
                console.log(response.data.responseObject.authMessage);
                if(response.data.responseObject.auth){
                    if(response.data.responseObject.newAccessToken){
                        localStorage.setItem('x-access-token', response.data.responseObject.newAccessToken);
                    }
                    console.log(response.data.responseObject.message);
                    fetchRequestedUser(username);
                }
            }).catch(error=>{
                console.error(error.toJSON());
            });
        } else {

            swal({
                text:"Para seguir alguém você precisa estar logado, deseja ir para página de login?",
                buttons:{
                    confirm: true,
                    cancel: true
                }})
            .then(value=>{
                if(value){
                    window.location.href = "http://localhost:3000/login";
                } else {
                    window.location.reload();
                }
            });

        } 
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
                                {requestedUser.followersList.length+" followers"}
                            </div>
                            <span>
                                -
                            </span>
                            <div className='ProfileFollowersOrFollowing' onClick={()=>{ setActualEl(<Following requestedUser={requestedUser} User={User}/>); activeElFollowing();}}>
                                {requestedUser.followingList.length+" following"}
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
                                setActualEl(<Lists requestedUser={requestedUser} User={User} setUser={setUser}/>);
                                activeEl(e);}}>
                                Lists
                            </div>
                            <div className='ProfileBarOptions' onClick={(e)=>{
                                setActualEl(<Reviews requestedUser={requestedUser}/>);
                                activeEl(e);}}>
                                Reviews
                            </div>
                            <div className='ProfileBarOptions FollowersOption' onClick={(e)=>{
                                setActualEl(<Followers requestedUser={requestedUser}/>);
                                activeEl(e);}}>
                                Followers
                            </div>
                            <div className='ProfileBarOptions FollowingOption' onClick={(e)=>{
                                setActualEl(<Following requestedUser={requestedUser}/>);
                                activeEl(e);}}>
                                Following
                            </div>
                            {(requestedUser?.username===User?.username)?
                                <div className='ProfileBarOptions' onClick={(e)=>{
                                    setActualEl(<EditProfile User={User} setUser={setUser}/>);
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
