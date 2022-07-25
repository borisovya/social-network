import React from "react";
import s from './Post.module.css'

type postType = {
    message: any;
    likeCount: any;
}

const Post = (props:postType) => {

    return (
        <div className={s.item}>
            <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScG5B7-FlA2_QvKC9LjQQ6EipZjFbUeUw_Hg&usqp=CAU'/>
            {props.message}
            <div>
                <span> Like </span> {props.likeCount}
                <span> Repost </span>
            </div>
        </div>
    )
}

export default Post;