import React, {ReactComponentElement} from 'react'
import {Redirect} from "react-router-dom";
import {RootStateType} from "../Redux/redux-store";
import {connect} from "react-redux";

type MapStateToPropsType ={
    isAuth: boolean
}

let mapStateToPropsForRedirect = (props: RootStateType): MapStateToPropsType => {
    return {
        isAuth: props.auth.isAuth
    }
}

export function withAuthRedirect<WCP>(Component: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<MapStateToPropsType> = (props) => {
        const {isAuth, ...restProps} = props;
        if (!isAuth) return <Redirect to={'/login'}/>
        return <Component {...restProps as WCP} />
    }


    let ConnectedRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedRedirectComponent
}