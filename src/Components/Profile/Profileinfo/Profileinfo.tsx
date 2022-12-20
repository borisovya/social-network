import React, {ChangeEvent, useState} from "react";
import s from './Profileinfo.module.css'
import defaultPhoto from "../../../asseds/imgs/profileDefaultPic.png";
import {ContactsType, ProfileType} from "../../../Redux/profile-reducer";
import ProfileStatusWithHooks from "../ProfileStatusWithHooks";
import {ProfileDataForm} from "./ProfileDataForm";

type PropsType = {
    profile: ProfileType
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photo: File) => void
}

const ProfileInfo = (props: PropsType) => {

    const [editMode, setEditMode] = useState(false)

    const onImgChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null) {
            props.savePhoto(e.target.files[0])
        }
    }

    return <div>
        <div className={s.descriptionBlock}>
            <img src={props.profile.photos.large != null ? props.profile.photos.large : defaultPhoto} alt='#'
                 className={s.mainPhoto}/>
            {props.isOwner && <input type={'file'} onChange={onImgChangeHandler}/>}

            <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus}/>

            {editMode ? <ProfileDataForm profile={props.profile} activateEditMode={()=>setEditMode(false)}/> :
                <ProfileData profile={props.profile} isOwner={props.isOwner} activateEditMode={()=>{setEditMode(true)}}/>}
        </div>
    </div>
}

export default ProfileInfo;

type ContactType = {
    contactTitle: string,
    contactValue: string | null | undefined
}

export const Contacts = ({contactTitle, contactValue}: ContactType) => {
    return <div className={s.contact}>
        <b>{contactTitle}</b>: <b>{contactValue}</b>
    </div>
}


type IncomingProfileType = {
    profile: ProfileType
    isOwner?: boolean
    activateEditMode?: () => void
}

export const ProfileData = ({profile, isOwner, activateEditMode}: IncomingProfileType) => {
    return <div>
        {isOwner && <div>
            <button onClick={activateEditMode}>Edit</button>
        </div>}
        <h3><b>Full name</b>: {profile.fullName} </h3>
        <div><b>About Me </b>: {profile.aboutMe}</div>
        <div><b>Contacts </b>: {profile.contacts && Object.keys(profile.contacts).map((key) => {
            return <Contacts key={key} contactTitle={key}
                             contactValue={profile.contacts && profile.contacts[key as keyof ContactsType]}/>
        })}</div>
        <div><b>Looking for a job </b>: {profile.lookingForAJob ? 'Yes' : 'No'}</div>
        {profile.lookingForAJob && <div><b>My skills </b>: {profile.lookingForAJobDescription}</div>}
    </div>
}