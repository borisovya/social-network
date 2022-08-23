import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {
    DialogPage,
    SendNewMessageType,
    UpdateDialogNewMessage,

} from "../../Redux/State";
import {ChangeEvent, MouseEvent} from "react";
import {SendMessageBodyActionCreator, UpdateMessageBodyActionCreator} from "../../Redux/dialogs-reducer";

type DialogsComponentType = {
    state: DialogPage
    dispatch: (action: UpdateDialogNewMessage | SendNewMessageType)=>void
}

export const Dialogs = (props:DialogsComponentType) => {

    let dialogsElements = props.state.dialogs.map((d:any) => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = props.state.messages.map((m:any) => <Message message={m.message} id={m.id}/>)
    let newMessageBody = props.state.newMessage

    let onChangeMessage = (e:ChangeEvent<HTMLTextAreaElement>) => {
        let newMessageValue = e.currentTarget.value
       props.dispatch(UpdateMessageBodyActionCreator(newMessageValue))
    }
    let onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        props.dispatch(SendMessageBodyActionCreator())
    }

    return (
        <div className={s.dialogs}>

            <div className={s.dialogItems}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div><textarea value={newMessageBody} onChange={onChangeMessage} placeholder='Enter your message'/></div>
                <div><button onClick={onClickHandler}>Send</button></div>
            </div>
        </div>
    )
}