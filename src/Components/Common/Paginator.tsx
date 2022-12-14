import React from 'react'
import s from "./Paginator.module.css";

type propsType = {

    onPageChange: (p: number)=> void
    totalUsersCount: number
    pageSize: number
    currentPage: number
}

const Paginator = (props: propsType) => {

    // let pagesCount: number = Math.ceil(props.totalUsersCount / props.pageSize)
    //
    // let pages: Array<number> = [];
    // for (let i = 1; i <= pagesCount; i++) {
    //     pages.push(i)
    // }


    return <div>
            {/*{pages.map(p => {*/}
            {/*    return <span onClick={(event) => {*/}
            {/*        props.onPageChange(p)*/}
            {/*    }} className={props.currentPage === p ? s.selectedPage : ''}>{p}</span>*/}
            {/*})}*/}
        <Paginator onPageChange={props.onPageChange} totalUsersCount={props.totalUsersCount} pageSize={props.pageSize} currentPage={props.currentPage} />
        </div>
        
}

export default Paginator