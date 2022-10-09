import React from 'react'

import {RootStateType} from "../Redux/redux-store";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";


type MapStateToPropsType = {
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