import {UsersAPI} from "../API/API";

import {Dispatch} from "redux";




export type UserPageType = {
    users: Array<UsersType>
    pageSize: number,
    totalUsersCount: number,
    currentPage: number
    isFetching: boolean
    isFollowingInProgress: number[]
}

export type LocationType = {
    city: string
    country: string
}

export type UsersType = {
    id: number
    name: string
    status: string
    location: LocationType
    followed: boolean
    photos: PhotoType
}

type PhotoType = {
    small: string | null
    large: string | null
}


let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    isFollowingInProgress: []
}

type UsersReducerType = followACType | unFollowACType | setUsersACType | changeCurrentPageACType | setTotalUsersCountACType | toggleIsFetchingACType | toggleFollowingInProgressACType

export const usersReducer = (state: UserPageType = initialState, action: UsersReducerType): UserPageType  => {

    switch (action.type) {
        case 'FOLLOW':
            return {...state, users: state.users.map(el=>el.id === action.userId ? {...el, followed: true} : el)}
        case 'UNFOLLOW':
            return {...state, users: state.users.map(el=>el.id === action.userId ? {...el, followed: false} : el)}
        case 'SET-USERS':
            return {...state, users: action.users}
        case 'CHANGE-CURRENT-PAGE':
            return {...state, currentPage: action.currentPage}
        case 'SET-TOTAL-USERS-COUNT':
            return {...state, totalUsersCount: action.totalUsersCount}
        case 'TOGGLE-IS-FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'TOGGLE-FOLLOWING-IN-PROGRESS':
            return {...state, isFollowingInProgress: action.toggleFetching
                    ? [...state.isFollowingInProgress, action.userId]
                    : state.isFollowingInProgress.filter(id => id !== action.userId)
            }
        default:
            return initialState
    }
}

export const follow = (userId: number) => {
    return ({type: 'FOLLOW', userId: userId}) as const
}

export const unFollow = (userId: number)=> {
    return ({type: 'UNFOLLOW', userId: userId}) as const
}

export const setUsers = (users: Array<UsersType>)=> {
    return ({type: 'SET-USERS', users: users}) as const
}

export const changeCurrentPage = (currentPage: number)=> {
    return ({type: 'CHANGE-CURRENT-PAGE', currentPage: currentPage}) as const
}

export const setTotalUsersCount = (totalUsersCount: number)=> {
    return ({type: 'SET-TOTAL-USERS-COUNT', totalUsersCount: totalUsersCount}) as const
}

export const toggleIsFetching = (isFetching: boolean)=> {
    return ({type: 'TOGGLE-IS-FETCHING', isFetching: isFetching}) as const
}

export const toggleFollowingInProgress = (toggleFetching: boolean, userId: number)=> {
    return ({type: 'TOGGLE-FOLLOWING-IN-PROGRESS', toggleFetching, userId}) as const
}



export const getUsers = (page: number, pageSize: number) => {

    return (dispatch: Dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(changeCurrentPage(page))
        UsersAPI.getUsers(page, pageSize)
            .then(data => {
                dispatch(toggleIsFetching(false))
                dispatch(setUsers(data.items))
                dispatch(setTotalUsersCount(data.totalCount))
            });
    }
}


export const following = (userId: number) => {

    return (dispatch: Dispatch) => {
        dispatch(toggleFollowingInProgress(true, userId))
        UsersAPI.followUser(userId)
            .then(data => {
                if (data.resultCode == 0) {
                    dispatch(follow(userId))
                }
                dispatch(toggleFollowingInProgress(false, userId))
            })
    }
}


export const unFollowing = (userId: number) => {

    return (dispatch: Dispatch) =>  {
        dispatch(toggleFollowingInProgress(true, userId))
        UsersAPI.unFollowUser(userId)
            .then(data => {
                if (data.resultCode == 0) {
                    dispatch(unFollow(userId))
                }
                dispatch(toggleFollowingInProgress(false, userId))
            })
    }
}


export type followACType = ReturnType<typeof follow>
export type unFollowACType = ReturnType<typeof unFollow>
export type setUsersACType = ReturnType<typeof setUsers>
export type changeCurrentPageACType = ReturnType<typeof changeCurrentPage>
export type setTotalUsersCountACType = ReturnType<typeof setTotalUsersCount>
export type toggleIsFetchingACType = ReturnType<typeof toggleIsFetching>
export type toggleFollowingInProgressACType = ReturnType<typeof toggleFollowingInProgress>
