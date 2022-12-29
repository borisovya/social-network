import {v1} from "uuid";
import {ProfileAPI} from "../API/API";

import {Dispatch} from "redux";
import {AppThunkType, RootStateType} from "./redux-store";
import axios from "axios";

export type PostsType = {
    id: string
    message: string
    likesCount: number
}

export type ProfileReducerInitStateType = {
    posts: Array<PostsType>,
    profile: ProfileType | null,
    status: string
}
export type ContactsTypeKeys = 'facebook' |
    'website' |
    'vk' |
    'twitter' |
    'instagram' |
    'youtube' |
    'github' |
    'mainLink'
export type ContactsType = {
    [key in ContactsTypeKeys]: string | null
}

export type Nullable<T> = T | null;

export type PhotoProfileType = {
    small: Nullable<string>
    large: Nullable<string>
}

export type ProfileType = {
    aboutMe?: string
    contacts?: ContactsType
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    fullName?: string
    userId?: number
    photos?: PhotoProfileType
}

let initialState = {
    posts: [
        // {id: v1(), message: 'Hi how are you?', likesCount: 23},
        // {id: v1(), message: 'HAHAHAH!!', likesCount: 42},
    ],
    profile: null,
    status: '',
    editProfileError:''
}

export const profileReducer = (state: ProfileReducerInitStateType = initialState, action: ActionType): ProfileReducerInitStateType => {

    switch (action.type) {
        case 'ADD-POST':
            let newPost = {
                id: v1(),
                message: action.postMessage,
                likesCount: 0,
            };
            return {...state, posts: [...state.posts, newPost]}
        case 'SET-PROFILE':
            return {...state, profile: action.profile}
        case 'SET-STATUS':
            return {...state, status: action.status}
        case "SAVE-PHOTO-SUCCESS":
            return {
                ...state, profile: {
                    ...state.profile,
                    photos: {
                        large: action.photos,
                        small: action.photos
                    }
                }
            }
        default:
            return state
    }
}

type ActionType = AddPostActionType | SetProfileType | SetStatusType | SavePhotoSuccessType

export type AddPostActionType = ReturnType<typeof addPost>
export const addPost = (postTitle: string) => {
    return ({type: 'ADD-POST', postMessage: postTitle}) as const
}

type SetProfileType = ReturnType<typeof setProfile>
const setProfile = (profile: ProfileType) => {
    return ({type: 'SET-PROFILE', profile}) as const
}

type SetStatusType = ReturnType<typeof setStatus>
const setStatus = (status: string) => {
    return ({type: 'SET-STATUS', status}) as const
}

type SavePhotoSuccessType = ReturnType<typeof savePhotoSuccess>
const savePhotoSuccess = (photos: string) => {
    return ({type: 'SAVE-PHOTO-SUCCESS', photos}) as const
}


export const getProfile = (userId: number) => async (dispatch: Dispatch) => {
    const response = await ProfileAPI.getProfile(+userId)
    dispatch(setProfile(response.data))
}

export const savePhoto = (photo: File) => async (dispatch: Dispatch) => {
    const response = await ProfileAPI.savePhoto(photo)

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos.large))
    }
}

export const saveProfile = (profile: ProfileType): AppThunkType => async (dispatch, getState: () => RootStateType) => {
    try {
        const userId = getState().profilePage.profile?.userId
        const response = await ProfileAPI.saveProfile(profile)

        if (response.data.resultCode === 0) {
            dispatch(setProfile(profile))
            userId && await dispatch(getProfile(userId))
        }
        else if (response.data.resultCode === 1) {
            if(response.data.messages && response.data.messages?.length)
            console.log(response.data.messages[0])
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            return console.log(error.message)
        }
        console.log('Some Error Occured')
    }

}

export const getUserStatus = (userId: number) => async (dispatch: Dispatch) => {
    try {
        const response = await ProfileAPI.getStatus(+userId)
        dispatch(setStatus(response.data))
    } catch (error) {
        console.log(error);
    }
}

export const updateUserStatus = (status: string) => async (dispatch: Dispatch) => {
    const response = await ProfileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    } else if (response.data.resultCode === 1) {
        alert(response.data.messages[0])
    }
}





















