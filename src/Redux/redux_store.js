import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './Reducers/authReducer';
import { profileReducer } from './Reducers/profileReducer';
import { appReducer } from './Reducers/appReducer';
import { usersReducer } from './Reducers/usersReducer';

const reducer = combineReducers( {
    auth: authReducer,
    // app: appReducer,
    profilePage: profileReducer,
    usersPage: usersReducer,


    // messagePage: messageReducer,
    // usersPage: usersReducer,
    // app: appReducer
} )

export const store = configureStore( { reducer } );