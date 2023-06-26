import './App.css';
import MessagesContainer from './Components/Messages/MessagesContainer';
import { Route, Routes } from 'react-router-dom';
import NavBar from './Components/0Navbar/NavBar';
import LoginPage from './Components/authPage/LoginPage';
import SignUpPage from './Components/authPage/SignUpPage';
import ProfileContainer from './Components/Profile/ProfileContainer';
import UserContainer from './Components/Users/UserContainer';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const App = () => {
    return (
        <Container fluid className="w-100">
            <Row>
                <div className="App">
                    <NavBar/>
                    <>
                        <Routes>
                            <Route path="/profile/:userId?" element={ <ProfileContainer/> }/>
                            <Route path="/messages" element={ <MessagesContainer/> }/>
                            <Route path="/users" element={ <UserContainer/> }/>
                            <Route path="/login" element={ <LoginPage/> }/>
                            <Route path="/signup" element={ <SignUpPage/> }/>
                        </Routes>
                        <ToastContainer theme="colored"/>
                    </>
                </div>
            </Row>
        </Container>
    );
}

export default App;
