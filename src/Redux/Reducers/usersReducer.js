import { usersAPI } from '../../API/Api';
import { toast } from 'react-toastify';

const GET_USERS = "GET_USERS"

export const getUsersAC = ( usersData ) => ({ type: GET_USERS, usersData })

const initialState = {
    users: [],
    totalUsersCount: 0,
    usersOnPageCount: 15,

}
export const usersReducer = ( state = initialState, action ) => {
    switch ( action.type ) {

        case GET_USERS:
            const {items, totalCount} = action.usersData
            return {
                ...state, users: items, totalUsersCount: totalCount
            }

        default:
            return state
    }
}

export const getUsersTC = () => {
    return ( dispatch ) => {
        usersAPI.getUsers( 10, 1, ).then( ( response ) => {
            if ( response.status === 200 ) {
                dispatch( getUsersAC( response.data ) )
            }
            if ( response.status !== 200 ) {
                toast.error( `${ response.data.error }` )
            }
        } )
    }
}
export const getUsersOfCurrentPageTC = (page) => {
    return ( dispatch ) => {
        usersAPI.getUsers( 10, page, ).then( ( response ) => {
            if ( response.status === 200 ) {
                dispatch( getUsersAC( response.data ) )
            }
            if ( response.status !== 200 ) {
                toast.error( `${ response.data.error }` )
            }
        } )
    }
}

export const followUserTC = (userId) => {
    return(dispatch)=>{
        usersAPI.followUser(userId, {followed: true}).then(response=>{
            if(response.data.resultCode === 0){
                dispatch(getUsersTC())
            }
            if(response.data.resultCode !== 0){
                toast.error( `${ response.data.messages }` )
            }
        })
    }
}
export const unFollowUserTC = (userId) => {
    return(dispatch)=>{
        usersAPI.unFollowUser(userId, {followed: false}).then(response=>{
            if(response.data.resultCode === 0){
                dispatch(getUsersTC())
            }
            if(response.data.resultCode !== 0){
                toast.error( `${ response.data.messages }` )
            }
        })
    }
}
