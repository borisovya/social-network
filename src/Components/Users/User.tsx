import React from 'react'
import s from "./UsersStyle.module.css";
import userDefaultPhoto from "../../asseds/imgs/profileDefaultPic.png";
import {UsersType} from "../../Redux/users-reducer";
import {NavLink} from "react-router-dom";


type propsType = {
    user: UsersType
    isFollowingInProgress: number[]
    unFollowing: (id: number)=> void
    following: (id: number)=> void
}

const User = ({user, isFollowingInProgress, unFollowing, following}: propsType) => {
    return <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : userDefaultPhoto} className={s.photo}/>
                     </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button onClick={() => {
                            unFollowing(user.id)
                        }}
                                  disabled={isFollowingInProgress.some(id => id === user.id)}>Unfollow</button>

                        : <button onClick={() => {
                            following(user.id)
                        }}
                                  disabled={isFollowingInProgress.some(id => id === user.id)}>Follow</button>}
                </div>
            </span>
            <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    <span>
                        <div>{"user.location.country"}</div>
                        <div>{"user.location.city"}</div>
                    </span>
                </span>
        </div>
}

export default User