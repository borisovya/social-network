import React from "react";
import Profile from "./Profile";
import { ProfileType, getProfile} from "../../Redux/profile-reducer";
import {connect} from "react-redux";
import {RootStateType} from "../../Redux/redux-store";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";


export type mapStatePropsType = {
    profile: ProfileType | null
    isAuth: boolean
}

type mapDispatchToPropsType = {
    getProfile: (userId: number)=>void
}

type PathParamsType = {
    userId: string
}

export type PropsProfileType = mapStatePropsType & mapDispatchToPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsProfileType>{


    componentDidMount() {
        let userId = this.props.match.params.userId
        if(!userId) {
            userId = '11245'
        }
        this.props.getProfile(+userId)
    }

    render() {
        if (!this.props.isAuth) return <Redirect to={'/login'} />

        return <div>

            <Profile {...this.props}/>

        </div>
    }
}

let mapStateToProps = (props: RootStateType): mapStatePropsType => {
    return {
        profile: props.profilePage.profile,
        isAuth: props.auth.isAuth
    }
}

let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect (mapStateToProps, {getProfile}) (WithUrlDataContainerComponent);