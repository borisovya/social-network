import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";


const MyPosts = () => {

    let postsData = [
        {id: 1, message: 'Hi how are you?', likesCount: 23},
        {id: 2, message: 'Is this my post?', likesCount: 12},
    ]

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
            <Post message={postsData[0].message} likeCount={postsData[0].likesCount}/>
            <Post message={postsData[1].message} likeCount={postsData[1].likesCount}/>
        </div>
    </div>

}

export default MyPosts;