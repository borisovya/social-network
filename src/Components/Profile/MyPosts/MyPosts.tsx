import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {PostsType} from "../../../Redux/profile-reducer";
import {MyPostsType} from "./MyPostsContainer";
import {SubmitHandler, useForm} from "react-hook-form";


const MyPosts = React.memo((props: MyPostsType) => {

    let postsElement = props.posts.map((p: PostsType) => <Post key={p.id} id={p.id} message={p.message}
                                                               likesCount={p.likesCount}/>)

    const onSubmit = (formData: FormValuesType) => {
        props.addPost(formData.postText)
    }

    return <div className={s.postsBlock}>
        <h3>My posts:</h3>
        <div>
            <AddPostForm onSubmit={onSubmit}/>
        </div>

        <div className={s.posts}>
            {postsElement}
        </div>
    </div>

})

export default MyPosts;


type AddPostFormType = {
    onSubmit: (data: FormValuesType)=>void
}

type FormValuesType = {
    postText: string,
};

const AddPostForm = (props: AddPostFormType) => {

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
            <textarea {...register("postText", {
                required: ' Enter your message',
                maxLength: {
                    value: 100,
                    message: `You have reached the maximum length limit 100 symbols`
                }
            })}/>
            <span>{errors?.postText && <span>{errors?.postText?.message}</span>}</span>
        </div>

        <div>
            <input type={'submit'} disabled={!isValid}/>
        </div>
    </form>
}