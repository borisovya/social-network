import React from 'react';
import s from './login.module.css'
import {connect, useSelector} from "react-redux";
import {login} from "../../Redux/auth-reduser";
import {Redirect} from "react-router-dom";
import {RootStateType} from "../../Redux/redux-store";
import {LoginForm} from "./LoginForm";

type FormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean
    captcha: string | undefined
};

type PropsType = {
    login: (email: string, password:string, rememberMe: boolean, captcha: string | undefined)=>void
    isAuth: boolean
    captchaUrl: string | undefined
}

const Login = ({isAuth, login, captchaUrl}: PropsType) => {

    const onSubmit = (formData: FormValuesType) => {
        login(formData.email, formData.password, formData.rememberMe, formData.captcha && formData.captcha)
    }
    let responseError = useSelector<RootStateType, null | string>(state => state.auth.responseError)
    if (isAuth) {
        return <Redirect to={'/profile'} />
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
            {responseError ? <div className={s.errorText}>{responseError}</div> : ''}
        </div>
    );
};






const mapStateToProps = (state: RootStateType) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login}) (Login);