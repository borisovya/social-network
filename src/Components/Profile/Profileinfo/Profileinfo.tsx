import React from "react";
import s from './Profileinfo.module.css'
import defaultPhoto from "../../../asseds/imgs/profileDefaultPic.png";
import {ProfileType} from "../../../Redux/profile-reducer";
import ProfileStatusWithHooks from "../ProfileStatusWithHooks";


type PropsType = {
    profile: ProfileType
    status: string
    updateUserStatus: (status: string) => void
}

const ProfileInfo = (props: PropsType) => {

    return <div>
        <div className={s.descriptionBlock}>
            <img src={props.profile.photos.large != null ? props.profile.photos.large : defaultPhoto} alt='#'/>
            <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus}/>
            <div>
                <h3> Name: {props.profile.fullName} </h3>
                <div> About Me: {props.profile.aboutMe}</div>
                <div> Work Status: {props.profile.lookingForAJobDescription}</div>
            </div>
        </div>

    </div>
}

export default ProfileInfo;