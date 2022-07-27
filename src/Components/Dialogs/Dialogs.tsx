import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";


type DialogItemType = {
    name: string
    id: string
}

const DialogItem = (props:DialogItemType) => {
    return (
        <div className={s.item + ' ' + s.active}>
            <NavLink to={'/dialog/' + props.id}>{props.name}</NavLink>
        </div>)
}

type MessageType = {
    message: string
}

const Message = (props:MessageType)=> {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

export const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                <DialogItem name='Vladimir' id='1'/>
                <DialogItem name='Nastia' id='2'/>
                <DialogItem name='Dmitri' id='3'/>
                <DialogItem name='Vasilii' id='4'/>
                <DialogItem name='Alexandr' id='5'/>

            </div>
            <div className={s.messages}>
                <Message message='Hi'/>
                <Message message='What is going on?'/>
                <Message message='Yo'/>

            </div>
        </div>
    )
}