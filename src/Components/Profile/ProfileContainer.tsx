import React from "react";
import Profile from "./Profile";
import axios from "axios";
import { ProfileType, setProfile} from "../../Redux/profile-reducer";
import {connect} from "react-redux";
import {RootStateType} from "../../Redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";

type mapStatePropsType = {
    profile: ProfileType | null
}

type mapDispatchToPropsType = {
    setProfile: (data: ProfileType)=>void
}

type PathParamsType = {
    userId: string
}

export type PropsProfileType = mapStatePropsType & mapDispatchToPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsProfileType>{


    componentDidMount() {
        let userId = this.props.match.params.userId
        if(!userId) {
            userId = '2'
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId).then(response => {
            this.props.setProfile(response.data)
        });
    }

    render() {
        return <div>

            <Profile {...this.props}/>

        </div>
    }
}

let mapStateToProps = (props: RootStateType): mapStatePropsType => {
    return {
        profile: props.profilePage.profile,
    }
}

let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect (mapStateToProps, {setProfile}) (WithUrlDataContainerComponent);