import { createContext, useState } from "react";

export const PaginationContext = createContext();

export const PaginationProvider = ({ children }) => {
    
   const [ currentPage, setCurrentPage ] = useState(1);
   const [ entriesPerPage, setEntriesPerPage ] = useState(10);
   
    const state = {
        currentPage,
        setCurrentPage,
        entriesPerPage,
        setEntriesPerPage
    };
        
  return (
    <PaginationContext.Provider value={state}>
        {children}
    </PaginationContext.Provider>
  );
};