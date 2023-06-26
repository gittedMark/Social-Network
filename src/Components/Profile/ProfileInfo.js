import React, { useState } from 'react';
import ProfileInfoReadMode from './ProfileInfoReadMode';
import ProfileInfoEditMode from './ProfileInfoEditMode';


const ProfileInfo = ( { userId, userProfile, isOwner } ) => {
    const [ editMode, setEditMode ] = useState( false )
    const changeEditMode = () => {
        setEditMode( !editMode )
    }

    return (
        <div>
            { !editMode
                ? <ProfileInfoReadMode userId={ userId }
                                       isOwner={ isOwner }
                                       userProfile={ userProfile }
                                       changeEditMode={ changeEditMode }/>
                : <ProfileInfoEditMode userId={ userId }
                                       isOwner={ isOwner }
                                       userProfile={ userProfile }
                                       changeEditMode={ changeEditMode }/>
            }
        </div>
    );
};

export default ProfileInfo;