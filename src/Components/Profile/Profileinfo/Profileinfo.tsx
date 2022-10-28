import React, {useState} from "react";
import s from './Profileinfo.module.css'
import defaultPhoto from "../../../asseds/imgs/profileDefaultPic.png";
import {ProfileType} from "../../../Redux/profile-reducer";
import ProfileStatus from "../ProfileStatus";
import ProfileStatusWithHooks from "../ProfileStatusWithHooks";


type PropsType = {
    profile: ProfileType
    status: string
    updateUserStatus: (status: string) => void
}

const ProfileInfo = (props: PropsType) => {

    // const[mode, setMode] = useState<boolean>(false)
    // const[status, setStatus] = useState<string>('Hello dude')
    //
    // const onChange = (newStatus: string)=> {
    //     setStatus(newStatus)
    // }
    //
    // const changeMode =() => {
    //     setMode(!mode)
    // }

    return <div>
        {/*<div>*/}
        {/*    <img src='https://upload.wikimedia.org/wikipedia/commons/8/8f/Wide_San_Diego_Night.jpg'*/}
        {/*         className={s.headImg}/>*/}
        {/*</div>*/}
        <div className={s.descriptionBlock}>

            <img src ={props.profile.photos.large !=null ? props.profile.photos.large : defaultPhoto} alt='#' />
            {/*<ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus}/>*/}
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