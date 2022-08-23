let _callSubscriber = (state: RootStateType) => {

}

export type PostsType = {
    id: number
    message: string
    likesCount: number
}

export type ProfilePage = {
    posts: Array<PostsType>
}

export type MessageType = {
    id: number
    message: string
}

export type DialogsType = {
    id: number
    name: string
}

export type DialogPage = {
    messages: Array<MessageType>
    dialogs: Array<DialogsType>
    newMessage: string
}

export type SidebarType = {}

export type RootStateType = {
    profilePage: ProfilePage
    dialogsPage: DialogPage
    sidebar: SidebarType
}

export type StoreType = {
    _state: RootStateType
    getState: () => void
    addPost: (postMessage: string) => void
    subscribe: (callback: () => void) => void
    dispatch: (action: AddPostActionType | UpdateDialogNewMessage | SendNewMessageType) => void
}

export type AddPostActionType = {
    type: 'ADD-POST'
    postMessage: string
}

export type UpdateDialogNewMessage = {
    type: 'UPDATE-DIALOG-NEW-MESSAGE'
    newMessageBody: string
}

export type SendNewMessageType = {
    type: 'ADD-NEW-MESSAGE'
}


const ADD_POST = 'ADD-POST'
const UPDATE_DIALOG_NEW_MESSAGE = 'UPDATE-DIALOG-NEW-MESSAGE'
const ADD_NEW_MESSAGE = 'ADD-NEW-MESSAGE'

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi how are you?', likesCount: 23},
                {id: 2, message: 'Is this my post?', likesCount: 12},
                {id: 3, message: 'Abrakadabra?', likesCount: 112},
                {id: 4, message: 'HAHAHAH!!', likesCount: 42},
            ],
        },
        dialogsPage: {
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'What is going on?'},
                {id: 3, message: 'Yo!!!'},
            ],
            dialogs: [
                {id: 1, name: 'Vladimir'},
                {id: 2, name: 'Dmitrii'},
                {id: 3, name: 'Anastasia'},
                {id: 4, name: 'Alex'},
                {id: 5, name: 'Nick'},
                {id: 6, name: 'Mary'}
            ],
            newMessage: '',
        },
        sidebar: {},
    },
    _callSubscriber() {
        console.log('State changed')
    },

    getState() {
        return this._state
    },
    subscribe(callback: any) {
        this._callSubscriber = callback;
    },

    dispatch(action: AddPostActionType | UpdateDialogNewMessage | SendNewMessageType) {
        if (action.type === ADD_POST) {
            let newPost = {
                id: 5,
                message: action.postMessage,
                likesCount: 0,
            };
            this._state.profilePage.posts.push(newPost)
            this._callSubscriber()
        } else if (action.type===UPDATE_DIALOG_NEW_MESSAGE){
            this._state.dialogsPage.newMessage = action.newMessageBody
            this._callSubscriber()
        } else if (action.type === ADD_NEW_MESSAGE) {
            let newMessageBody = this._state.dialogsPage.newMessage
            this._state.dialogsPage.newMessage=''
            this._state.dialogsPage.messages.push({id:4, message: newMessageBody})
            this._callSubscriber()
        }
    }
}

export const addPostActionCreator = (postTitle: string): AddPostActionType => {
    return ({type: 'ADD-POST', postMessage: postTitle})
}

export const UpdateMessageBodyActionCreator = (newMessageBody:string):UpdateDialogNewMessage => {
    return ({type: 'UPDATE-DIALOG-NEW-MESSAGE', newMessageBody: newMessageBody})
}
export const SendMessageBodyActionCreator = ():SendNewMessageType => {
    return ({type: 'ADD-NEW-MESSAGE'})
}

export default store