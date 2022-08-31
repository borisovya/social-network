import React from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import Navbar from "./Components/Navbar/Navbar";
import Profile from "./Components/Profile/Profile";
import {Dialogs} from "./Components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {News} from "./Components/News/News";
import {Music} from "./Components/Music/Music";
import {Settings} from "./Components/Settings/Settings";
import {AnyAction, Dispatch, Store} from "redux";
import {RootStoreType} from "./Redux/redux-store";
import {DialogsContainer} from "./Components/Dialogs/DialogsContainer";



let SettingsComponent = () => <Settings/>

type AppType = {
    state:  Store<RootStoreType, AnyAction>

}

function App(props: AppType) {

    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className={'app-wrapper-content'}>
                    <Route path='/profile' render={() => <Profile
                        profilePage={props.state.getState().profilePage}
                        dispatch = {props.state.dispatch}
                    />} />
                    <Route path='/dialogs' render={() => <DialogsContainer
                        state={props.state.getState().dialogsPage}
                        dispatch = {props.state.dispatch}
                    />}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' component={SettingsComponent}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
