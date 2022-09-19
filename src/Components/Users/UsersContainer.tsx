import React from 'react'
import {connect} from "react-redux";
import {
    changeCurrentPageAC,
    followAC, setTotalUsersCountAC,
    setUsersAC,
    unFollowAC,
    UserPageType,
    UsersType
} from "../../Redux/users-reduser";
import {RootStateType} from "../../Redux/redux-store";
import {AnyAction, Dispatch} from "redux";
import Users from "./Users";

export type mapStateToPropsPropsType = {
    users: Array<UsersType>
    pageSize: number,
    totalUsersCount: number,
    currentPage: number
}
export type mapDispatchToPropsType = {
    follow: (userId: string)=> void
    unFollow: (userId: string)=> void
    setUsers: (users: Array<UsersType>)=> void
    changeCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
}

export type UsersGeneralType = mapStateToPropsPropsType & mapDispatchToPropsType

let mapStateToProps = (state: RootStateType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
}

let mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return {
        follow: (userId: string) => {
            dispatch(followAC(userId))
        },
        unFollow: (userId: string)=> {
            dispatch(unFollowAC(userId))
        },
        setUsers: (users: Array<UsersType>)=>{
            dispatch(setUsersAC(users))
        },
        changeCurrentPage: (currentPage: number)=>{
            dispatch(changeCurrentPageAC(currentPage))
        },
        setTotalUsersCount: (totalUsersCount: number)=>{
            dispatch(setTotalUsersCountAC(totalUsersCount))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)