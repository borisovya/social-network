import React from "react";
import Profile from "./Profile";
import { ProfileType, getProfile} from "../../Redux/profile-reducer";
import {connect} from "react-redux";
import {RootStateType} from "../../Redux/redux-store";
import { RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";


export type mapStatePropsType = {
    profile: ProfileType | null
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


        return <div>

            <Profile {...this.props}/>

        </div>
    }
}

let AuthRedirectComponent  = withAuthRedirect(ProfileContainer)


let mapStateToProps = (props: RootStateType): mapStatePropsType => {
    return {
        profile: props.profilePage.profile,
    }
}

let WithUrlDataContainerComponent = withRouter<PropsProfileType, any>(AuthRedirectComponent);

export default connect(mapStateToProps, {getProfile}) (WithUrlDataContainerComponent);