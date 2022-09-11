import {v1} from "uuid";

export type PostsType = {
    id: string
    message: string
    likesCount: number
}

export type ProfileReducerInitStateType = typeof initialState

const ADD_POST = 'ADD-POST'

let initialState = {
    posts: [
        {id: v1(), message: 'Hi how are you?', likesCount: 23},
        {id: v1(), message: 'Is this my post?', likesCount: 12},
        {id: v1(), message: 'Abrakadabra?', likesCount: 112},
        {id: v1(), message: 'HAHAHAH!!', likesCount: 42},
    ] as Array<PostsType>,
}

export const profileReducer = (state: ProfileReducerInitStateType = initialState, action: AddPostActionType): ProfileReducerInitStateType => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: v1(),
                message: action.postMessage,
                likesCount: 0,
            };

            return {...state, posts: [...state.posts, newPost]}
        default:
            return state
    }
}

export const addPostActionCreator = (postTitle: string): AddPostActionType => {
    return ({type: ADD_POST, postMessage: postTitle})
}

export type AddPostActionType = {
    type: 'ADD-POST'
    postMessage: string
}

