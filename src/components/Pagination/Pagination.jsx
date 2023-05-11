import React, { useEffect, useState } from 'react';
import "./pagination.scss"

const Pagination = (props) => {
    const { entriesPerPage, totalEntries, paginate, start, end, currentPage, handlePreviousPage, handleNextPage, setCurrentPage  } = props;
    
    // const [ firstPage, setFirstPage ] = useState(1);
    // const [ lastPage, setLastPage ] = useState(5);
    
    // useEffect(() => {
    //     const first = currentPage <= 3 ? 0 : currentPage - 3;
    //     const last =  firstPage + 3 > pages.length ? pages.length : firstPage + 3;

    //     setLastPage(last);
    //     setFirstPage(first);
    // }, [currentPage]);

    const numberPages = Math.ceil(totalEntries / entriesPerPage);
    const distanceFromStart = currentPage - 1;
    const distanceFromEnd = numberPages - currentPage;

    console.log("distanceFromStart", distanceFromStart)
    console.log("distanceFromEnd", distanceFromEnd)

    // page numbers list
    const pages = [];
    /**
     * si la distance > 4 soit la page 5, i = 4 dc on affiche 4 et 6 
     */
    let i = distanceFromStart >= 4 ? currentPage - 1 : 2; 
    let max = distanceFromEnd >= 4 ? currentPage + 1 : numberPages - 1;
    
    while (i <  numberPages ) {
       pages.push(i);
       i++;
    }
    const entryEnd = pages.length === currentPage ? totalEntries : end ;
    console.log("current page", currentPage);
 
    return ( 
        <div className="pagination">
            <div className="pagination-details">
                <p className="pagination-details-content">Showing { start + 1 } to { entryEnd } of { totalEntries } entries </p>
            </div>
            <nav className="pagination-nav">
                <ul className="pagination-list">
                    <li className="pagination-list-item">
                        <button className= "pagination-list-item-btn prev" disabled={currentPage === 1 ? true : false } onClick={ () => currentPage > 1 ? setCurrentPage(currentPage - 1) : "" }>Previous</button>
                    </li>
                    
                     <li className="pagination-list-item">
                            <button 
                                onClick={ ()=> paginate(1) } 
                                className={ currentPage === 1 ? "pagination-list-item-btn pagination-active" : "pagination-list-item-btn" }>
                                1
                            </button>
                        </li>
                        { currentPage >= 5 &&
                        <li className="pagination-list-item">
                            <p className="">...</p>
                        </li>
                        }
                    { 
                        currentPage < 5 ? pages.slice(0,4).map((number) => {
                            return (
                            <li key={number} className="pagination-list-item">
                                <button 
                                    onClick={ ()=> paginate(number) } 
                                    className={ currentPage === number ? "pagination-list-item-btn pagination-active" : "pagination-list-item-btn" }>
                                    { number }
                                </button>
    
                            </li>)
                        }) :
                        pages.slice(0,3).map((number) => {
                            return (
                            <li key={number} className="pagination-list-item">
                                <button 
                                    onClick={ ()=> paginate(number) } 
                                    className={ currentPage === number ? "pagination-list-item-btn pagination-active" : "pagination-list-item-btn" }>
                                    { number }
                                </button>
    
                            </li>)
                        }) 


                  
                }
                     { currentPage >= 5 && currentPage < (numberPages - 5) &&
                        <li className="pagination-list-item">
                            <p>...</p>
                        </li>
                        }

                    <li className="pagination-list-item">
                            <button 
                                onClick={ ()=> paginate(numberPages) } 
                                className={ currentPage === numberPages ? "pagination-list-item-btn pagination-active" : "pagination-list-item-btn" }>
                                {numberPages}
                            </button>
                        </li>
                    <li className="pagination-list-item">
                        <button className= "pagination-list-item-btn next " disabled={ currentPage === numberPages ? true : false } onClick={ () => currentPage === pages.length ? "" : setCurrentPage(currentPage + 1) }>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
 
export default Pagination;

