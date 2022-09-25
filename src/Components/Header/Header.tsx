import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";


type HeaderType = {
    isAuth: boolean
    login: string | null
}

const Header = (props: HeaderType) => {
    return <header className={s.header}>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7iG6fq9WxA5-0RDwRJE5cCzgOfBkx2T02cg&usqp=CAU'/>

        <div className={s.loginBlock}>
            {props.isAuth ? props.login : <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>
}

export default Header;