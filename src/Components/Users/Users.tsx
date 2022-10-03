import React from 'react'
import s from "./UsersStyle.module.css";
import userDefaultPhoto from "../../asseds/imgs/profileDefaultPic.png";
import {UsersType} from "../../Redux/users-reduser";
import {NavLink} from "react-router-dom";


type propsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChange: (pageNumber: number) => void
    users: Array<UsersType>
    following: (userId: number) => void
    unFollowing: (userId: number) => void
    isFollowingInProgress: number[]

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
        {props.users.map(u => <div key={u.id}>
            <span>
                <div>
                    <NavLink to={'/profile/' + u.id}>
                        <img src={u.photos.small != null ? u.photos.small : userDefaultPhoto} className={s.photo}/>
                     </NavLink>
                </div>
                <div>
                    {u.followed
                        ? <button onClick={() => {
                            props.unFollowing(u.id)
                        }}
                                  disabled={props.isFollowingInProgress.some(id => id === u.id)}>Unfollow</button>

                        : <button onClick={() => {
                            props.following(u.id)
                        }}
                                  disabled={props.isFollowingInProgress.some(id => id === u.id)}>Follow</button>}
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