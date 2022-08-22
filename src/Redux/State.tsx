let rerenderEntireTree = (state: RootStateType) => {

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
}

export type SidebarType = {

}

export type RootStateType = {
    profilePage: ProfilePage
    dialogsPage: DialogPage
    sidebar: SidebarType
}


export type StoreType = {
    _state: RootStateType
    getState: () => void
    addPost: (postMessage: string)=>void
    subscribe: (callback: ()=> void)=>void
}

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
    },
    sidebar: {},
},
    getState () {
        return this._state
    },
    _callSubscriber () {
        console.log('State changed')},
    addPost (postMessage: string) {
        let newPost ={
            id: 5,
            message: postMessage,
            likesCount: 0,
        };
        this._state.profilePage.posts.push(newPost)
        this._callSubscriber()
    },
    subscribe (callback: any) {
        this._callSubscriber = callback;
    }
}


export default store