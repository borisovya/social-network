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


let state: RootStateType = {
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
}

export default state