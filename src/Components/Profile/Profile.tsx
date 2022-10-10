import React from "react";
import ProfileInfo from "./Profileinfo/Profileinfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {PropsProfileType} from "./ProfileContainer";
import Preloader from "../Common/Preloader";




const Profile = (props: PropsProfileType) => {

    if (!props.profile) {
        return <Preloader />
    }


    return <div>

        <ProfileInfo profile={props.profile}
                     status={props.status}
                     updateUserStatus={props.updateUserStatus}/>
        <MyPostsContainer />

    </div>
}

export default Profile;