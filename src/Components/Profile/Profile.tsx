import React from "react";
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./Profileinfo/Profileinfo";
import {AddPostActionType, ProfilePage} from "../../Redux/State";


type ProfileComponentType = {
    state: ProfilePage
    dispatch: (action: AddPostActionType)=>void

}

const Profile = (props:ProfileComponentType ) => {
    return <div>
        <ProfileInfo />

        <MyPosts posts={props.state.posts} dispatch={props.dispatch} />
    </div>
}

export default Profile;