import {AnyAction, combineReducers, createStore, Store} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {sideBarReducer} from "./sidebar-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sideBarPage: sideBarReducer
})

export type RootStoreType = ReturnType<typeof reducers>

let store: Store<RootStoreType, AnyAction> = createStore(reducers);


//@ts-ignore
window.store = store

export default store;