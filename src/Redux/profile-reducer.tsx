import {v1} from "uuid";
import {ProfileAPI} from "../API/API";

import {Dispatch} from "redux";


export type PostsType = {
    id: string
    message: string
    likesCount: number
}

export type ProfileReducerInitStateType ={
    posts: Array<PostsType>,
    profile: ProfileType | null,
    status: string
}

export type ContactsType = {
    facebook: string | null,
    website:  string | null,
    vk: string | null,
    twitter: string |null,
    instagram: string | null,
    youtube:  string | null,
    github: string | null,
    mainLink:  string | null
}

export type PhotoProfileType = {
    small: string | null,
    large: string | null
}

export type ProfileType = {
    aboutMe: string,
    contacts: ContactsType,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    userId: number,
    photos: PhotoProfileType

}


let initialState = {
    posts: [
        {id: v1(), message: 'Hi how are you?', likesCount: 23},
        {id: v1(), message: 'Is this my post?', likesCount: 12},
        {id: v1(), message: 'Abrakadabra?', likesCount: 112},
        {id: v1(), message: 'HAHAHAH!!', likesCount: 42},
    ],
    profile:  null,
    status: ''
}

export const profileReducer = (state: ProfileReducerInitStateType = initialState, action: ActionType) => {

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

        default:
            return state
    }
}


type ActionType = AddPostActionType | SetProfileType | SetStatusType

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



export const getProfile = (userId: number) =>{
    return (dispatch: Dispatch) => {
        ProfileAPI.getProfile(+userId)
            .then(response => {
               dispatch(setProfile(response.data))
        });
    }
}

export const getUserStatus = (userId: number) =>{
    return (dispatch: Dispatch) => {
        ProfileAPI.getStatus(+userId)
            .then(response => {
                dispatch(setStatus(response.data))
            });
    }
}

export const updateUserStatus = (status: string) =>{
    return (dispatch: Dispatch) => {
        ProfileAPI.updateStatus(status)
            .then(response => {
                if(response.data.resultCode === 0) {
                    dispatch(setStatus(status))
                }
            });
    }
}


