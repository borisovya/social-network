import React from "react";
import s from './Post.module.css'
import {PostsType} from "../../../../Redux/profile-reducer";

const Post = (props:PostsType) => {

    return (
        <div className={s.item}>
            <img alt='img'
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScG5B7-FlA2_QvKC9LjQQ6EipZjFbUeUw_Hg&usqp=CAU'/>
            {props.message}
            <div>
                <span> Like </span> {props.likesCount}
                <span> Repost </span>
            </div>
        </div>
    )
}

export default Post;