import React, {useContext, useEffect} from "react";

// style
import "./formemployee.scss"
// components
import Datepicker from "../Datepicker/Datepicker";
import Modal from "../Modal/Modal";
import Select from "../Select/Select";
// context
import { ErrorContext } from "../../utils/context/errorContext";
import { DateContext } from "../../utils/context/dateContext";
import { FormContext } from "../../utils/context/formContext";
// datas
import states from "../../datas/states"
import departments from "../../datas/departments"

//custom hooks
import useFormData from "../../hooks/useFormData";

// utils
import { formattedDateNow } from "../../utils/services/date";

/**
 * This function displays the form to add an employee
 * @returns {JSX} component react
 */
const FormAddEmployee = () => {
    // import state from Context
    const { datas, setDatasEmployee, isSubmitted, setIsSubmitted, setDatas} = useContext(FormContext);
    const { showDatePickerBirth, setShowDatePickerBirth, showDatePickerStart, setShowDatePickerStart } = useContext(DateContext);
    const { errorsMsg, setErrorsMsg } = useContext(ErrorContext);
    // custom hook 
    const { handleChange, resetForm, handleBlur, handleBlurStartDate, handleDateSelect, handleDateSelectStart } = useFormData();
    
   
    // submit the form with datas
    const saveEmployee = (e) => {
        e.preventDefault();
        if (errorsMsg) {
            alert("Form not completed !");
            setIsSubmitted(false);
        } else if (!datas.firstname || !datas.lastname || !datas.dateOfBirth || !datas.startDate || !datas.adress.street || !datas.adress.city || !datas.adress.state || !datas.adress.code || !datas.department) {
            alert("Form not completed !");
            setIsSubmitted(false);
        if (!datas.firstname) {
            setErrorsMsg.firstname("Please enter your first name");
        }
        if (!datas.lastname) {
            setErrorsMsg.lastname("Please enter your last name");
        }
        if (!datas.dateOfBirth) {
            setErrorsMsg.dateOfBirth("Please enter your date of birth");
        }
        if (!datas.startDate) {
            setErrorsMsg.startDate("Please enter your start date");
        }
        if (!datas.adress.street) {
            setErrorsMsg.street("Please enter your street");
        }
        if (!datas.adress.city) {
            setErrorsMsg.city("Please enter your city");
        }
        if (!datas.adress.state) {
            setErrorsMsg.state("Please enter your state");
        }
        if (!datas.adress.code) {
            setErrorsMsg.code("Please enter your code");
        }
        if (!datas.department) {
            setErrorsMsg.department("Please enter your department");
        }
        } else { setDatasEmployee(prevEmployeeData => ({
                ...prevEmployeeData ? prevEmployeeData : {},
                datas: [...(prevEmployeeData?.datas || []), datas],
            }));
            
            setIsSubmitted(!isSubmitted);
            // clear values from form
            resetForm();
            
        }
    
        setIsSubmitted(false);
        // reset error message
        setErrorsMsg.firstname("")
        setErrorsMsg.lastname("");
        setErrorsMsg.dateOfBirth("");
        setErrorsMsg.startDate("");
        setErrorsMsg.street("");
        setErrorsMsg.city("");
        setErrorsMsg.state("");
        setErrorsMsg.code("");
        setErrorsMsg.department("");
                       
    };

    useEffect(() => {
        resetForm();
      }, []);
      

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
                            onChange={handleChange}
                            required
                            className={errorsMsg.firstname? "error" : ""}
                        />
                        {errorsMsg.firstname  && (
                            <p className="form-error">{errorsMsg.firstname}</p>
                        )}

                        <label htmlFor="last-name">Last Name</label>
                        <input 
                            type="text" 
                            id="last-name"
                            name="lastname" 
                            value={datas.lastname}
                            onChange={handleChange}
                            className={errorsMsg.lastname? "error" : ""}
                        />
                        {errorsMsg.lastname && (
                            <p className="form-error">{errorsMsg.lastname}</p>
                        )}
                        
                        <label htmlFor="date-of-birth">Date of Birth</label>
                        <input 
                            id="date-of-birth" 
                            type="text" 
                            name="dateOfBirth"
                            placeholder="MM/JJ/AAAA"
                            value={datas.dateOfBirth}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            className={errorsMsg.dateOfBirth? "error" : ""}
                        />
                        {errorsMsg.dateOfBirth && (
                            <p className="form-error">{errorsMsg.dateOfBirth}</p>
                        )}
                       
                            <span onClick={()=> {setShowDatePickerBirth(!showDatePickerBirth)}}>
                            <i className="fa-regular fa-calendar" ></i>
                            </span>
                          
                            { showDatePickerBirth &&
                                <Datepicker 
                                    onSelect = {handleDateSelect}
                                 />
                            }

                        <label htmlFor="start-date">Start Date</label>
                        <input 
                            id="start-date" 
                            type="text"
                            name="startDate" 
                            placeholder="MM/JJ/AAAA"
                            onBlur={handleBlurStartDate}
                            onChange={handleChange}
                            value={datas.startDate? datas.startDate : formattedDateNow()}
                            className={errorsMsg.startDate? "error" : ""}
                        />
                        {errorsMsg.startDate && (
                            <p className="form-error">{errorsMsg.startDate}</p>
                        )}
                        <span onClick={()=> {setShowDatePickerStart(!showDatePickerStart)}}>
                            <i className="fa-regular fa-calendar" ></i>
                            </span>
                          
                        { showDatePickerStart &&
                            <Datepicker 
                                onSelect = {handleDateSelectStart}
                            />
                        }
                        
                         
                    </div>
                    <fieldset className="address">
                        <legend>Address</legend>

                        <label htmlFor="street">Street</label>
                        <input 
                            id="street" 
                            type="text" 
                            name="street"
                            value={datas.street}
                            onChange={handleChange}
                            className={errorsMsg.street? "error" : ""} 
                        />
                        {errorsMsg.street && (
                            <p className="form-error">{errorsMsg.street}</p>
                        )}

                        <label htmlFor="city">City</label>
                        <input 
                            id="city" 
                            type="text"
                            name="city" 
                            value={datas.city}
                            onChange={handleChange}
                            className={errorsMsg.city? "error" : ""} 
                        />
                        {errorsMsg.city && (
                            <p className="form-error">{errorsMsg.city}</p>
                        )}

                        <label htmlFor="state">State</label>
                        <Select 
                            name="state" 
                            id="state"
                            value={datas.state}
                            onChange={handleChange}
                            data={states}
                            className={errorsMsg.state? "error":""}
                        />
                         {errorsMsg.state && (
                            <p className="form-error">{errorsMsg.state}</p>
                        )}

                        <label htmlFor="zip-code">Zip Code</label>
                        <input 
                            id="zip-code" 
                            type="number" 
                            name="code"
                            value={datas.code}
                            onChange={handleChange}
                            className={errorsMsg.code? "error":""}
                        />
                        {errorsMsg.code && (
                            <p className="form-error">{errorsMsg.code}</p>
                        )}

                    </fieldset>

                    <div className="form-department">
                        <label htmlFor="department">Department</label>
                        <Select 
                                name="department" 
                                id="department"
                                value={datas.department}
                                onChange={handleChange}
                                data={departments}
                                className={errorsMsg.department? "error":""}
                        />
                        {errorsMsg.department && (
                            <p className="form-error">{errorsMsg.department}</p>
                        )}
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

