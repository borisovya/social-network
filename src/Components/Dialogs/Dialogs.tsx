import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogPage} from "../../Redux/State";

type DialogsComponentType = {
    state: DialogPage
}

export const Dialogs = (props:DialogsComponentType) => {


    let dialogsElements = props.state.dialogs.map((d:any) => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = props.state.messages.map((m:any) => <Message message={m.message} id={m.id}/>)


    return (
        <div className={s.dialogs}>

            <div className={s.dialogItems}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    )
}