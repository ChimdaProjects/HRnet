import React, { useContext } from "react";
// context
import { FormContext } from "../../utils/context/formContext";
// components
import Datatable from "../../components/Datatable/Datatable";
import Navbar from "../../components/Navbar/Navbar";

/**
 * This function displays the page of current view employee
 * @returns {JSX} page of current employees
 */
function EmployeeView() {
  const { datasEmployee } = useContext(FormContext);
  const titleTable = [
    "first name",
    "last name",
    "start date",
    "department",
    "date of birth",
    "street",
    "city",
    "state",
    "zip code",
  ];

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Datatable columnTitle={titleTable} datas={datasEmployee} />
      </main>
    </>
  );
}

export default EmployeeView;
