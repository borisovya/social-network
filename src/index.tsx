import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import state, {addPost, RootStateType, subscribe} from "./Redux/State";
import {BrowserRouter} from "react-router-dom";

let rerenderEntireTree = (state: RootStateType) => {

    ReactDOM.render(
        <BrowserRouter>
            <App state={state} addPost={addPost} />
        </BrowserRouter>, document.getElementById('root'));
}

rerenderEntireTree(state)

subscribe(rerenderEntireTree)

