import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserData, logout} from "../../Redux/auth-reduser";
import {RootStateType} from "../../Redux/redux-store";



export type mapStateToPropsType = {
    isAuth: boolean
    login: string | null
}

type mapDispatchToPropsType = {
    getAuthUserData: () => void
    logout: () => void
}


export type HeaderContainerType = mapStateToPropsType & mapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderContainerType> {

    componentDidMount() {
        // this.props.getAuthUserData()
    }

    render() {

        return <Header {...this.props}/>
    }

}

const mapStateToProps = (state: RootStateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.data.login
})

export default connect(mapStateToProps, {getAuthUserData, logout})(HeaderContainer);