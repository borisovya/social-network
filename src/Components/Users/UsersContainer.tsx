import React from 'react'
import {connect} from "react-redux";
import {
    changeCurrentPage,
     following, getUsers, setTotalUsersCount,
    setUsers, toggleFollowingInProgress, toggleIsFetching,
     unFollowing,
    UsersType
} from "../../Redux/users-reducer";
import {RootStateType} from "../../Redux/redux-store";
import Users from "./Users";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {
    getCurrentPage,
    getIsFetching, getIsFollowingInProgress,
    getPageSizeSelect,
    getUserCount,
    getUsersSelect
} from "../../Redux/users-selectors";

type UserContainerType = {
    users: Array<UsersType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    isFollowingInProgress: number[]
    following: (userId: number) => void
    unFollowing: (userId: number) => void
    setUsers: (users: Array<UsersType>) => void
    changeCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

class UsersContainer extends React.Component<UserContainerType> {

    componentDidMount(): void {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChange = (pageNumber: number) => {

        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return <>
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChange={this.onPageChange}
                users={this.props.users}
                following={this.props.following}
                unFollowing={this.props.unFollowing}
                isFollowingInProgress = {this.props.isFollowingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: RootStateType) => {
    return {
        users: getUsersSelect(state),
        pageSize: getPageSizeSelect(state),
        totalUsersCount: getUserCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowingInProgress: getIsFollowingInProgress(state)
    }
}

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, {
        setUsers,changeCurrentPage,setTotalUsersCount,toggleIsFetching,
        toggleFollowingInProgress,getUsers,following,unFollowing}))
    (UsersContainer)