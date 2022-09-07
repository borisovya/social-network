import {AnyAction, combineReducers, createStore, Store} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {sideBarReducer} from "./sidebar-reducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sideBarPage: sideBarReducer
})

export type RootStateType = ReturnType<typeof rootReducer>

let store: Store<RootStateType, AnyAction> = createStore(rootReducer);


//@ts-ignore
window.store = store

export default store;