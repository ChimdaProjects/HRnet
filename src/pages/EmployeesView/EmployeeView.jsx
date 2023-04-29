import Datatable from "../../components/Datatable/Datatable";
import Navbar from "../../components/Navbar/Navbar";
import React, {useContext} from "react";
// context

import employeesList from "../../datas/employees"
import { FormContext } from "../../utils/context/formContext";

/**
 * This function displays the page of current view employee
 * @returns {JSX} page of current employees
 */
const EmployeeView = () => {
    
    
    const titleTable = ["first name", "last name", "start date", "department", "date of birth", "street", "city", "state", "zip code"]
    return (
        <>
        <header>
            <Navbar />
        </header>
        <main>
            <Datatable 
                columnTitle={titleTable} 
                
            />
        </main>
        </>

    )
}

export default EmployeeView;