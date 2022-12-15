import React from 'react'
import {UsersType} from "../../Redux/users-reducer";
import Paginator from "../Common/Paginator";
import User from "./User";


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

const Users = ({
                   currentPage,
                   onPageChange,
                   totalUsersCount,
                   pageSize,
                   users,
                   isFollowingInProgress,
                   unFollowing,
                   following,
               }: propsType) => {


    return <div>
        <div>
            <Paginator onPageChange={onPageChange} totalItemsCount={totalUsersCount} pageSize={pageSize}
                       currentPage={currentPage}/>
        </div>
        <div>
            {users.map(u => <User key={u.id}
                                  user={u}
                                  isFollowingInProgress={isFollowingInProgress}
                                  unFollowing={unFollowing}
                                  following={following}/>)}
        </div>
    </div>
}

export default Users