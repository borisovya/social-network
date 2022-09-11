import React from 'react'
import {usersGeneralType} from "./UsersContainer";
import s from './UsersStyle.module.css'
import {v1} from "uuid";


export const Users = (props: usersGeneralType) => {

    if(props.users.length === 0) {
    props.setUsers([
        {
            id: v1(),
            profilePhotoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZMWfuXqA8b5n_7M9AmclNpDj9j8a-f_q7gw&usqp=CAU',
            followed: true,
            fullName: 'Dmitry K',
            status: 'Big Boss',
            location: {city: 'Minsk', country: 'Belarus'}
        },
        {
            id: v1(),
            profilePhotoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZMWfuXqA8b5n_7M9AmclNpDj9j8a-f_q7gw&usqp=CAU',
            followed: false,
            fullName: 'Vladimir B',
            status: 'Engineer',
            location: {city: 'Moscow', country: 'Russia'}
        },
        {
            id: v1(),
            profilePhotoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6c4-LUiQp5XFO8jNaR4qMcezpWSsfXbX7zg&usqp=CAU',
            followed: false,
            fullName: 'Anastasia Z',
            status: 'Affiliate',
            location: {city: 'Moscow', country: 'Russia'}
        },
        {
            id: v1(),
            profilePhotoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZMWfuXqA8b5n_7M9AmclNpDj9j8a-f_q7gw&usqp=CAU',
            followed: false,
            fullName: 'Dmitriy A',
            status: 'Prosto-okna-potolki',
            location: {city: 'Stepankovo', country: 'Russia'}
        }
    ])
    }
    return <div>
        {
            props.users.map(u => <div key={u.id}>
            <span>
                <div>
                    <img src={u.profilePhotoUrl} className={s.photo}/>
                </div>
                <div>
                    {u.followed ? <button onClick={() => props.unFollow(u.id)}>Unfollow</button> :
                        <button onClick={() => props.follow(u.id)}>Follow</button>}
                </div>
            </span>
                <span>
                    <span>
                        <div>{u.fullName}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </span>
                </span>
            </div>)}
    </div>
}