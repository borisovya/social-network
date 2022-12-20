import {ContactsType, ProfileType} from "../../../Redux/profile-reducer";
import React from "react";
import {Contacts} from "./Profileinfo";
import {SubmitHandler, useForm} from "react-hook-form";

type IncomingProfileType = {
    profile: ProfileType
    isOwner?: boolean
    activateEditMode: () => void
}

type FormValuesType = {
    fullName: string,
    aboutMe: string,
    lookingForAJob: boolean
};


export const ProfileDataForm = ({profile, activateEditMode}: IncomingProfileType) => {
    const {
        register,
        reset,
        trigger,
        formState: {errors, isValid},
        handleSubmit
    } = useForm<FormValuesType>({mode: 'onChange'});

    const triger = () => {
        trigger("fullName")
    }
    const triger2 = () => {
        trigger("aboutMe")
    }

    const onSubmit: SubmitHandler<FormValuesType> = (data) => {
        console.log(data);
        activateEditMode()
        reset()
    }

    return <form>
        <div>
            <button onClick={handleSubmit(onSubmit)} disabled={!isValid}>Save</button>
        </div>
        <div>
            <div><label>Full Name</label></div>
            <input  {...register("fullName", {
                required: 'Required',
                onBlur: triger,
                minLength: {
                    value: 1,
                    message: ' fullName is required'
                },
                maxLength: {
                    value: 55,
                    message: ` Max fullName length is 55 symbols`
                }
            })}/>
            <span>{errors?.fullName && <span>{errors?.fullName?.message || 'Error'}</span>}</span>
        </div>

        <div>
            <div><label>About Me</label></div>
            <input  {...register("aboutMe", {
                required: 'Required',
                onBlur: triger2,
                minLength: {
                    value: 1,
                    message: ' aboutMe is required'
                },
                maxLength: {
                    value: 350,
                    message: ` Max aboutMe length is 350 symbols`
                }
            })}/>
            <span>{errors?.aboutMe && <span>{errors?.aboutMe?.message || 'Error'}</span>}</span>
        </div>

        <div>
            <label>{'Contacts: '}</label>
            {profile.contacts && Object.keys(profile.contacts).map((key) => {
            return <Contacts key={key} contactTitle={key}
                             contactValue={profile.contacts && profile.contacts[key as keyof ContactsType]}/>
        })}
        </div>
        <div>
            <label>
                {'Looking for a job: '}
            </label>
            <input type='checkbox' {...register("lookingForAJob")}/>
            <span>{errors?.lookingForAJob && <span>{errors?.lookingForAJob?.message || 'Error'}</span>}</span>
        </div>
        {profile.lookingForAJob && <div><b>My skills </b>: {profile.lookingForAJobDescription}</div>}
    </form>
}