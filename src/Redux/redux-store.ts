import {AnyAction, combineReducers, createStore, Store} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {sideBarReducer} from "./sidebar-reducer";
import {usersReducer} from "./users-reduser";
import {authReducer} from "./auth-reduser";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sideBarPage: sideBarReducer,
    usersPage: usersReducer,
    auth: authReducer
})

export type RootStateType = ReturnType<typeof rootReducer>

let store: Store<RootStateType, AnyAction> = createStore(rootReducer);


//@ts-ignore
window.store = store

export default store;