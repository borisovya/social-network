import {v1} from "uuid";

export type UserPageType = {
    users: Array<UsersType>
}

export type LocationType = {
    city: string
    country: string
}

export type UsersType = {
    id: string
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
// export type ProfileReducerInitStateType = typeof initialState


let initialState = {
    users: [] ,
}

type UsersReducerType = followACType | unFollowACType | setUsersACType

export const usersReducer = (state: UserPageType = initialState, action: UsersReducerType)  => {

    switch (action.type) {
        case 'FOLLOW':
            return {...state, users: state.users.map(el=>el.id === action.userId ? {...el, followed: true} : el)}
        case 'UNFOLLOW':
            return {...state, users: state.users.map(el=>el.id === action.userId ? {...el, followed: false} : el)}
        case 'SET-USERS':
            return {...state, users: [...state.users, ...action.users]}
        default:
            return initialState
    }
}

export const followAC = (userId: string) => {
    return ({type: 'FOLLOW', userId: userId}) as const
}

export const unFollowAC = (userId: string)=> {
    return ({type: 'UNFOLLOW', userId: userId}) as const
}

export const setUsersAC = (users: Array<UsersType>)=> {
    return ({type: 'SET-USERS', users: users}) as const
}

export type followACType = ReturnType<typeof followAC>
export type unFollowACType = ReturnType<typeof unFollowAC>
export type setUsersACType = ReturnType<typeof setUsersAC>