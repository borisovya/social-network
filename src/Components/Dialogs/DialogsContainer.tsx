import {
    DialogPage,
    SendMessageBodyActionCreator,
    UpdateMessageBodyActionCreator
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
    onChangeMessage: (newMessageValue: string) => void
    sendMessage: () => void
}

export type dialogsType = mapStateToPropsType & mapDispatchToProps

let mapStateToProps = (state: RootStateType): mapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

let mapDispatchToProps = (dispatch: Dispatch<AnyAction>): mapDispatchToProps => {
    return {
        onChangeMessage: (newMessageValue: string) => {
            dispatch(UpdateMessageBodyActionCreator(newMessageValue))
        },
        sendMessage: () => {
            dispatch(SendMessageBodyActionCreator())
        }
    }
}


// let AuthRedirectComponent = withAuthRedirect(Dialogs)
// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)