import {AddPostActionType} from "./State";

const ADD_POST = 'ADD-POST'

export const profileReducer = (state: any, action: any) => {
    if (action.type === ADD_POST) {
        let newPost = {
            id: 5,
            message: action.postMessage,
            likesCount: 0,
        };
        state.profilePage.posts.push(newPost)

    }
    return state
}

export const addPostActionCreator = (postTitle: string): AddPostActionType => {
    return ({type: 'ADD-POST', postMessage: postTitle})
}