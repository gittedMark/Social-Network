import React from 'react';
import { deletePostAC } from '../../Redux/Reducers/profileReducer';

const PostItem = ( { post, dispatch } ) => {
    const { id, postText, likesCount } = post
    const handleOnClick = (id) => {
        console.log('deletePostAC', deletePostAC(id))
        return dispatch( deletePostAC( id ) )


    }

    return (
        <div>
            <span><b>post №{ id }: </b></span>
            <span>{ postText }  </span>
            <span>likes: { likesCount }  </span>
            <button onClick={ () => handleOnClick( id ) }>Delete post</button>
        </div>
    );
};

export default PostItem;