import {AuthAPI, securityAPI} from "../API/API";
import {AppThunkType} from "./redux-store";
import axios from "axios";

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
    captchaUrl: undefined | string
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
    responseError: null,
    captchaUrl: undefined
}

type AuthDataType = setAuthUserDataACType | setInitializedACType | setResponseErrorACType | getCaptchaUrlSuccessACType

export const authReducer = (state: authStateType = initialState, action: AuthDataType) => {

    switch (action.type) {
        case 'SET-AUTH-USER-DATA':
            return {...state, data: action.payload.data, isAuth: action.payload.isAuth}
        case 'SET-INITIALIZED':
            return {...state, isInitialized: action.payload.isInitialized}
        case 'SET-RESPONSE-ERROR':
            return {...state, responseError: action.message}
        case "GET-CAPTCHA-URL-SUCCESS":
            return {...state, captchaUrl:action.payload.url}
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

export type getCaptchaUrlSuccessACType = ReturnType<typeof getCaptchaUrlSuccessAC>
const getCaptchaUrlSuccessAC = (url: string) => {
    return ({type: 'GET-CAPTCHA-URL-SUCCESS', payload:{url}}) as const
}

export const getAuthUserData = (): AppThunkType => async dispatch => {
    try {
        const response = await AuthAPI.me()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(response.data.data, true))
        } else if (response.data.resultCode === 1) {
            console.log(response.data.messages[0])
        }
    } catch (error) {
        if(axios.isAxiosError(error))
        alert(error.message)
    } finally {
        dispatch(setInitialized())
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | undefined): AppThunkType => async dispatch => {
    try {
        const response = await AuthAPI.login(email, password, rememberMe, captcha && captcha)
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else if (response.data.resultCode === 1) {
            dispatch(setResponseError(response.data.messages[0]))
            console.log(response.data.messages[0])
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
            console.log(message)
        }
    } catch (error) {
        console.log(error)
    }
}

export const getCaptchaUrl = (): AppThunkType => async dispatch => {
    try {
        const response = await securityAPI.getCaptchaUrl()
        dispatch(getCaptchaUrlSuccessAC(response.data.url))
    } catch (error) {
        console.log(error)
    }
}

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





