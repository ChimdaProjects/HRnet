import React, { useEffect, useState } from 'react';
import "./pagination.scss"

const Pagination = (props) => {
    const { entriesPerPage, totalEntries, paginate, start, end, currentPage, handlePreviousPage, handleNextPage, setCurrentPage  } = props;
    
    const [ firstPage, setFirstPage ] = useState(1);
    const [ lastPage, setLastPage ] = useState(5);
    
    useEffect(() => {
        const first = currentPage <= 3 ? 0 : currentPage - 3;
        const last =  firstPage + 3 > pages.length ? pages.length : firstPage + 3;

        setLastPage(last);
        setFirstPage(first);
    }, [currentPage]);

    // page numbers list
    const pages = [];
    for (let i = 1; i <= Math.ceil(totalEntries / entriesPerPage) ; i++) {
        pages.push(i); 
    };
    const entryEnd = pages.length === currentPage ? totalEntries : end ;
    
    return ( 
        <div className="pagination">
            <div className="pagination-details">
                <p className="pagination-details-content">Showing { start + 1 } to { entryEnd } of { totalEntries } entries </p>
            </div>
            <nav className="pagination-nav">
                <ul className="pagination-list">
                    <li className="pagination-list-item">
                        <button className={ currentPage === 1 ? "pagination-list-item-btn-disabled prev" : "pagination-list-item-btn prev"} onClick={ () => currentPage > 1 ? setCurrentPage(currentPage - 1) : "" }>Previous</button>
                    </li>
                    {pages.map((number) => {
                        return (
                        <li key={number} className="pagination-list-item">
                            <button 
                                onClick={ ()=> paginate(number) } 
                                className={ currentPage === number ? "pagination-list-item-btn pagination-active" : "pagination-list-item-btn" }>
                                { number }
                            </button>

                        </li>)
                    })}
                    <li className="pagination-list-item">
                        <button className={currentPage===pages.length ? "pagination-list-item-btn-disabled next " : "pagination-list-item-btn next "} onClick={ () => currentPage === pages.length ? "" : setCurrentPage(currentPage + 1) }>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
 
export default Pagination;