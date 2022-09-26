import React from 'react'
import {connect} from "react-redux";
import {
    changeCurrentPage,
    follow, setTotalUsersCount,
    setUsers, toggleFollowingInProgress, toggleIsFetching,
    unFollow,
    UsersType
} from "../../Redux/users-reduser";
import {RootStateType} from "../../Redux/redux-store";
import Users from "./Users";
import Preloader from "../Common/Preloader";
import {UsersAPI} from "../../API/API";


export type mapStateToPropsPropsType = {
    users: Array<UsersType>
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean
    isFollowingInProgress: number[]
}
export type mapDispatchToPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: Array<UsersType>) => void
    changeCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    toggleFollowingInProgress: (toggleFetching: boolean, userId: number)=>void
}

type TestType = {
    users: Array<UsersType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    isFollowingInProgress: number[]
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: Array<UsersType>) => void
    changeCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    toggleFollowingInProgress: (toggleFetching: boolean, userId: number)=>void
}

export type UsersGeneralType = mapStateToPropsPropsType & mapDispatchToPropsType

class UsersContainer extends React.Component<TestType> {


    componentDidMount(): void {
        this.props.toggleIsFetching(true)
        UsersAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount)
            });

    }

    onPageChange = (pageNumber: number) => {
        this.props.toggleIsFetching(true)
        this.props.changeCurrentPage(pageNumber)
        UsersAPI.getUsers(pageNumber, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
            });
    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : null}

            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChange={this.onPageChange}
                users={this.props.users}
                follow={this.props.follow}
                unFollow={this.props.unFollow}
                toggleFollowingInProgress = {this.props.toggleFollowingInProgress}
                isFollowingInProgress = {this.props.isFollowingInProgress}
            />

        </>
    }
}

let mapStateToProps = (state: RootStateType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        isFollowingInProgress: state.usersPage.isFollowingInProgress
    }
}


export default connect(mapStateToProps, {
    follow,
    unFollow,
    setUsers,
    changeCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
    toggleFollowingInProgress
})(UsersContainer)