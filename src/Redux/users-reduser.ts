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
    fullName: string
    status: string
    location: LocationType
    followed: boolean
    profilePhotoUrl: string
}

// export type ProfileReducerInitStateType = typeof initialState


let initialState = {
    users: [
        // {id: v1(), profilePhotoUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZMWfuXqA8b5n_7M9AmclNpDj9j8a-f_q7gw&usqp=CAU', followed: true, fullName: 'Dmitry K', status: 'Big Boss', location: {city: 'Minsk', country: 'Belarus'}},
        // {id: v1(), profilePhotoUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZMWfuXqA8b5n_7M9AmclNpDj9j8a-f_q7gw&usqp=CAU', followed: false, fullName: 'Vladimir B', status: 'Engineer', location: {city: 'Moscow', country: 'Russia'}},
        // {id: v1(), profilePhotoUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6c4-LUiQp5XFO8jNaR4qMcezpWSsfXbX7zg&usqp=CAU', followed: false, fullName: 'Anastasia Z', status: 'Affiliate', location: {city: 'Moscow', country: 'Russia'}},
        // {id: v1(), profilePhotoUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZMWfuXqA8b5n_7M9AmclNpDj9j8a-f_q7gw&usqp=CAU', followed: false, fullName: 'Dmitriy A', status: 'Prosto-okna-potolki', location: {city: 'Stepankovo', country: 'Russia'}}
    ] as Array<UsersType>,
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