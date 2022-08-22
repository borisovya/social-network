import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogPage} from "../../Redux/State";
import {ChangeEvent, MouseEvent, useState} from "react";

type DialogsComponentType = {
    state: DialogPage
}

export const Dialogs = (props:DialogsComponentType) => {

    const [messageBody, setMessageBody] = useState<string>('')

    let dialogsElements = props.state.dialogs.map((d:any) => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = props.state.messages.map((m:any) => <Message message={m.message} id={m.id}/>)

    let onChangeHandler = (e:ChangeEvent<HTMLTextAreaElement>) => {
        setMessageBody(e.currentTarget.value)
    }
    let onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        alert(messageBody)
    }

    return (
        <div className={s.dialogs}>

            <div className={s.dialogItems}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div><textarea value={messageBody} onChange={onChangeHandler} /></div>
                <div><button onClick={onClickHandler}/>Send</div>
            </div>
        </div>
    )
}