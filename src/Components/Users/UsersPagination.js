import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUsersOfCurrentPageTC } from '../../Redux/Reducers/usersReducer';

const UsersPagination = ( { dispatch } ) => {
    const { totalUsersCount, usersOnPageCount } = useSelector( ( { usersPage } ) => usersPage )
    const totalPagesCount = Math.ceil( totalUsersCount / usersOnPageCount )
    const [ currentPage, setCurrentPage ] = useState( 1 )
    const onClickHandler = ( page ) => {
        setCurrentPage( page )
        dispatch( getUsersOfCurrentPageTC( page ) )
    }
    const pagesCountToRender = 11
    let startPage = Math.max( currentPage - 5, 1 )
    let endPage = Math.min( startPage + pagesCountToRender - 1, totalPagesCount )
    if ( endPage - startPage < pagesCountToRender - 1 ) {
        startPage = Math.max( endPage - pagesCountToRender + 1, 1 );
    }
    const pagesArr = []
    for ( let i = startPage; i <= endPage; i++ ) {
        pagesArr.push( i )
    }

    return (
        <div className="pagination-container">
            <span style={{ cursor: 'pointer' }} onClick={ () => onClickHandler( 1 ) }> first page </span>
            <span style={{ cursor: 'pointer' }} onClick={ () => onClickHandler( currentPage - 1 ) }> previous </span>
            { pagesArr.map( page =>{
                return <span key={ page }
                             className={ currentPage === page ? 'selected' : '' }
                             style={{ cursor: 'pointer' }}
                             onClick={ () => onClickHandler( page ) }><b> { page } </b>
                                    </span>
            } ) }
            <span style={{ cursor: 'pointer' }} onClick={ () => onClickHandler( currentPage + 1 ) }> next </span>
            <span style={{ cursor: 'pointer' }} onClick={ () => onClickHandler( totalPagesCount ) }> last page </span>
        </div>
    );
};

export default UsersPagination;