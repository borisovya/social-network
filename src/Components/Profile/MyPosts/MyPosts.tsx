import React, {ChangeEvent,MouseEvent, useState} from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {PostsType} from "../../../Redux/State";

type MyPostsComponentType = {
    posts: Array<PostsType>
    addPost: (postMessage:string)=>void
}

const MyPosts = (props:MyPostsComponentType) => {

    let postsElement = props.posts.map((p:PostsType) => <Post id={p.id}message={p.message} likesCount={p.likesCount}/>)


    let [postTitle, setPostTitle]=useState<string>('')

    let onChangeHandler=(e: ChangeEvent<HTMLTextAreaElement>) => {
        setPostTitle(e.currentTarget.value)
    }

    let addPostHandler =(e: MouseEvent<HTMLButtonElement>)=>{
        postTitle && props.addPost(postTitle)
        setPostTitle('')
    }


    return <div className={s.postsBlock}>
        <h3>My posts:</h3>
        <div>
            <div>
                <textarea value={postTitle} onChange={ onChangeHandler }></textarea>
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