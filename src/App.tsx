import React, {useEffect} from 'react';
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import {Settings} from "./Components/Settings/Settings";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Login from "./Components/Login/Login";
import {useSelector} from "react-redux";
import {useAppDispatch, RootStateType} from "./Redux/redux-store";
import Preloader from "./Components/Common/Preloader";
import {getAuthUserData} from "./Redux/auth-reduser";
import {WithSuspense} from "./hoc/withSuspense";

const Music = React.lazy(() => import("./Components/Music/Music").then((module) => ({
    default: module.Music,
})))
const News = React.lazy(() => import("./Components/News/News").then((module) => ({
    default: module.News,
})))


let SettingsComponent = () => <Settings/>


function App() {

    let isInitialized = useSelector<RootStateType, boolean>(state => state.auth.isInitialized);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAuthUserData());
    }, [])

    if (!isInitialized) return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
        <Preloader/></div>

    return (
        <HashRouter>
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className={'app-wrapper-content'}>
                    <Switch>
                        <Route exact path='/' component={() => <Redirect to={'/profile'}/>}/>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                        <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                        <Route path='/news' render={() =><WithSuspense comp={<News/>}/>} />
                        <Route path='/music' render={() =><WithSuspense comp={<Music/>}/>} />
                        <Route path='/settings' component={SettingsComponent}/>
                        <Route path='/users' component={() => <UsersContainer/>}/>
                        <Route path='/login' component={() => <Login/>}/>
                    </Switch>
                </div>

            </div>
        </HashRouter>
    );
}

export default App;
