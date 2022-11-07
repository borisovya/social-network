import {SubmitHandler, useForm} from "react-hook-form";
import s from "./login.module.css";
import React from "react";

type FormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean
};

type LoginFormType = {
    onSubmit: (formData: FormValuesType)=>void
}

export const LoginForm = (props: LoginFormType) => {
    const {register,
        reset,
        trigger,
        formState:{errors, isValid},
        handleSubmit
    } = useForm<FormValuesType>({mode: 'onChange'});

    const onSubmit: SubmitHandler<FormValuesType> =(data) => {
        props.onSubmit(data);
        reset()
    }
    const triger = () => {
        trigger("password")
    }
    const triger2 = () => {
        trigger("email")
    }
    return (
        <div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div><label>email</label></div>
                    <input  className={errors.email ? s.errorBorder: ''} {...register("email",{
                        required: 'Required',
                        onBlur: triger2,
                        minLength: {
                            value: 1,
                            message: ' Email is required'
                        },
                        maxLength: {
                            value: 35,
                            message: ` Max email length is 35 symbols`
                        }})}/>
                    <span className={s.errorText}>{errors?.email && <span>{errors?.email?.message || 'Error'}</span>}</span>
                </div>

                <div>
                    <div><label>password</label></div>
                    <input type='password' className={errors?.password ? s.errorBorder: ''} {...register("password", {
                        required: 'Required',
                        onBlur: triger,
                        minLength: {
                            value: 4,
                            message: ' Min 4 symbols'
                        },
                        maxLength: {
                            value: 25,
                            message: ` Max login length is 25 symbols`
                        }
                    })}/>
                    <span className={s.errorText}>{errors?.password && <span >{errors?.password?.message || 'Error'}</span>}</span>
                </div>

                <div>
                    <input type={'checkbox'} {...register("rememberMe")}/> Remember me
                </div>

                <div>
                    <input type={'submit'} disabled={!isValid}/>
                </div>
            </form>
        </div>
    );
};