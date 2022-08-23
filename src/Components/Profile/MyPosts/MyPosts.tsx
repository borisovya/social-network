import React, {ChangeEvent,MouseEvent, useState} from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import { AddPostActionType, PostsType} from "../../../Redux/State";
import {addPostActionCreator} from "../../../Redux/profile-reducer";

type MyPostsComponentType = {
    posts: Array<PostsType>
    dispatch: (action: AddPostActionType) => void
}



const MyPosts = (props:MyPostsComponentType) => {

    let postsElement = props.posts.map((p:PostsType) => <Post id={p.id}message={p.message} likesCount={p.likesCount}/>)


    let [postTitle, setPostTitle]=useState<string>('')

    let onChangePostHandler=(e: ChangeEvent<HTMLTextAreaElement>) => {
        setPostTitle(e.currentTarget.value)
    }

    let addPostHandler =(e: MouseEvent<HTMLButtonElement>)=>{
        postTitle && props.dispatch(addPostActionCreator(postTitle))
        setPostTitle('')
    }


    return <div className={s.postsBlock}>
        <h3>My posts:</h3>
        <div>
            <div>
                <textarea value={postTitle} onChange={ onChangePostHandler } />
            </div>
            <div>
                <button onClick={ addPostHandler }>Add post</button>
            </div>
        </div>

        <div className={s.posts}>
            { postsElement }
        </div>
    </div>

}

export default MyPosts;