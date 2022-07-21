import React from "react";
import './Profile.css'


const Profile = () => {
    return <div className='content'>
        <img src='https://upload.wikimedia.org/wikipedia/commons/8/8f/Wide_San_Diego_Night.jpg' />
        <div>
            <a>Ava + descrips</a>
        </div>
        <div>
            <a>My posts</a>
            <div>
                <a>New post</a>
            </div>
        </div>
        <div className='posts'>
            <div className='item'>
                Post 1
            </div>
            <div className='item'>
                Post 2
            </div>
        </div>
    </div>
}

export default Profile;