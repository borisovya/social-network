import React from 'react'
import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: { 'API-KEY': 'c867f151-d778-4732-b771-491c0bdd4a4a'}
})


export const UsersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    unFollowUser (userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    },

    followUser(userId: number) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data)
    },

    getProfile(userId: number) {
        return instance.get(`profile/${userId}`);
    }

}


export const AuthAPI = {
    me() {
        return instance.get(`auth/me`)
    }

}

