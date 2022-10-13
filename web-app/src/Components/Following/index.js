import axios from 'axios';
import './Styles.css';
import { useState, useEffect } from 'react';


function Following({requestedUser}) {

    const [followingInfo, updateFollowingInfo] = useState([]);

    

    useEffect(() => {
        if(followingInfo.length === 0 && requestedUser.followingList.length>0){
            requestedUser.followingList.forEach((follower) => {
                axios.get('http://localhost:8080/user/getinfo/' + follower).then((response) => {
                    updateFollowingInfo(arr => [...arr, [follower, response.data.user.photoURL, (response.data.user.firstName + " " + response.data.user.lastName),response.data.user.bio]]);
                });
            });
        }
    }, [requestedUser]);

    return (
        <div className="Following">
            <div className="Following-div">
                {followingInfo?.map((follower) => {
                    return (
                        <div key={follower[0]} >
                            <a className="Following-container" href={"http://localhost:3000/profile/" + follower[0]}>
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

export default Following;