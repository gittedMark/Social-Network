import { profileAPI } from '../../API/Api';
import { toast } from 'react-toastify';
import { getUsersTC } from './usersReducer';

const GET_USER_PROFILE = "GET_USER_PROFILE"
const SAVE_PHOTO = "SAVE_PHOTO"
const SAVE_STATUS = "SAVE_STATUS"
const ADD_POST = "ADD_POST"
const DELETE_POST = "DELETE_POST"


export const getUserProfileAC = ( userProfile ) => ({ type: GET_USER_PROFILE, payload: {userProfile} })
export const savePhotoAC = ( photoFile ) => ({ type: SAVE_PHOTO, photoFile })
export const setStatusAC = ( status ) => ({ type: SAVE_STATUS, payload: {status} })
export const addPostAC = (text) => ({type: ADD_POST, text})
export const deletePostAC = (postId) => ({type: DELETE_POST, postId})

const initialState = {
    postData: [
        { id: 0, postText: 'Hi everyone!', likesCount: 4 },
        { id: 1, postText: 'He he!', likesCount: 5 },
        { id: 2, postText: 'Oh!', likesCount: 6 },
    ],
    userProfile: null,
    status: '',
}

export const profileReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case GET_USER_PROFILE:
        case SAVE_STATUS:
            return {
                ...state, ...action.payload
            }
        case ADD_POST:
            const newPost = {id: state.postData.length, postText: action.text, likesCount: 0}
            return {
                ...state, postData: [...state.postData, newPost]
            }
        case DELETE_POST:
            const postData = state.postData.filter(postItem => postItem.id !== action.postId)
            return {
                ...state, postData
            }
        default:
            return state
    }
}

export const getUserProfileTC = ( userId ) => {
    console.log('userIdTC', userId)
    return async ( dispatch ) => {
        await profileAPI.getUserProfile( userId ).then( response => {
            if ( response.data ) {
                dispatch( getUserProfileAC( response.data ) )
            }
        } )
    }
}

export const saveUserPhotoTC = ( photoFile ) => {
    return ( dispatch, getState ) => {
        const userId = getState().auth.id;
        profileAPI.putPhoto( photoFile ).then( response => {
            if ( response.data.resultCode === 0 ) {
                dispatch( savePhotoAC( response.data.data.photos ) )
                toast.success( 'Photo downloaded successfully' )
                dispatch( getUserProfileTC( userId ) )
            }
            if ( response.data.resultCode !== 0 ) {
                toast.error( `${ response.data.messages }` )
            }
        } )
    }
}

export const saveUserStatusTC = ( status, userId ) => {
    return ( dispatch ) => {
        profileAPI.saveChangedUserStatus( status ).then( response => {
            if ( response.data.resultCode === 0 ) {
                dispatch( getUserStatusTC( userId ) )
                toast.success( 'Status is saved' )
            } else {
                toast.error( `${ response.data.messages }` )
            }
        } )
    }
}
export const getUserStatusTC = ( userId ) => {
    return ( dispatch ) => {

        profileAPI.getUserStatus( userId ).then( response => {

            if ( response.status === 200 ) {
                dispatch( setStatusAC( response.data ) )
            } else {
                toast.error( `Something went wrong` )
            }
        } )


    }
}
export const saveEditedProfileDataThunkCreator = ( editedProfileData) => {
    return ( dispatch, getState ) => {
        const userId = getState().auth.id
        profileAPI.saveEditedProfileData( editedProfileData ).then( response => {
            if ( response.data.resultCode === 0 ) {
                dispatch( getUsersTC( userId ) )
                toast.success( 'Profile was updated' )
            } else {
                toast.error( `${ response.data.messages }` )
            }
        } )
    }
}






