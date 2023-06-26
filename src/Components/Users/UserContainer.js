import React, { useEffect } from 'react';
import Users from './Users';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersTC } from '../../Redux/Reducers/usersReducer';
import { Preloader } from '../Utils/Preloader';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';


const UserContainer = () => {
    const dispatch = useDispatch()
    useEffect( () => {
        dispatch( getUsersTC() )
    }, [ dispatch ] )
    const users = useSelector( ( { usersPage } ) => usersPage.users )
    if ( !users ) {
        return <Preloader/>
    }
    return (
        <div>
            <Users users={ users } dispatch={dispatch}/>
        </div>
    );
};

export default withAuthRedirect(UserContainer);