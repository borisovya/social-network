import {AuthAPI} from "../API/API";
import { Dispatch} from "redux";


export type DataType = {
    id: number | null
    login: string | null
    email: string | null
}

type authStateType = {
    data: DataType
    messages: Array<string>
    friends: Array<string>
    resultCode: number
    isFetching: boolean
    isAuth: boolean
}

let initialState = {
    data: {
        id: null,
        login: null,
        email: null
    },
    messages: [],
    friends: [],
    resultCode: 0,
    isFetching: false,
    isAuth: false
}

type AuthDataType = setAuthUserDataACType

export const authReducer = (state: authStateType = initialState, action: AuthDataType) => {

    switch (action.type) {
        case 'SET-AUTH-USER-DATA':

            return {...state, data: action.data , isAuth: true}

        default:
            return state
    }
}


export type setAuthUserDataACType = ReturnType<typeof setAuthUserData>
const setAuthUserData = (data: DataType) => {
    return ({type: 'SET-AUTH-USER-DATA', data: data}) as const
}

export const getAuthUserData = () => {
    return(dispatch: Dispatch ) => {
        AuthAPI.me()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserData(response.data.data))
                }
            })
    }
}



