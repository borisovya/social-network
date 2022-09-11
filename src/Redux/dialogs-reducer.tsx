import { v1 } from "uuid"

export type MessageType = {
    id: string
    message: string
}

export type DialogsType = {
    id: string
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
        {id: v1(), message: 'Hi'},
        {id: v1(), message: 'What is going on?'},
        {id: v1(), message: 'Yo!!!'},
    ],
    dialogs: [
        {id: v1(), name: 'Vladimir'},
        {id: v1(), name: 'Dmitrii'},
        {id: v1(), name: 'Anastasia'},
        {id: v1(), name: 'Alex'},
        {id: v1(), name: 'Nick'},
        {id: v1(), name: 'Mary'}
    ],
    newMessage: '',
}

type DialogsActionType = UpdateDialogNewMessage | SendNewMessageType

export const dialogsReducer = (state: DialogPage = initialState, action: DialogsActionType ): DialogPage => {

    switch (action.type) {
        case UPDATE_DIALOG_NEW_MESSAGE:
            return {...state, newMessage: action.newMessageBody}

        case ADD_NEW_MESSAGE:
            let newMessageBody = state.newMessage
            return {...state, newMessage: '', messages: [...state.messages, {id: v1(), message: newMessageBody}]}

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