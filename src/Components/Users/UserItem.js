import React from 'react';
import { followUserTC, unFollowUserTC } from '../../Redux/Reducers/usersReducer';
import { getUserProfileTC } from '../../Redux/Reducers/profileReducer';
import { useNavigate } from 'react-router-dom';


const UserItem = ( { user, dispatch } ) => {
    const navigate = useNavigate()
    const { photos, name, status } = user

    const onClickUnfollowHandler = ( id ) => {
        dispatch( unFollowUserTC( id ) )
    }
    const onClickFollowHandler = ( id ) => {
        dispatch( followUserTC( id ) )
    }
    const onClickRerenderToUserProfile = ( id ) => {
        dispatch( getUserProfileTC( id ) )
        navigate( `/profile/${id}` )
    }
    return (
        <div>
            <img onClick={ () => onClickRerenderToUserProfile( user.id ) }
                 src={ photos?.small || photos?.large }
                 alt='oh'
                 style={ { cursor: 'pointer' } }/>

            <div>{ name }</div>
            { status && <div>Status:{ status }</div> }
            { user.followed
                ? <button onClick={ () => onClickUnfollowHandler( user.id ) }>Unfollow</button>
                : <button onClick={ () => onClickFollowHandler( user.id ) }>Follow</button>
            }


        </div>
    );
};

export default UserItem;
