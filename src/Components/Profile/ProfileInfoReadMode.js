import React from 'react';
import { getFriendlyUserText } from '../Utils/Utils';
import { IS_CHECK_BOX, TO_AVOID_DATA } from '../Utils/Constants';
import { useSelector } from 'react-redux';


const renderProfileDataPhoto = ( photoData ) => {
    return <img src={ photoData.small || photoData.large } alt='Oh'/>
}
const renderProfileDataContacts = ( contacts ) => {

    return (
        <div>
            <header><b>Contacts:</b></header>
            { Object.keys( contacts ).map( contact => {
                const userFriendlyText = getFriendlyUserText( contact )
                return contacts[contact] && <div key={ contact }>
                    <b>{ `${ userFriendlyText }: `}</b>
                    <span>{ contacts[contact] }</span>
                </div>
            } ) }
        </div>
    )

}

const renderProfileData = ( userProfile ) => {

    return Object.keys( userProfile ).map( key => {
        const userFriendlyText = getFriendlyUserText( key )
        if ( TO_AVOID_DATA.includes( key ) ) {
            return null
        }
        if ( IS_CHECK_BOX.includes( key ) ) {

            return (
                <div key={ key }>
                    <b>{ `${ userFriendlyText }: `}</b>
                    <span>{ userProfile[key] ? "yes" : "no" }</span>
                </div>
            )
        }
        return userProfile[key] && <div key={ key }>
            <b>{ `${ userFriendlyText }: `}</b>
            <span>{ userProfile[key] }</span>
        </div>
    } )
}

const ProfileInfoReadMode = ( { userProfile, changeEditMode, isOwner } ) => {
    const status = useSelector( state => state.profilePage.status )
    const handleOnClick = () => {
        changeEditMode();
    }
    return (
        <div>
            { renderProfileDataPhoto( userProfile.photos ) }
            {isOwner && <div><b>User status: </b>{ `${ status }` }</div>}
            { renderProfileData( userProfile ) }
            { renderProfileDataContacts( userProfile.contacts ) }
            { isOwner && <button onClick={ handleOnClick }>Edit profile data</button> }
        </div>
    );
}

export default ProfileInfoReadMode;
