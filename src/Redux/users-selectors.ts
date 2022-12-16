import {RootStateType} from "./redux-store";

export const getUsersSelect = (state: RootStateType) => {
    return state.usersPage.users
}

export const getPageSizeSelect = (state: RootStateType) => {
    return state.usersPage.pageSize
}

export const getUserCount = (state: RootStateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: RootStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: RootStateType) => {
    return state.usersPage.isFetching
}

export const getIsFollowingInProgress = (state: RootStateType) => {
    return state.usersPage.isFollowingInProgress
}