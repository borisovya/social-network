import React from 'react'
import axios from "axios";
import {ProfileType} from "../Redux/profile-reducer";

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
        console.log('Obsolete method. Please use profileAPI object')
        return ProfileAPI.getProfile(userId)
    }

}


export const ProfileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/${userId}`);
    },
    getStatus(userId: number){
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string){
        return instance.put(`profile/status`, {status: status})
    },
    savePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put('profile/photo', formData, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileType) {
       return instance.put(`profile`, profile)
    }
}


export const AuthAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email:string, password: string, rememberMe: boolean = false, captcha?: string ) {

        return instance.post('auth/login', {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete('auth/login')
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}




