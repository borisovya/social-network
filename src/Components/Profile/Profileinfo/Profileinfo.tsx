import React, {ChangeEvent} from "react";
import s from './Profileinfo.module.css'
import defaultPhoto from "../../../asseds/imgs/profileDefaultPic.png";
import {ProfileType} from "../../../Redux/profile-reducer";
import ProfileStatusWithHooks from "../ProfileStatusWithHooks";

type PropsType = {
    profile: ProfileType
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photo: File)=>void
}

const ProfileInfo = (props: PropsType) => {

    const onImgChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files !== null){
            props.savePhoto(e.target.files[0])
        }
    }

    return <div>
        <div className={s.descriptionBlock}>
            <img src={props.profile.photos.large != null ? props.profile.photos.large : defaultPhoto} alt='#' className={s.mainPhoto}/>
            {props.isOwner && <input type={'file'} onChange={onImgChangeHandler}/>}
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