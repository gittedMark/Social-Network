import axios from 'axios';


const instance = axios.create( {
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: { "API-KEY": '8e434722-954f-4c9f-a5a5-a48589b27e4e' }
} )


export const authAPI = {
    getAuthData() {
        return instance.get( "/auth/me" )
    },
    login( email, password, rememberMe = false, captcha ) {
        return instance.post( "/auth/login/", { email, password, rememberMe, captcha } )
    },
    logout() {
        return instance.delete( "/auth/login" )
    },
    signUp() {
        return instance.post( "/auth/signUp" )
    },
    getCaptcha() {
        return instance.get( "/security/get-captcha-url" )
    },

}

export const profileAPI = {
    getUserProfile( userId ) {
        return instance.get( `profile/` + userId )

    },
    putPhoto( photoAsFile ) {
        const formData = new FormData()
        formData.append( 'name', photoAsFile )
        return instance.put( `profile/photo`, formData, {
            headers: { "Content-type": "multipart/form-data" }
        } )
    },
    saveChangedUserStatus( data ) {
       return instance.put( `profile/status`, { status: data } )
    },
    getUserStatus( userId ) {
        return instance.get( `profile/status/` + userId )
    },saveEditedProfileData( data ) {
        return instance.put( `profile/`,  data )
    },
}

export const usersAPI = {
    getUsers(count, page, term, friend){
        return instance.get(`users`, { params:{count, page, term, friend}})
    },
    followUser(userId){
        return instance.post(`follow/` + userId)
    },
    unFollowUser(userId){
        return instance.delete(`follow/` + userId)
    }
}