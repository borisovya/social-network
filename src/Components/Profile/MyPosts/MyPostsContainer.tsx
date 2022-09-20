import React from "react";
import {addPost, PostsType} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {AnyAction, Dispatch} from "redux";
import {connect} from "react-redux";
import {RootStateType} from "../../../Redux/redux-store";

type mapStateToPropsType = {
    posts: Array<PostsType>
}

type mapDispatchToPropsType = {
    addPost: (postTitle: string) => void
}

export type MyPostsType = mapStateToPropsType & mapDispatchToPropsType

const mapStateToProps = (state: RootStateType): mapStateToPropsType => {
    return {
        posts: state.profilePage.posts
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): mapDispatchToPropsType => {
    return {
        addPost: (postTitle: string) => {
            postTitle && dispatch(addPost(postTitle))
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

