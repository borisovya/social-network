import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store, {RootStateType} from "./Redux/redux-store";
import {BrowserRouter} from "react-router-dom";
import {AnyAction, Store} from "redux";
import {Provider} from "react-redux";

// let rerenderEntireTree = (store: Store<RootStateType, AnyAction>) => {
     ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>, document.getElementById('root'));
// }

// rerenderEntireTree(store)
//
// store.subscribe(()=>{
//     rerenderEntireTree(store);
// })

