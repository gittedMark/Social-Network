import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PostItem from './PostItem';
import { addPostAC } from '../../Redux/Reducers/profileReducer';

const ProfilePosts = ( { dispatch } ) => {
    const [ newPostText, setNewPostText ] = useState( '' )
    const handleOnChange = ( e ) => {
        const { value } = e.target
        setNewPostText( value )
    }
    const handleOnClick = ( newPostText ) => {
        return dispatch( addPostAC( newPostText ) )
    }
    const postData = useSelector( ( { profilePage } ) => profilePage.postData )
    return (
        <div>
            <header><b>Posts wall</b></header>
            { postData.map( post => {
                return <PostItem dispatch={ dispatch } key={ post.id } post={ post }/>
            } ) }
            <div>
                <textarea onChange={ handleOnChange }/>
                <button onClick={ () => handleOnClick( newPostText ) }>Add post</button>
            </div>
        </div>
    );
};

export default ProfilePosts;