import { ContactsTypeKeys, ProfileType, saveProfile} from "../../../Redux/profile-reducer";
import React, {useEffect} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch} from "../../../Redux/redux-store";
import s from './Profileinfo.module.css'

type IncomingProfileType = {
    profile: ProfileType
    isOwner?: boolean
    activateEditMode: () => void
}

type FormValuesType = {
    fullName: string,
    aboutMe: string,
    lookingForAJobDescription: string,
    lookingForAJob: boolean,
    facebook: string | null,
    website: string | null,
    vk: string | null,
    twitter: string | null,
    instagram: string | null,
    youtube: string | null,
    github: string | null,
    mainLink: string | null
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
            lookingForAJob: profile.lookingForAJob,
            facebook: profile.contacts?.facebook,
            website: profile.contacts?.website,
            vk: profile.contacts?.vk,
            twitter: profile.contacts?.twitter,
            instagram: profile.contacts?.instagram,
            youtube: profile.contacts?.youtube,
            github: profile.contacts?.github,
            mainLink: profile.contacts?.mainLink
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

    const onSubmit: SubmitHandler<FormValuesType> = ({facebook,aboutMe,mainLink, github, vk, lookingForAJobDescription, lookingForAJob, twitter, instagram, youtube, website, fullName}) => {
        const data:ProfileType = {
            lookingForAJob,
            lookingForAJobDescription,
            fullName,
            aboutMe,
            contacts:{
                github,
                vk,
                facebook,
                instagram,
                twitter,
                website,
                youtube,
                mainLink
            }
        }
        dispatch(saveProfile(data))
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
            <div>
                <label><b>Contacts</b>:</label>
                {profile.contacts && Object.keys(profile.contacts).map((key) => {
                    return <div key={key} className={s.contact}>
                        <b>{key}</b>: {<input  {...register(key as ContactsTypeKeys, {
                            onBlur: triger,
                            minLength: {
                                value: 1,
                                message: `Field is required`
                            },
                            maxLength: {
                                value: 55,
                                message: ` Max length is 55 symbols`
                            }
                        })}/>}
                    </div>
                })}
            </div>

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