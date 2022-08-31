import {
    DialogPage,
    SendMessageBodyActionCreator,
    UpdateMessageBodyActionCreator
} from "../../Redux/dialogs-reducer";
import {AnyAction, Dispatch} from "redux";
import {Dialogs} from "./Dialogs";

type DialogsComponentType = {
    state: DialogPage
    dispatch: Dispatch<AnyAction>
}

export const DialogsContainer = (props:DialogsComponentType) => {

    let onChangeMessage = (newMessageValue: string) => {
       props.dispatch(UpdateMessageBodyActionCreator(newMessageValue))
    }
    let sendMessage = () => {
        props.dispatch(SendMessageBodyActionCreator())
    }

    return <Dialogs state={props.state} onChangeMessage={onChangeMessage} sendMessage={sendMessage}/>
}