import React from 'react'
import {Users} from "./Users";
import {connect} from "react-redux";
import {followAC, setUsersAC, unFollowAC, UsersType} from "../../Redux/users-reduser";
import {RootStateType} from "../../Redux/redux-store";
import {AnyAction, Dispatch} from "redux";

type mapStateToPropsPropsType = {
    users: Array<UsersType>
}
type mapDispatchToPropsType = {
    follow: (userId: string)=> void
    unFollow: (userId: string)=> void
    setUsers: (users: Array<UsersType>)=> void
}

export type usersGeneralType = mapStateToPropsPropsType & mapDispatchToPropsType

let mapStateToProps = (state: RootStateType) => {
    return {users: state.usersPage.users}
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)