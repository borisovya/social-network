import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import React from "react";
import {dialogsType} from "./DialogsContainer";
import {DialogsType, MessageType} from "../../Redux/dialogs-reducer";
import {SubmitHandler, useForm} from "react-hook-form";


export const Dialogs = (props: dialogsType) => {

    let dialogsElements = props.dialogsPage.dialogs.map((d: DialogsType) => <DialogItem key={d.id} name={d.name}
                                                                                        id={d.id}/>)
    let messagesElements = props.dialogsPage.messages.map((m: MessageType) => <Message key={m.id} message={m.message}
                                                                                       id={m.id}/>)

    const onSubmit = (formData: FormValuesType) => {

        props.sendMessage(formData.message)
    }

    return (
        <div className={s.dialogs}>

            <div className={s.dialogItems}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                <div>{messagesElements}</div>

                <AddMessageForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
}



type AddMessageFormType = {
    onSubmit: (data: FormValuesType)=>void
}

type FormValuesType = {
    message: string,
};

const AddMessageForm = (props: AddMessageFormType) => {

    const {register,
        reset,
        formState:{errors, isValid},
        handleSubmit
    } = useForm<FormValuesType>({mode: 'onChange'});

    const onSubmit: SubmitHandler<FormValuesType> =(data) => {
        props.onSubmit(data);
        reset()
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <textarea {...register("message", {
                required: ' Enter your message',
                maxLength: {
                    value: 100,
                    message: `You have reached the maximum length limit 100 symbols`
                }
            })}/>
            <span>{errors?.message && <span>{errors?.message?.message}</span>}</span>
        </div>

        <div>
            <input type={'submit'} disabled={!isValid}/>
        </div>
    </form>
}