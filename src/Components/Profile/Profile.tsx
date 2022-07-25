import React from "react";
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";


const Profile = () => {
    return <div className={s.content}>
        <img src='https://upload.wikimedia.org/wikipedia/commons/8/8f/Wide_San_Diego_Night.jpg'/>
        <div>
            <a>Ava + description</a>
        </div>
        <MyPosts />
    </div>
}

export default Profile;