import {ContactsType, ProfileType, saveProfile} from "../../../Redux/profile-reducer";
import React, {useEffect} from "react";
import {Contacts} from "./Profileinfo";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch} from "../../../Redux/redux-store";

type IncomingProfileType = {
    profile: ProfileType
    isOwner?: boolean
    activateEditMode: () => void
}

type FormValuesType = {
    fullName: string,
    aboutMe: string,
    lookingForAJobDescription: string,
    lookingForAJob: boolean
};


export const ProfileDataForm = ({profile, activateEditMode}: IncomingProfileType) => {
    const {
        register,
        reset,
        trigger,
        formState: {errors, isValid},
        handleSubmit,
        setValue,
    } = useForm<FormValuesType>({mode: 'onChange', defaultValues: {
            fullName: profile.fullName,
            aboutMe: profile.aboutMe,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            lookingForAJob: profile.lookingForAJob
        }});

    useEffect(()=>{
        // if(profile) {
            setValue('fullName', profile.fullName!)
        // }
    }, [profile])

    const dispatch = useAppDispatch()

    const triger = () => {
        trigger("fullName")
    }
    const triger2 = () => {
        trigger("aboutMe")
    }

    const onSubmit: SubmitHandler<FormValuesType> = (data) => {
        dispatch(saveProfile(data));
        console.log(data)
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
                required: true,
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
            <textarea  {...register("aboutMe", {
                required: true,
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
            <div><label>Skills</label></div>
            <textarea  {...register("lookingForAJobDescription", {
                required: true,
                onBlur: triger2,
                minLength: {
                    value: 1,
                    message: ' Skills are required'
                },
                maxLength: {
                    value: 350,
                    message: ` Max Skills length is 350 symbols`
                }
            })}/>
            <span>{errors?.lookingForAJobDescription && <span>{errors?.lookingForAJobDescription?.message || 'Error'}</span>}</span>
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