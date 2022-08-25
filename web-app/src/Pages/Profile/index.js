import './Styles.css';
import Header from '../../Components/Header';
import { useState, useEffect } from 'react';
import Lists from '../../Components/Lists';
import Reviews from '../../Components/Reviews';
import Followers from '../../Components/Followers';
import Following from '../../Components/Following';
import EditProfile from '../../Components/EditProfile';



function Profile({ User }) {

    const [actualEl, setActualEl] = useState(<Lists User={User}/>);


    function activeEl(event) {
        const items = document.querySelectorAll('.ProfileBarOptions');
        items.forEach((item) => item.classList.remove('Active'));

        const el = event.target || event.srcElement;
        el.classList.add('Active');
    }

    return (
        <div className="ProfilePage">
            <Header User={User}/>

            <div className="ProfileContainer">
                <div className='LeftProfileSide'>
                    <img alt='User Profile Icon' src={User.photoURL}></img>
                    <span className="ProfileUserName">{User.name}</span>
                    <span>{User.username}</span>
                    <span>{User.followers+" followers - "+User.following+" following"}</span>
                    <div className='ProfileBio'>
                        <p>{User.bio}</p>
                    </div>
                    
                </div>
                <div className='RightProfileSide'>
                    <header>
                        <div className='ProfileBar'>
                            <div className='ProfileBarOptions Active' onClick={(e)=>{setActualEl(<Lists User={User}/>); activeEl(e);}}>Lists</div>
                            <div className='ProfileBarOptions' onClick={(e)=>{setActualEl(<Reviews User={User}/>); activeEl(e);}}>Reviews</div>
                            <div className='ProfileBarOptions' onClick={(e)=>{setActualEl(<Followers User={User}/>); activeEl(e);}}>Followers</div>
                            <div className='ProfileBarOptions' onClick={(e)=>{setActualEl(<Following User={User}/>); activeEl(e);}}>Following</div>
                            <div className='ProfileBarOptions' onClick={(e)=>{setActualEl(<EditProfile User={User}/>); activeEl(e);}}>Edit Profile</div>
                        </div>
                    </header>
                    {actualEl}
                </div>
                
            </div>
        </div>
    );
}

export default Profile;
