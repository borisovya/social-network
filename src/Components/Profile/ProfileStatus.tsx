import React from 'react';
import {PropsProfileType} from "./ProfileContainer";

// type PropsType = {
//     status: string
//     changeMode: () => void
//     mode: boolean
//     onChange: (newStatus: string)=>void
// }

type ProfileStatusType = {
    status: string
    updateUserStatus: (status: string) => void
}

class ProfileStatus extends React.Component<ProfileStatusType> {


    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivate = () => {
        this.setState({
            editMode: false
        })
        this.props.updateUserStatus(this.state.status)
    }

    onChange = (newStatus: string) => {
        this.setState({
            status: newStatus
        })
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusType>) {

        if(prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }

    }

    render() {
        return <div>

            <span>{!this.state.editMode
                ?
                    <span onDoubleClick={this.activateEditMode}>{this.props.status || '---No status---'}</span>

                :
                    <input autoFocus={true} value={this.state.status} onBlur={this.deactivate}
                           onChange={(e) => this.onChange(e.currentTarget.value)}/>

            }
            </span>

        </div>
    }


};

export default ProfileStatus;