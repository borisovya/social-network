import {DialogPage, SendNewMessageType, UpdateDialogNewMessage} from "./State";

const UPDATE_DIALOG_NEW_MESSAGE = 'UPDATE-DIALOG-NEW-MESSAGE'
const ADD_NEW_MESSAGE = 'ADD-NEW-MESSAGE'

export const dialogsReducer = (state: DialogPage, action: UpdateDialogNewMessage | SendNewMessageType) => {

    switch(action.type) {
        case UPDATE_DIALOG_NEW_MESSAGE:
            state.newMessage = action.newMessageBody
            return state
        case ADD_NEW_MESSAGE:
            let newMessageBody = state.newMessage
            state.newMessage = ''
            state.messages.push({id: 4, message: newMessageBody})
            return state
        default: return state
    }
}

export const UpdateMessageBodyActionCreator = (newMessageBody:string):UpdateDialogNewMessage => {
    return ({type: UPDATE_DIALOG_NEW_MESSAGE, newMessageBody: newMessageBody})
}
export const SendMessageBodyActionCreator = ():SendNewMessageType => {
    return ({type: ADD_NEW_MESSAGE})
}