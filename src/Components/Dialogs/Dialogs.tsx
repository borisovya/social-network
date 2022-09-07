import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {ChangeEvent, MouseEvent} from "react";
import {dialogsType} from "./DialogsContainer";



export const Dialogs = (props: dialogsType) => {

    let dialogsElements = props.dialogsPage.dialogs.map((d: any) => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = props.dialogsPage.messages.map((m: any) => <Message message={m.message} id={m.id}/>)
    let newMessageBody = props.dialogsPage.newMessage

    let onChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newMessageValue = e.currentTarget.value
        props.onChangeMessage(newMessageValue)
    }
    let onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        props.sendMessage()
    }

    return (
        <div className={s.dialogs}>

            <div className={s.dialogItems}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div><textarea value={newMessageBody} onChange={onChangeMessage} placeholder='Enter your message'/>
                </div>
                <div>
                    <button onClick={onClickHandler}>Send</button>
                </div>
            </div>
        </div>
    )
}