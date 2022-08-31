
export type PostsType = {
    id: number
    message: string
    likesCount: number
}

export type ProfileReducerInitStateType = {
    posts: Array<PostsType>
}

const ADD_POST = 'ADD-POST'

let initialState: ProfileReducerInitStateType = {
    posts: [
        {id: 1, message: 'Hi how are you?', likesCount: 23},
        {id: 2, message: 'Is this my post?', likesCount: 12},
        {id: 3, message: 'Abrakadabra?', likesCount: 112},
        {id: 4, message: 'HAHAHAH!!', likesCount: 42},
    ],
}

export const profileReducer = (state: ProfileReducerInitStateType = initialState, action: AddPostActionType): ProfileReducerInitStateType => {

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

export const addPostActionCreator = (postTitle: string): AddPostActionType => {
    return ({type: ADD_POST, postMessage: postTitle})
}

export type AddPostActionType = {
    type: 'ADD-POST'
    postMessage: string
}

