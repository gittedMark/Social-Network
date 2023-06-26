import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const withAuthRedirect = ( Component ) => {
    return ( props ) => {
        const isAuth = useSelector( ( state ) => state.auth.isAuthorized )
        const navigate = useNavigate()
        return (
            <>
                { isAuth ? <Component/> : navigate( "/login" ) }
            </>
        )
    }

};
