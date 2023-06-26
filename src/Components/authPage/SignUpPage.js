import React from 'react';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUpThunkCreator } from '../../Redux/Reducers/authReducer';
import * as Yup from 'yup';
import { object, string, number } from 'yup';
import { getForms } from '../Utils/Utils';


const signUpValidationSchema = object().shape( {
    firstName: string()
        .min( 2, 'Too Short!' )
        .max( 50, 'Too Long!' )
        .required( 'Required' ),
    lastName: string()
        .min( 2, 'Too Short!' )
        .max( 50, 'Too Long!' )
        .required( 'Required' ),
    age: number().positive( 'Age must be a positive number' ).required( 'Age is required' ),
    email: string().email( 'Invalid email' ).required( 'Required' ),
    password: string()
        .required( 'Password is required' )
        .min( 8, 'Password must be at least 8 characters long' )
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
        ),
    confirmPassword: string()
        .oneOf( [ Yup.ref( 'password' ), null ], 'Passwords must match' )
        .required( 'Confirm Password is required' ),
} );


const SignUpPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const signUpInitialValues = {
        email: '',
        firstName: '',
        lastName: '',
        age: 0,
        lookingForAJob: false,
        password: '',
        confirmPassword: '',
    }

    const handleSubmit = ( values ) => {
        dispatch( signUpThunkCreator( values, navigate ) )
    }
    return (
        <Formik initialValues={ signUpInitialValues } onSubmit={ handleSubmit } validationSchema={signUpValidationSchema }>
            <Form className="form-container">
                {getForms(signUpInitialValues)}
                <button type='submit'>Submit</button>
            </Form>
        </Formik>
    );
};

export default SignUpPage;
