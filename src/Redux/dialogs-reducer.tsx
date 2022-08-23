import {SendNewMessageType, UpdateDialogNewMessage} from "./State";

const UPDATE_DIALOG_NEW_MESSAGE = 'UPDATE-DIALOG-NEW-MESSAGE'
const ADD_NEW_MESSAGE = 'ADD-NEW-MESSAGE'

export const dialogsReducer = (state: any, action: any) => {

    if (action.type === UPDATE_DIALOG_NEW_MESSAGE) {
        state.dialogsPage.newMessage = action.newMessageBody

    } else if (action.type === ADD_NEW_MESSAGE) {
        let newMessageBody = state.dialogsPage.newMessage
        state.dialogsPage.newMessage = ''
        state.dialogsPage.messages.push({id: 4, message: newMessageBody})
    }
    return state
}

export const UpdateMessageBodyActionCreator = (newMessageBody:string):UpdateDialogNewMessage => {
    return ({type: 'UPDATE-DIALOG-NEW-MESSAGE', newMessageBody: newMessageBody})
}
export const SendMessageBodyActionCreator = ():SendNewMessageType => {
    return ({type: 'ADD-NEW-MESSAGE'})
}