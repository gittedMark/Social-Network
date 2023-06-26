import React, { useEffect } from 'react';
import ProfileInfo from './ProfileInfo';
import ProfilePosts from './ProfilePosts';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileTC, getUserStatusTC } from '../../Redux/Reducers/profileReducer';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import { Preloader } from '../Utils/Preloader';
import { useParams } from 'react-router-dom';


const ProfileContainer = () => {
    const dispatch = useDispatch()
    const ownerId  = useSelector( ( state ) => state.auth.id )
    let {userId} = useParams()
    const params = useParams()
    console.log('params', params)
    if(!userId){
        userId = ownerId
    }
    console.log('ownerId1',userId)
    useEffect( () => {
        if (userId) {
            dispatch(getUserProfileTC(userId));
            dispatch(getUserStatusTC(userId))
        }
    }, [ dispatch, userId ] )
    const { userProfile } = useSelector( ( { profilePage } ) => profilePage )
    if(!userProfile){
        return <Preloader/>
    }
    const isOwner = ownerId === userId
    return (
            <div>
                <ProfileInfo isOwner={isOwner}  userId={userId}  userProfile={userProfile}/>
                {isOwner && <ProfilePosts dispatch={dispatch}/>}
            </div>
    );
};

export default withAuthRedirect(ProfileContainer)
