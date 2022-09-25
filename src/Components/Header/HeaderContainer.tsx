import React from "react";

import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {DataType, setAuthUserData} from "../../Redux/auth-reduser";
import {RootStateType} from "../../Redux/redux-store";


export type mapStateToPropsType = {
    isAuth: boolean
    login: string | null
}

type mapDispatchToPropsType = {
    setAuthUserData: (data: DataType)=> void
}



export type HeaderContainerType = mapStateToPropsType & mapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderContainerType> {

componentDidMount() {

    axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true}).then(response => {

        if(response.data.resultCode === 0) {
            console.log(response.data.data)
            this.props.setAuthUserData(response.data.data)
        }
})
}

    render() {

        console.log(this.props.login, 'this.props')
        return <Header {...this.props}/>
    }

}

const mapStateToProps = (state:RootStateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.data.login
})

export default connect (mapStateToProps, {setAuthUserData})(HeaderContainer);