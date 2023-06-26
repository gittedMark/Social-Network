import React from 'react';
import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { saveEditedProfileDataThunkCreator, saveUserPhotoTC } from '../../Redux/Reducers/profileReducer';
import { defineFormType, getFriendlyUserText, getInitialValues } from '../Utils/Utils';
import { TO_AVOID_DATA } from '../Utils/Constants';
import ProfileStatus from './ProfileStatus';

const renderProfileDataForms = ( userProfile ) => {
    return Object.keys( userProfile ).map( key => {
        const userFriendlyText = getFriendlyUserText( key )
        if ( TO_AVOID_DATA.includes( key ) ) {
            return null
        }
        return (
            <div key={ key }>
                <label htmlFor={ key }><b>{ `${userFriendlyText}: ` }</b></label>
                <Field id={ key }
                      name={ key}
                      type={ defineFormType(key)}/>
            </div>
        )
    } )
}
const renderContactsDataForms = (contacts) =>{
    return Object.keys( contacts ).map( contact => {
        const userFriendlyText = getFriendlyUserText( contact )
        return (
            <div key={ contact }>
                <label htmlFor={ contact }><b>{ `${userFriendlyText}: ` }</b></label>
                <Field id={ contact }
                      name={ `contacts.${contact}`}
                      type='text'/>
            </div>
        )
    } )
}

const ProfileInfoEditMode = ( { userProfile, changeEditMode, isOwner, userId } ) => {
    const profileInitialValues =  getInitialValues( userProfile )
    const dispatch = useDispatch()
    const handleSubmit = ( editedProfileData ) => {
        JSON.stringify(profileInitialValues) !== JSON.stringify(editedProfileData) &&
        dispatch( saveEditedProfileDataThunkCreator( editedProfileData, changeEditMode ) )
        changeEditMode()
    }
    const handleOnClick = () => {
        changeEditMode()
    }
    const handlePhotoUploadSubmit = ( event ) => {
        const file = event.target.files[0]
        dispatch( saveUserPhotoTC( file ) )
    }

    return (
        <Formik onSubmit={ handleSubmit } initialValues={ profileInitialValues }>
            <Form>
                <header><b>EDITING PROFILE DATA</b></header>
                <div>
                    <label><b>Photo editing: </b></label>
                    <input type='file' onChange={ handlePhotoUploadSubmit }/>
                </div>
                <ProfileStatus userId={userId} isOwner={isOwner} userProfile={userProfile}/>
                { renderProfileDataForms( userProfile ) }
                { renderContactsDataForms( userProfile.contacts ) }
                <button onClick={ handleOnClick }>Cancel</button>
                <button type='submit'>Save data</button>
            </Form>
        </Formik>
    );
};

export default ProfileInfoEditMode;