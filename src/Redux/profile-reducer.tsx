import {v1} from "uuid";
import {ProfileAPI} from "../API/API";

import {Dispatch} from "redux";

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

export type ContactsType = {
    facebook: string | null,
    website: string | null,
    vk: string | null,
    twitter: string | null,
    instagram: string | null,
    youtube: string | null,
    github: string | null,
    mainLink: string | null
}

export type PhotoProfileType = {
    small: string | null,
    large: string | null
}

export type ProfileType = {
    aboutMe?: string | undefined,
    contacts?: ContactsType | undefined,
    lookingForAJob?: boolean | undefined,
    lookingForAJobDescription?: string | undefined,
    fullName?: string | undefined,
    userId?: number | undefined,
    photos: PhotoProfileType

}


let initialState = {
    posts: [
        {id: v1(), message: 'Hi how are you?', likesCount: 23},
        {id: v1(), message: 'HAHAHAH!!', likesCount: 42},
    ],
    profile: null,
    status: ''
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
    }
}



