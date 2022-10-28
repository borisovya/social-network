import React, {useState} from 'react';
import {PropsProfileType} from "./ProfileContainer";


type ProfileStatusType = {
    status: string
    updateUserStatus: (status: string) => void
}

const ProfileStatusWithHooks = (props: ProfileStatusType) => {

    let [editMode, setEditMode] = useState<boolean>(false)
    let [status, setStatus] = useState<string>(props.status)

    const activateEditMode = () => {
        setEditMode(true)
        }

    const deactivate = () => {
        setEditMode(false)
        props.updateUserStatus(status)
    }

    const onChange = (newStatus: string) => {
        setStatus(newStatus)
    }

        return <div>
            {!editMode ?
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || '---No status---'}</span>
                </div>

                : <input autoFocus={true} value={status} onBlur={deactivate}
                onChange={(e) => onChange(e.currentTarget.value)}/>
            }
        </div>
};

export default ProfileStatusWithHooks;