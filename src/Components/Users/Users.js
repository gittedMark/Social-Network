import React from 'react';
import UsersPagination from './UsersPagination';
import UserItem from './UserItem';
import { Preloader } from '../Utils/Preloader';


const Users = ( { users, dispatch } ) => {
    if(!users){
        return <Preloader/>
    }
    return (
        <div>
            <UsersPagination dispatch={dispatch}/>
            { users.map( user => {
                return (
                    <div key={ user.id }>
                        <UserItem user={ user } dispatch={dispatch}/>
                    </div>
                )
            } )
            }
        </div>
    );
};

export default Users;