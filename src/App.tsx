import React from 'react';
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import {BrowserRouter, Route} from "react-router-dom";
import {News} from "./Components/News/News";
import {Music} from "./Components/Music/Music";
import {Settings} from "./Components/Settings/Settings";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";





let SettingsComponent = () => <Settings/>


function App() {

    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <HeaderContainer />
                <Navbar/>
                <div className={'app-wrapper-content'}>
                    <Route path='/profile/:userId?' render={() => <ProfileContainer />}/>
                    <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' component={SettingsComponent}/>
                    <Route path='/users' component={() => <UsersContainer />}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
