import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthDataThunkCreator, logoutThunkCreator } from '../../Redux/Reducers/authReducer';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const NavBar = () => {
    const dispatch = useDispatch()
    useEffect( () => {
        dispatch( getAuthDataThunkCreator() )
    }, [] )

    const handleSubmit = () => {
        dispatch( logoutThunkCreator() )
    }
    const { isAuthorized, login } = useSelector( state => ({
        isAuthorized: state.auth.isAuthorized,
        login: state.auth.login
    }) );
    return (
        <Navbar bg="dark" variant="dark" expand="xxl">
            <Container>
                <Navbar.Brand style={{color: "turquoise"}} href="#home">FINDMeNOW.COM</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    { isAuthorized && <Nav className="me-auto">

                        <Nav.Link href="/profile">Profile</Nav.Link>
                        <Nav.Link href="/users">Users</Nav.Link>
                        <Nav.Link href="/messages">Messages</Nav.Link>
                    </Nav>}
                    <Nav className='me-2'>
                        { isAuthorized
                            ? <span style={ { display: 'flex' } }>
                                <Nav.Link style={ { color: 'green', margin: 5 } } href="">{ login }</Nav.Link>
                                <Button onClick={ handleSubmit } style={{margin:10}}
                                        size="sm" variant="info">Logout</Button>{ ' ' }
                            </span>
                            : <div style={{color: "white"}}>Please
                                <NavLink to='/login'> sign in </NavLink> to continue, or
                                <NavLink to='/signup'> sign up </NavLink>
                            </div>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;


