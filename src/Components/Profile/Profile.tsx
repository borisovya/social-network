import React from "react";
import ProfileInfo from "./Profileinfo/Profileinfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {AddPostActionType, ProfileReducerInitStateType} from "../../Redux/profile-reducer";
import {AnyAction, Dispatch} from "redux";



type ProfileComponentType = {
    profilePage: ProfileReducerInitStateType
    dispatch: Dispatch<AnyAction>
}

const Profile = (props:ProfileComponentType ) => {
    return <div>
        <ProfileInfo />

        <MyPostsContainer posts={props.profilePage.posts} dispatch={props.dispatch}/>

    </div>
}

export default Profile;