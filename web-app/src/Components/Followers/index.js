import axios from 'axios';
import './Styles.css';
import { useState, useEffect } from 'react';


function Followers({requestedUser}) {

    const [followersInfo, updateFollowersInfo] = useState([]);

    

    useEffect(() => {
        if(followersInfo.length === 0 && requestedUser.followersList.length>0){
            requestedUser.followersList.forEach((follower) => {
                axios.get('http://localhost:8080/user/getinfo/' + follower).then((response) => {
                    console.log(response.data.user.password);
                    updateFollowersInfo(arr => [...arr, [follower, response.data.user.photoURL, (response.data.user.firstName + " " + response.data.user.lastName),response.data.user.bio]]);
                });
            });
        }
    }, [requestedUser]);



    return (
        <div className="Followers">
            <div className="Followers-div">
                {followersInfo?.map((follower) => {
                    return (
                        <div key={follower[0]} >
                            <a className="Followers-container" href={"http://localhost:3000/profile/" + follower[0]}>
                                <img id='friend-icon' alt="Friend Icon" src={follower[1]} />
                                <div className="friend-info">
                                    <p id ='friend-name'>{follower[2]}</p>
                                    <p id='friend-nick'>@{follower[0]}</p>
                                    <p id='friend-bio'>{follower[3]}</p>
                                </div>
                                
                            </a>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}

export default Followers;