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
    responseError: null | string
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
    isInitialized: false,
    responseError: null
}

type AuthDataType = setAuthUserDataACType | setInitializedACType | setResponseErrorACType

export const authReducer = (state: authStateType = initialState, action: AuthDataType) => {

    switch (action.type) {
        case 'SET-AUTH-USER-DATA':
            return {...state, data: action.payload.data, isAuth: action.payload.isAuth}
        case 'SET-INITIALIZED':
            return {...state, isInitialized: action.payload.isInitialized}
        case 'SET-RESPONSE-ERROR':
            return {...state, responseError: action.message}
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

export type setResponseErrorACType = ReturnType<typeof setResponseError>
const setResponseError = (message: string) => {
    return ({type: 'SET-RESPONSE-ERROR', message}) as const
}

export const getAuthUserData = (): AppThunkType => async dispatch => {
    try {
        const response = await AuthAPI.me()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(response.data.data, true))
        }
    } catch (error) {
        console.log(error)
    } finally {
        dispatch(setInitialized())
    }
}

// export const getAuthUserData = () => {
//     return (dispatch: Dispatch<AuthDataType>) => {
//
//         AuthAPI.me()
//             .then(response => {
//                 if (response.data.resultCode === 0) {
//                     dispatch(setAuthUserData(response.data.data, true))
//                 }
//             })
//             .catch((e) => {
//                 console.log(e)
//             })
//             .finally(() => {
//                 dispatch(setInitialized())
//             })
//     }
// }

export const login = (email: string, password: string, rememberMe: boolean): AppThunkType => async dispatch => {
    try {
        const response = await AuthAPI.login(email, password, rememberMe)
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else if (response.data.resultCode === 1) {
            dispatch(setResponseError(response.data.messages[0]))
            console.log(response.data.messages[0])
        } else {
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
            console.log(message)
        }
    } catch (error) {
        console.log(error)
    }
}

// export const logout2 = () => {
//     return (dispatch: Dispatch<AuthDataType>) => {
//         AuthAPI.logout()
//             .then(response => {
//                 if (response.data.resultCode === 0) {
//                     dispatch(setAuthUserData({...response.data, id: null, email: null, login: null}, false))
//                 }
//             })
//     }
// }

export const logout = (): AppThunkType => async dispatch => {
    try {
        const response = await AuthAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData({...response.data, id: null, email: null, login: null}, false))
        }
    } catch (error) {
        console.log(error)
    }
}





