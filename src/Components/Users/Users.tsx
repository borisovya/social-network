import React from 'react'
import {usersGeneralType} from "./UsersContainer";
import s from './UsersStyle.module.css'
import axios from "axios";
import userDefaultPhoto from '../../asseds/imgs/profileDefaultPic.png'


export const Users = (props: usersGeneralType) => {
    let getUsers = () => {
        if (props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                props.setUsers(response.data.items)
            })
        }
    }

    return <div>
        <button onClick={getUsers}>Get Users</button>
        {
            props.users.map(u => <div key={u.id}>
            <span>
                <div>
                    <img src={u.photos.small != null ? u.photos.small : userDefaultPhoto} className={s.photo}/>
                </div>
                <div>
                    {u.followed ? <button onClick={() => props.unFollow(u.id)}>Unfollow</button> :
                        <button onClick={() => props.follow(u.id)}>Follow</button>}
                </div>
            </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>
            </div>)}
    </div>
}