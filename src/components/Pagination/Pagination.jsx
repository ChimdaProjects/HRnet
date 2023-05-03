import React from 'react';
import "./pagination.scss"

const Pagination = (props) => {
    const { entriesPerPage, totalEntries, paginate, start, end, currentPage  } = props;
    // page numbers list
    const pages = [];
    for (let i = 1; i <= Math.ceil(totalEntries / entriesPerPage) ; i++) {
        pages.push(i); 
    };
    const entryEnd = pages.length === currentPage ? totalEntries : end ;
    return ( 
        <>
        <div>
            <p>Showing {start + 1} to {entryEnd} of {totalEntries} entries </p>
        </div>
        <nav className="pagination-nav">
            <ul className="pagination-list">
                {pages.map((number) => {
                    return (<li key={number} className="pagination-list-item">
                        <button 
                            onClick={()=> paginate(number)} 
                            className="pagination-list-item-btn">
                            {number}
                        </button>

                    </li>)
                })}
            </ul>
        </nav>
        </>
     );
}
 
export default Pagination;