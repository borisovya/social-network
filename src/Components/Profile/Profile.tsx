import React from "react";
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./Profileinfo/Profileinfo";
import {ProfilePage} from "../../Redux/State";

type ProfileComponentType = {
    state: ProfilePage
}

const Profile = (props:ProfileComponentType ) => {
    return <div>
        <ProfileInfo />

        <MyPosts posts={props.state.posts} />
    </div>
}

export default Profile;