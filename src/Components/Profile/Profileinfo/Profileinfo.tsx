import React from "react";
import s from './Profileinfo.module.css'
import defaultPhoto from "../../../asseds/imgs/profileDefaultPic.png";
import {ProfileType} from "../../../Redux/profile-reducer";


type PropsType = {
    profile: ProfileType
}

const ProfileInfo = (props: PropsType) => {

    return <div>
        <div>
            <img src='https://upload.wikimedia.org/wikipedia/commons/8/8f/Wide_San_Diego_Night.jpg'
                 className={s.headImg}/>
        </div>
        <div className={s.descriptionBlock}>
            <img src ={props.profile.photos.large !=null ? props.profile.photos.large : defaultPhoto} alt='#' />
            <div>
                <h3> Name: {props.profile.fullName} </h3>
                <div> About Me: {props.profile.aboutMe}</div>
                <div> Work Status: {props.profile.lookingForAJobDescription}</div>
            </div>
        </div>

    </div>
}

export default ProfileInfo;