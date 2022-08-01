import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";


const MyPosts = () => {

    let postsData = [
        {id: 1, message: 'Hi how are you?', likesCount: 23},
        {id: 2, message: 'Is this my post?', likesCount: 12},
        {id: 3, message: 'Abrakadabra?', likesCount: 112},
        {id: 4, message: 'HAHAHAH!!', likesCount: 42},
    ]

    let postsElement = postsData.map(p => <Post message={p.message} likeCount={p.likesCount}/>)

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