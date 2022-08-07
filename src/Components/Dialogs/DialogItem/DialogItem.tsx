import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";
import {DialogsType} from "../../../Redux/State";


export const DialogItem = (props: DialogsType) => {
    return (
        <div className={s.item + ' ' + s.active}>
            <NavLink to={'/dialog/' + props.id}>{props.name}</NavLink>
        </div>)
}
