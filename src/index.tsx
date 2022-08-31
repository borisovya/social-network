import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store, {RootStoreType} from "./Redux/redux-store";
import {BrowserRouter} from "react-router-dom";
import {AnyAction, Store} from "redux";

let rerenderEntireTree = (store: Store<RootStoreType, AnyAction>) => {
    ReactDOM.render(
        <BrowserRouter>
            <App state={store} />
        </BrowserRouter>, document.getElementById('root'));
}

rerenderEntireTree(store)

store.subscribe(()=>{
    rerenderEntireTree(store);
})

