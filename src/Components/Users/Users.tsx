import React from 'react'
import s from "./UsersStyle.module.css";
import userDefaultPhoto from "../../asseds/imgs/profileDefaultPic.png";
import {UsersType} from "../../Redux/users-reduser";


type propsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChange: (pageNumber: number) => void
    users: Array<UsersType>
    follow: (userId: string)=> void
    unFollow: (userId: string)=> void
}

const Users = (props: propsType) => {

    let pagesCount: number = Math.ceil(props.totalUsersCount / props.pageSize)
    
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        <div>
            {pages.map(p => {
                return <span onClick={(event) => {
                    props.onPageChange(p)
                }} className={props.currentPage === p ? s.selectedPage : ''}>{p}</span>
            })}
        </div>
        { props.users.map(u => <div key={u.id}>
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

export default Users