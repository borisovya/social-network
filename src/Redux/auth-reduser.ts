import {AuthAPI} from "../API/API";
import {Dispatch} from "redux";
import {AppThunkType} from "./redux-store";


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
    isInitialized: boolean
}

let initialState: authStateType = {
    data: {
        id: null,
        login: null,
        email: null
    },
    messages: [],
    friends: [],
    resultCode: 0,
    isFetching: false,
    isAuth: false,
    isInitialized: false
}

type AuthDataType = setAuthUserDataACType | setInitializedACType

export const authReducer = (state: authStateType = initialState, action: AuthDataType) => {

    switch (action.type) {
        case 'SET-AUTH-USER-DATA':
            return {...state, data: action.payload.data, isAuth: action.payload.isAuth}
        case 'SET-INITIALIZED':
            return {...state, isInitialized: action.payload.isInitialized}
        default:
            return state
    }
}


export type setAuthUserDataACType = ReturnType<typeof setAuthUserData>
const setAuthUserData = (data: DataType, isAuth: boolean) => {
    return ({type: 'SET-AUTH-USER-DATA', payload: {data, isAuth}}) as const
}

export type setInitializedACType = ReturnType<typeof setInitialized>
const setInitialized = () => {
    return ({type: 'SET-INITIALIZED', payload: {isInitialized: true}}) as const
}


//thunks
export const getAuthUserData = () => {
    return (dispatch: Dispatch<AuthDataType>) => {

        AuthAPI.me()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserData(response.data.data, true))
                }
            })
            .catch((e)=>{
                console.log(e)})
            .finally(() => {
                dispatch(setInitialized())
        })
    }
}


export const login = (email: string, password: string, rememberMe: boolean): AppThunkType => async dispatch => {
    try {
        const response = await AuthAPI.login(email, password, rememberMe)
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            let message = response.data.messages.length>0 ? response.data.messages[0] : 'Some error'
            console.log(message)
        }
    } catch (error) {
        console.log(error)
    }

}

export const logout = () => {
    return (dispatch: Dispatch<AuthDataType>) => {
        AuthAPI.logout()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserData({...response.data, id: null, email: null, login: null}, false))
                }
            })
    }
}



