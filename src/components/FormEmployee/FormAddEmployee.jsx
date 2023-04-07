import React, {useContext, useEffect} from "react";
// style
import "./formemployee.scss"
// components
import Datepicker from "../Datepicker/Datepicker";
import Modal from "../Modal/Modal";
import Select from "../Select/Select";
// context
import {StateContext} from "../../utils/context/index"
// datas
import states from "../../datas/states"
import departments from "../../datas/departments"

import moment from "moment";
/**
 * This function displays the form to add an employee
 * @returns {JSX} component react
 */
const FormAddEmployee = () => {
    // import state from Context
    const { 
        datasEmployee, 
        setDatasEmployee, 
        isSubmitted, 
        setIsSubmitted, 
        selectedDate, 
        setSelectedDate, 
        showDatePicker, 
        setShowDatePicker, 
        currentMonth, 
        setCurrentMonth,
        datas,
        setDatas 
    } = useContext(StateContext);

    // get value of firstname, lastname 
    const handleChangeInput = (event) => {
    const { name, value } = event.target;
        setDatas({ ...datas, [name]: value });
    };
    // get value of date's input
    const handleChangeDate = (event) => {
    const { name, value } = event.target;
    setDatas({ ...datas, [name]: value });
    };
    // formatting the date entry
    const handleBlur = (event) => {
        const value = event.target.value;
        const formattedDate = moment(value, "MM/DD/YYYY").format("MM/DD/YYYY");
        console.log("date formatée", formattedDate)
        setDatas({...datas, dateOfBirth: formattedDate});
    };
    const handleBlurStartDate = (event) => {
        const value = event.target.value;
        const formattedDate = moment(value, "MM/DD/YYYY").format("MM/DD/YYYY");
        console.log("date formatée", formattedDate)
        setDatas({...datas, startDate: formattedDate});
    };

    const now = new Date();
    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear().toString();
    const formattedDateNow = `${month}/${day}/${year}`;

console.log(formattedDateNow); // Affiche la date du jour au format "MM/JJ/AAAA"

    // get value of adress 
    const handleChangeAdress = (event) => {
        const { name, value } = event.target;
        setDatas({
          ...datas,
          adress: { ...datas.adress, [name]: value }
        });
    };
    // get value of department
    const handleChangeDepartment = (event) => {
        const { value } = event.target;
        setDatas({ ...datas, department: value });
    };
    const handleDateClick = (day) => {
        console.log("day", day)
        const date = day?day.toLocaleDateString("en-US"):"";
        setDatas({ ...datas, dateOfBirth: date });
        setShowDatePicker(false);
    };

    // submit the form with datas
    const saveEmployee = (e) => {
        e.preventDefault();
        if (datas) {
            setDatasEmployee(prevEmployeeData => ({
                ...prevEmployeeData ? prevEmployeeData : {},
                datas: [...(prevEmployeeData?.datas || []), datas],
            }));
            setIsSubmitted(!isSubmitted);
        } else {
            alert("Form not completed !");
        }
    };

    function resetForm() {
        setDatas({
          lastname: "",
          firstname: "",
          dateOfBirth: "",
          adress: { street: "", city: "", code: "" },
          department: "",
        });
        setIsSubmitted(false);
    };

    useEffect(() => {
        resetForm();
      }, []);
      
      
    //console.log("selected date", selectedDate);
    //console.log("employee datas",datasEmployee);

    return (
        <div className="formaddemployee">
            <h2 className="form-title">
                HR NET - Create employee
            </h2>
            <form action="#" id="create-employee" onSubmit={saveEmployee} >
                <div className="form-content">
                    <div className="form-left">
        
                        <label htmlFor="first-name">First Name</label>
                        <input 
                            type="text" 
                            id="first-name" 
                            name="firstname"
                            value={datas.firstname}
                            onChange={handleChangeInput}
                            required
                        />

                        <label htmlFor="last-name">Last Name</label>
                        <input 
                            type="text" 
                            id="last-name"
                            name="lastname" 
                            value={datas.lastname}
                            onChange={handleChangeInput}
                        />
                        
                        
                        <label htmlFor="date-of-birth">Date of Birth</label>
                        <input 
                            id="date-of-birth" 
                            type="text" 
                            name="dateOfBirth"
                            placeholder="MM/JJ/AAAA"
                            value={datas.dateOfBirth}
                            onBlur={handleBlur}
                            /*onFocus={() => setShowDatePicker(true)}*/ 
                            onChange={handleChangeDate}
                           
                          
                        />

                        {/*showDatePicker || document.activeElement === document.getElementById('date-of-birth') ? (
                        <Datepicker 
                            onSelect = {handleChangeInputDate}
                        />
                        ) : null*/}

                        <label htmlFor="start-date">Start Date</label>
                        <input 
                            id="start-date" 
                            type="text"
                            name="startDate" 
                            value={datas.startDate? datas.startDate : formattedDateNow}
                            onBlur={handleBlurStartDate}
                            onChange={handleChangeDate}
                            
                        />
                    </div>
                    <fieldset className="address">
                        <legend>Address</legend>

                        <label htmlFor="street">Street</label>
                        <input 
                            id="street" 
                            type="text" 
                            name="street"
                            value={datas.adress.street}
                            onChange={handleChangeAdress}
                           
                        />

                        <label htmlFor="city">City</label>
                        <input 
                            id="city" 
                            type="text"
                            name="city" 
                            value={datas.adress.city}
                            onChange={handleChangeAdress}
                            
                        />

                        <label htmlFor="state">State</label>
                        <Select 
                            name="state" 
                            id="state"
                            value={datas.adress.state}
                            onChange={handleChangeAdress}
                            data={states}
                        />

                        <label htmlFor="zip-code">Zip Code</label>
                        <input 
                            id="zip-code" 
                            type="number" 
                            name="code"
                            value={datas.adress.code}
                            onChange={handleChangeAdress}
                            
                        />
                    </fieldset>

                    <div className="form-department">
                        <label htmlFor="department">Department</label>
                        <Select 
                                name="department" 
                                id="department"
                                value={datas.department}
                                onChange={handleChangeDepartment}
                                data={departments}
                        />

                    </div>
                    
                </div>
                    <button type="submit" className="form-button">
                        Save
                    </button>
            </form>
        { 
            isSubmitted && <Modal />
        }
    </div>
    )
};
export default FormAddEmployee;