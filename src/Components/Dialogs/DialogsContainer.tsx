import {
    DialogPage,
    SendMessageBodyActionCreator,
} from "../../Redux/dialogs-reducer";
import {AnyAction, compose, Dispatch} from "redux";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {RootStateType} from "../../Redux/redux-store";
import React from "react";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";

type mapStateToPropsType = {
    dialogsPage: DialogPage
}

type mapDispatchToProps = {
    sendMessage: (message: string) => void
}

export type dialogsType = mapStateToPropsType & mapDispatchToProps

let mapStateToProps = (state: RootStateType): mapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

let mapDispatchToProps = (dispatch: Dispatch<AnyAction>): mapDispatchToProps => {
    return {

        sendMessage: (message: string) => {
            dispatch(SendMessageBodyActionCreator(message))
        }
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)