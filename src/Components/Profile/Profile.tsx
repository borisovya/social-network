import React from "react";
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./Profileinfo/Profileinfo";
import {PostsType, ProfilePage} from "../../Redux/State";

type ProfileComponentType = {
    state: ProfilePage
    addPost: (postMessage:string)=>void
}

const Profile = (props:ProfileComponentType ) => {
    return <div>
        <ProfileInfo />

        <MyPosts posts={props.state.posts} addPost={props.addPost}/>
    </div>
}

export default Profile;