import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunkCreator } from '../../Redux/Reducers/authReducer';
import * as Yup from 'yup';
import { getForms } from '../Utils/Utils';
import { useNavigate } from 'react-router-dom';


const loginValidationSchema = Yup.object().shape( {
    email: Yup.string().email( 'Invalid email' ).required( 'Required' ),
    password: Yup.string()
        .required( 'Password is required' )
        .min( 8, 'Password must be at least 8 characters long' )

} );

const LoginPage = () => {
        const [ isSubmitting, setIsSubmitting ] = useState( false )
    const captchaUrl = useSelector( state => state.auth.captchaUrl );
        const changeIsSubmitting = () => {
            setIsSubmitting( ( prevIsSubmitting ) => !prevIsSubmitting )
        }
    // const changeIsSubmitting = () => {
    //     setIsSubmitting((isSubmitting) => !isSubmitting
    //     )
    // }
        const navigate = useNavigate()
        const dispatch = useDispatch()
        const handleSubmit = async ( data ) => {
            changeIsSubmitting()
            await dispatch( loginThunkCreator( data, navigate ) )
            await changeIsSubmitting()
        }
        const initialValues = {
            email: '',
            password: '',
            captcha: '',
        }
        return (
            <Formik initialValues={ initialValues } onSubmit={ handleSubmit } validationSchema={ loginValidationSchema }>
                <Form>
                    { getForms( initialValues, captchaUrl ) }
                    <button disabled={ isSubmitting } type='submit'>
                        { isSubmitting ? 'Submitting...' : 'Submit' }
                    </button>
                </Form>
            </Formik>
        );
    }
;

export default LoginPage;