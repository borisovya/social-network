import React from "react";
import Profile from "./Profile";
import {ProfileType, getProfile, getUserStatus, updateUserStatus} from "../../Redux/profile-reducer";
import {connect} from "react-redux";
import {RootStateType} from "../../Redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";


export type mapStatePropsType = {
    profile: ProfileType | null
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}

type mapDispatchToPropsType = {
    getProfile: (userId: number | null) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: (status: string) => void
}

type PathParamsType = {
    userId: string
}

export type PropsProfileType = mapStatePropsType & mapDispatchToPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsProfileType> {


    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = String(this.props.authorizedUserId)
        }
        this.props.getProfile(+userId)
        this.props.getUserStatus(+userId)
    }


    render() {


        return <div>

            <Profile {...this.props} />

        </div>
    }
}


let mapStateToProps = (props: RootStateType): mapStatePropsType => {
    return {
        profile: props.profilePage.profile,
        status: props.profilePage.status,
        authorizedUserId: props.auth.data.id,
        isAuth: props.auth.isAuth
    }
}

// let AuthRedirectComponent  = withAuthRedirect(ProfileContainer)
// let WithUrlDataContainerComponent = withRouter<PropsProfileType, any>(AuthRedirectComponent);
// export default connect(mapStateToProps, {getProfile}) (WithUrlDataContainerComponent);

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getProfile, getUserStatus, updateUserStatus}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)