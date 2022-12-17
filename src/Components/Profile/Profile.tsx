import React from "react";
import ProfileInfo from "./Profileinfo/Profileinfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {PropsProfileType} from "./ProfileContainer";
import Preloader from "../Common/Preloader";

const Profile = (props: PropsProfileType) => {

    if (!props.profile) {
        return <div style={{textAlign: 'center'}}><Preloader/></div>
    }

    return <div>
        <ProfileInfo
            isOwner={!props.match.params.userId}
            profile={props.profile}
            status={props.status}
            updateUserStatus={props.updateUserStatus}
            savePhoto={props.savePhoto}
        />
        <MyPostsContainer/>
    </div>
}

export default Profile;