import React, {useEffect} from "react";
import ProfileInfo from "./Profileinfo/Profileinfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {PropsProfileType} from "./ProfileContainer";
import Preloader from "../Common/Preloader";



const Profile = (props:PropsProfileType) => {

    if (!props.profile) {
        return <Preloader />
    }


    return <div>

        <ProfileInfo profile={props.profile}/>
        <MyPostsContainer />

    </div>
}

export default Profile;