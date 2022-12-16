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
}

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
}

type DialogsActionType =  SendNewMessageType

export const dialogsReducer = (state: DialogPage = initialState, action: DialogsActionType ): DialogPage => {

    switch (action.type) {
        case ADD_NEW_MESSAGE:
            return {...state, messages: [...state.messages, {id: v1(), message: action.message}]}
        default:
            return state
    }
}

export const SendMessageBodyActionCreator = (message: string): SendNewMessageType => {
    return ({type: ADD_NEW_MESSAGE, message})
}

export type SendNewMessageType = {
    type: 'ADD-NEW-MESSAGE'
    message: string
}