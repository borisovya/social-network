import React from 'react';

// type PropsType = {
//     status: string
//     changeMode: () => void
//     mode: boolean
//     onChange: (newStatus: string)=>void
// }

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: 'Hello dude'
    }

    activateEditMode() {
        this.setState({
            editMode: true
        }) // setState асинхронный
    }

    deactivate() {
        this.setState({
            editMode: false
        })
    }

    onChange(newStatus: string) {
        this.setState({
            status: newStatus
        })
    }


    render() {
        return <div>
            {!this.state.editMode
                ? <div>
                    <span onDoubleClick={this.activateEditMode.bind(this)}>{this.state.status}</span>
                </div>
                : <div>
                    <input autoFocus={true} value={this.state.status} onBlur={this.deactivate.bind(this)} onChange={(e)=>this.onChange(e.currentTarget.value)}/>
                </div>
            }


        </div>
    }


};

export default ProfileStatus;