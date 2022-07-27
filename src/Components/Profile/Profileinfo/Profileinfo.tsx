import React from "react";
import s from './Profileinfo.module.css'



const ProfileInfo = () => {
    return <div>
        <div>
            <img src='https://upload.wikimedia.org/wikipedia/commons/8/8f/Wide_San_Diego_Night.jpg'
                 className={s.headImg}/>
        </div>
        <div className={s.descriptionBlock}>
            <a>Ava + description</a>
        </div>

    </div>
}

export default ProfileInfo;