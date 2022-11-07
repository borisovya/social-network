import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form"
import s from './login.module.css'
import {connect, useSelector} from "react-redux";
import {login} from "../../Redux/auth-reduser";
import {Redirect} from "react-router-dom";
import {RootStateType} from "../../Redux/redux-store";


type PropsType = {
    login: (email: string, password:string, rememberMe: boolean)=>void
    isAuth: boolean
}

const Login = (props: PropsType) => {
    const onSubmit = (formData: FormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    let responseError = useSelector<RootStateType, null | string>(state => state.auth.responseError)

    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }

    return (
        <div>
            <h1>LOGIN</h1>

            <LoginForm onSubmit={onSubmit}/>

            {responseError ? <div className={s.errorText}>{responseError}</div> : ''}

        </div>
    );
};




type FormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean
};

type LoginFormType = {
    onSubmit: (formData: FormValuesType)=>void
}

const LoginForm = (props: LoginFormType) => {
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
                            message: ' Login is required'
                        },
                        maxLength: {
                            value: 15,
                            message: ` Max login length is 15 symbols`
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
                            value: 15,
                            message: ` Max login length is 15 symbols`
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

const mapStateToProps = (state: RootStateType) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login}) (Login);