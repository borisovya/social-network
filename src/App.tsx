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
import {AddPostActionType, RootStateType, SendNewMessageType, UpdateDialogNewMessage,} from "./Redux/State";



let SettingsComponent = () => <Settings/>

type AppType = {
    state: RootStateType
    dispatch: (action: AddPostActionType | UpdateDialogNewMessage | SendNewMessageType)=>void
}

function App(props: AppType) {

    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className={'app-wrapper-content'}>
                    <Route path='/profile' render={() => <Profile
                        state={props.state.profilePage}
                        dispatch={props.dispatch}
                    />} />
                    <Route path='/dialogs' render={() => <Dialogs state={props.state.dialogsPage} dispatch = {props.dispatch}/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' component={SettingsComponent}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
