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

const UPDATE_DIALOG_NEW_MESSAGE = 'UPDATE-DIALOG-NEW-MESSAGE'
const ADD_NEW_MESSAGE = 'ADD-NEW-MESSAGE'

let initialState = {
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
}

type DialogsActionType = UpdateDialogNewMessage | SendNewMessageType

export const dialogsReducer = (state: DialogPage = initialState, action: DialogsActionType ): DialogPage => {

    switch (action.type) {
        case UPDATE_DIALOG_NEW_MESSAGE:
            state.newMessage = action.newMessageBody
            return state
        case ADD_NEW_MESSAGE:
            let newMessageBody = state.newMessage
            state.newMessage = ''
            state.messages.push({id: 4, message: newMessageBody})
            return state
        default:
            return state
    }
}

export const UpdateMessageBodyActionCreator = (newMessageBody: string): UpdateDialogNewMessage => {
    return ({type: UPDATE_DIALOG_NEW_MESSAGE, newMessageBody: newMessageBody})
}
export const SendMessageBodyActionCreator = (): SendNewMessageType => {
    return ({type: ADD_NEW_MESSAGE})
}

export type UpdateDialogNewMessage = {
    type: 'UPDATE-DIALOG-NEW-MESSAGE'
    newMessageBody: string
}

export type SendNewMessageType = {
    type: 'ADD-NEW-MESSAGE'
}