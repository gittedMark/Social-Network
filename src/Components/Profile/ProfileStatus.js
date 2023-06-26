import React, { useState } from 'react';
import { saveUserStatusTC } from '../../Redux/Reducers/profileReducer';
import { useDispatch, useSelector } from 'react-redux';

const ProfileStatus = ( { userId, isOwner } ) => {
    console.log('userIdStatus',userId)
    const dispatch = useDispatch()
    const status = useSelector( ( state ) => state.profilePage.status )
    const [ isInputMode, setInputMode ] = useState( false )
    const changeMode = () => {
        setInputMode( !isInputMode )
    }
    const [ changedValue, setChangedValue ] = useState( status )
    const handleChange = ( event ) => {
        setChangedValue( event.target.value )
    }
    const handleBlur = ( e ) => {
        if ( status !== changedValue ) {
            dispatch( saveUserStatusTC( changedValue, userId ) )
        }
        changeMode( !isInputMode )
    }
    const onDoubleClickHandle = () => isOwner && changeMode( !isInputMode )

    return (
        <div>
            <div>Double click on your status value to edit it</div>
            <label><b>User status: </b></label>
            { isInputMode
                ? <input type="text"
                         autoFocus={ true }
                         value={ changedValue }
                         placeholder='Fill in'
                         onBlur={ handleBlur }
                         onChange={ handleChange }/>
                : <span onDoubleClick={ onDoubleClickHandle }>{ status || 'Here must be your status' }</span> }
        </div>
    );
};

export default ProfileStatus;