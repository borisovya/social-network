import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";


export const Dialogs = () => {

    let dialogsData = [
        {id: 1, name: 'Vladimir'},
        {id: 2, name: 'Dmitrii'},
        {id: 3, name: 'Anastasia'},
        {id: 4, name: 'Alex'},
        {id: 5, name: 'Nick'},
        {id: 6, name: 'Mary'}
    ]

    let messagesData = [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'What is going on?'},
        {id: 3, message: 'Yo!!!'},

    ]

    let dialogsElements = dialogsData.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = messagesData.map(m => <Message message={m.message}/>)


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