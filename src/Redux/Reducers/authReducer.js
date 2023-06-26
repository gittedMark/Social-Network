import { authAPI } from '../../API/Api';
import { toast } from 'react-toastify';


const GET_AUTH_DATA = 'GET_AUTH_DATA';
const GET_CAPTCHA = 'GET_CAPTCHA';


export const getAuthDataAC = ( id, email, login, isAuthorized, captchaUrl ) => ({
    type: GET_AUTH_DATA, payload: { id, email, login, isAuthorized, captchaUrl } });
export const getCaptchaAC = ( captchaUrl ) => ({ type: GET_CAPTCHA, payload: { captchaUrl }
});

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuthorized: false,
    captchaUrl: null,
}
export const authReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case GET_AUTH_DATA:
        case GET_CAPTCHA:
            return {
                ...state, ...action.payload
            }
        default:
            return state
    }
};

export const loginThunkCreator = ( data, navigate ) => {
    return ( dispatch ) => {
        return authAPI.login( data.email, data.password, data.rememberMe, data.captcha ).then( response => {
            if ( response.data.resultCode === 0 ) {
                dispatch( getAuthDataThunkCreator() )
                toast.success( 'Login succeed' )
                navigate( '/profile' );
            } else if ( response.data.resultCode === 10 ) {
                dispatch(getCaptchaTC() )
                toast.error( `${ response.data.messages }` )
            } else {
                toast.error( `${ response.data.messages }` )
            }

        } )
    }
}
export const getAuthDataThunkCreator = () => {
    return async ( dispatch ) => {
        await authAPI.getAuthData().then( response => {
            if ( response.data.resultCode === 0 ) {
                const { id, email, login } = response.data.data
                dispatch( getAuthDataAC( id, email, login, true, '' ) );
                // toast.success("Getting auth data is succeed")
            }
            if ( response.data.resultCode !== 0 ) {
                toast.error( `${ response.data.messages }` )
            }
        } )
    }
}
export const getCaptchaTC = () => {
    return async ( dispatch ) => {
        await authAPI.getCaptcha().then( response => {
                dispatch( getCaptchaAC( response.data.url) );
        } )
    }
}


export const logoutThunkCreator = () => {
    return ( dispatch ) => {
        authAPI.logout().then( response => {
            if ( response.data.resultCode === 0 ) {
                dispatch( getAuthDataAC( null, null, null, false ) )

            }
            if ( response.data.resultCode !== 0 ) {
                toast.error( `${ response.data.messages }` )
            }
        } )
    }
}

export const signUpThunkCreator = ( data, navigate ) => {
    const { firstName, lastName, age, lookingForAJob, password, confirmPassword } = data
    return () => {
        authAPI.signUp( firstName, lastName, age, lookingForAJob, password, confirmPassword ).then( response => {
                if ( response.data.resultCode === 0 ) {
                    toast.success( 'Sign up is succeed' )
                    navigate( '/login' );
                }
                if ( response.data.resultCode !== 0 ) {
                    toast.error( `${ response.data.messages }` )
                }
            }
        )
    }
}


