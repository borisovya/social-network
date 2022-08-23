import {AddPostActionType, ProfilePage} from "./State";

const ADD_POST = 'ADD-POST'

export const profileReducer = (state: ProfilePage, action: AddPostActionType) => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.postMessage,
                likesCount: 0,
            };
            state.posts.push(newPost)
            return state
        default:
            return state
    }
}

export const addPostActionCreator = (postTitle: string):AddPostActionType => {
    return ({type: ADD_POST, postMessage: postTitle})
}
