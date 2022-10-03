import {
    DialogPage,
    SendMessageBodyActionCreator,
    UpdateMessageBodyActionCreator
} from "../../Redux/dialogs-reducer";
import {AnyAction, Dispatch} from "redux";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {RootStateType} from "../../Redux/redux-store";

type mapStateToPropsType = {
    dialogsPage: DialogPage
    isAuth: boolean
}

type mapDispatchToProps = {
    onChangeMessage: (newMessageValue: string) => void
    sendMessage: ()=> void
}

export type dialogsType = mapStateToPropsType & mapDispatchToProps

let mapStateToProps = (state: RootStateType): mapStateToPropsType =>{
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch: Dispatch<AnyAction>): mapDispatchToProps =>{
    return {
        onChangeMessage: (newMessageValue: string)=>{dispatch(UpdateMessageBodyActionCreator(newMessageValue))},
        sendMessage: ()=>{dispatch(SendMessageBodyActionCreator())}
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer