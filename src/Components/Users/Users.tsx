import React from 'react'
import userDefaultPhoto from "../../asseds/imgs/profileDefaultPic.png";
import s from "./UsersStyle.module.css";
import axios from "axios";
import {UsersGeneralType} from "./UsersContainer";


class Users extends React.Component<UsersGeneralType> {

    // constructor(props: UsersGeneralType) {
    //     super(props);
    // }

    componentDidMount(): void {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setTotalUsersCount(response.data.totalCount)
        });

    }

    onPageChange = (pageNumber: number) => {
        this.props.changeCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
        });
    }

    render() {

        let pagesCount: number = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
        let pages: Array<number> = [];
        for (let i=1; i <= pagesCount; i++) {
            pages.push(i)
        }

        return <div>
            <div>
                {pages.map(p=> {return <span onClick={(event)=>{this.onPageChange(p)}} className={this.props.currentPage===p ? s.selectedPage : ''}>{p}</span>})}
            </div>
            {
                this.props.users.map(u => <div key={u.id}>
            <span>
                <div>
                    <img src={u.photos.small != null ? u.photos.small : userDefaultPhoto} className={s.photo}/>
                </div>
                <div>
                    {u.followed ? <button onClick={() => this.props.unFollow(u.id)}>Unfollow</button> :
                        <button onClick={() => this.props.follow(u.id)}>Follow</button>}
                </div>
            </span>
                    <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>
                </div>)}
        </div>
    }
}

export default Users