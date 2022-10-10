import { applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {sideBarReducer} from "./sidebar-reducer";
import {usersReducer} from "./users-reduser";
import {authReducer} from "./auth-reduser";
import thunkMiddleware from 'redux-thunk'


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sideBarPage: sideBarReducer,
    usersPage: usersReducer,
    auth: authReducer,

})

export type RootStateType = ReturnType<typeof rootReducer>

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


//@ts-ignore
window.store = store

export default store;