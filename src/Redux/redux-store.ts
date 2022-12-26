import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {sideBarReducer} from "./sidebar-reducer";
import {usersReducer} from "./users-reducer";
import {authReducer} from "./auth-reduser";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {useDispatch} from "react-redux";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sideBarPage: sideBarReducer,
    usersPage: usersReducer,
    auth: authReducer,

})

export type RootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, AnyAction>

export type AppDispatchType = ThunkDispatch<RootStateType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatchType>();

export const getState = () => store

//@ts-ignore
window.store = store

export default store;