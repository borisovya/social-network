import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {PostsType} from "../../../Redux/State";

type MyPostsComponentType = {
    posts: Array<PostsType>
}

const MyPosts = (props:MyPostsComponentType) => {

    let postsElement = props.posts.map((p:any) => <Post id={p.id}message={p.message} likesCount={p.likesCount}/>)

    return <div className={s.postsBlock}>
        <h3>My posts:</h3>
        <div>
            <div>
                <textarea></textarea>
            </div>
            <div>
                <button>Add</button>
            </div>
        </div>

        <div className={s.posts}>
            {postsElement}
        </div>
    </div>

}

export default MyPosts;