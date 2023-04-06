import Datatable from "../../components/Datatable/Datatable";
import Navbar from "../../components/Navbar/Navbar";
import React, {useContext} from "react";
// context
import {StateContext} from "../../utils/context/index"

/**
 * This function displays the page of current view employee
 * @returns {JSX} page of current employees
 */
const EmployeeView = () => {
    const { datas, datasEmployee } = useContext(StateContext);
    const titleTable = ["first name", "last name", "start date", "department", "date of birth", "street", "city", "state", "zip code"]
    return (
        <>
        <header>
            <Navbar />
        </header>
        <main>
            <Datatable 
                columnTitle={titleTable} 
                data={datasEmployee}
            />
        </main>
        </>

    )
}

export default EmployeeView;