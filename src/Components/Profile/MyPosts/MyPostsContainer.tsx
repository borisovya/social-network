import React from "react";
import {addPostActionCreator, AddPostActionType, PostsType} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {AnyAction, Dispatch} from "redux";



type MyPostsComponentType = {
    posts:Array<PostsType>
    dispatch:  Dispatch<AnyAction>
}



const MyPostsContainer = (props:MyPostsComponentType) => {


    let addPostHandler =(postTitle:string)=>{
        postTitle && props.dispatch(addPostActionCreator(postTitle))
    }


    return <MyPosts posts={props.posts} addPost={addPostHandler}/>


}

export default MyPostsContainer;