import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";


const MyPosts = () => {
    return <div>
        My posts:
        <div>
            <textarea></textarea>
            <button>Add</button>
        </div>

        <div className={s.posts}>
            <Post message='Hi how are you?' likeCount='23'/>
            <Post message='Is this my post?' likeCount='234'/>
        </div>
    </div>

}

export default MyPosts;