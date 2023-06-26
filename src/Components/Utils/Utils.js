import { Field } from 'formik';
import React from 'react';
import { IS_CHECK_BOX, TO_AVOID_DATA_ACCEPT_CONTACTS } from './Constants';

export const getForms = ( initialValues, captchaUrl ) => {
    console.log( "captchaUrl33", captchaUrl )
    console.log( 'initialValues', initialValues )
    return Object.keys( initialValues ).map( key => {
            if ( key === "captcha" ) {
                if ( captchaUrl ) {
                    return <div key={ key }>
                        <img src={ captchaUrl } alt="oh"/>
                        <label htmlFor="captcha" className="form-label">Insert symbols from captcha before login</label>
                        <Field id="captcha"
                               className="form-input"
                               name="captcha"
                               type="text"/>
                    </div>
                } else {
                    return null
                }
            }
            return <div key={ key } className="form-field">
                <label htmlFor={ key } className="form-label">{ key } </label>
                <Field id={ key }
                       className="form-input"
                       name={ key }
                       type={ defineFormType( key ) }
                       placeholder="Fill me"/>
            </div>
        }
    )
}

export const defineFormType = ( form ) => {
    if ( form === "email" ) {
        return "email"
    }
    if ( form === "lookingForAJob" ) {
        return "checkbox"
    }
    if ( form === "password" || form === "validationSchema" ) {
        return "password"
    }
    if ( form === "age" ) {
        return "number"
    }
    return "text"
}

export const getFriendlyUserText = ( text ) => {
    return text.replace( /([A-Z])([A-Z])/g, "$1 $2" )
        .replace( /([a-z])([A-Z])/g, "$1 $2" )
        .toLowerCase()
        .replace( /^\w/, a => a.toUpperCase() )
}

export const getInitialValues = ( data ) => {
    const initialValues = {}
    Object.keys( data ).forEach( key => {
        if ( key === 'contacts' ) {
            initialValues[key] = getInitialValues( data.contacts )
            return
        }
        if ( IS_CHECK_BOX.includes( key ) && !data[key] ) {
            initialValues[key] = false
        } else {
            initialValues[key] = data[key] || '';
        }
        if ( TO_AVOID_DATA_ACCEPT_CONTACTS.includes( key ) ) {
            return
        }
        if ( data[key] && data[key] !== '' ) {
            initialValues[key] = data[key]
        } else {
            initialValues[key] = ''
        }
    } )
    return initialValues
}


