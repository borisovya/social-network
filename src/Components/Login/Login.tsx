import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form"




const Login = () => {
    const onSubmit = (formData: FormValuesType) => {
        console.log(formData)
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginForm onSubmit={onSubmit}/>
        </div>
    );
};




type FormValuesType = {
    login: string,
    password: string,
    rememberMe: boolean
};

type LoginFormType = {
    onSubmit: (formData: FormValuesType)=>void
}

const LoginForm = (props: LoginFormType) => {
    const {register,
        reset,
        formState:{errors, isValid},
        handleSubmit
    } = useForm<FormValuesType>({mode: 'onChange'});

    const onSubmit: SubmitHandler<FormValuesType> =(data) => {
        props.onSubmit(data);
        reset()
    }


    return (
        <div>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <div><label>login</label></div>
                    <input {...register("login",{
                        required: 'Required',
                        minLength: {
                            value: 1,
                            message: 'login should be filled'
                        }
                        },

                    )}/>
                    <span>{errors?.login && <span>{errors?.login?.message || 'Error'}</span>}</span>
                </div>

                <div>
                    <div><label>password</label></div>
                    <input {...register("password", {
                        required: 'Required',
                        minLength: {
                            value: 5,
                            message: 'min 5 letters'
                        }
                    })}/>
                    <span>{errors?.password && <span>{errors?.password?.message || 'Error'}</span>}</span>
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



export default Login;