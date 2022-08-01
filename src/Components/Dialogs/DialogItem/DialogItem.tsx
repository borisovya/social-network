import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";


type DialogItemType = {
    name: string
    id: number
}

export const DialogItem = (props: DialogItemType) => {
    return (
        <div className={s.item + ' ' + s.active}>
            <NavLink to={'/dialog/' + props.id}>{props.name}</NavLink>
        </div>)
}
