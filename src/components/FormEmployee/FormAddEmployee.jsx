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
        setDatasEmployee, 
        isSubmitted, 
        setIsSubmitted,  
        showDatePickerBirth, 
        setShowDatePickerBirth, 
        showDatePickerStart,
        setShowDatePickerStart,
        datas,
        setDatas, 
        setFirstnameError,
        setLastnameError,
        setdateError,
        setStartDateError,
        setStreetError,
        setCityError,
        setStateError,
        setCodeError,
        setDepartmentError,
        firstnameError,
        lastnameError,
        dateError,
        startDateError,
        streetError,
        stateError,
        cityError,
        codeError,
        departmentError
       
       
    } = useContext(StateContext);

    // get value of firstname, lastname 
    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        errorMsg(name, value);
        setDatas({ ...datas, [name]: value }); 
            
    };
    // control validation format input  and select form 
    const errorMsg = (name, value) => {
        switch(name) {
            case "firstname" :
                if (value === "" || value.length < 2) {
                    setFirstnameError(`Le champ ${name} ne peut être vide et doit contenir au min 2 caractères.`)
                } else {
                    const regex = /^[a-zA-ZÀ-ÿ\s'’.\-]*$/;
                    if (!regex.test(value)) {
                      
                        setFirstnameError(`Le champ ${name} doit contenir uniquement des lettres`);
                    }    
                    else {
                        setFirstnameError("")
                    }
                }
                break;

            case "lastname" :
                if (value === "" || value.length < 2) {
                    setLastnameError(`Le champ ${name} ne peut être vide et doit contenir au min 2 caractères.`)
                } else {
                    const regex = /^[a-zA-ZÀ-ÿ\s'’.\-]*$/;
                    if (!regex.test(value)) {
                      
                        setLastnameError(`Le champ ${name} doit contenir uniquement des lettres`);
                    }
                    else {
                        setLastnameError("")
                    }
                }
            
            case "dateOfBirth" :
                if (value === "" || value.length<1) {
                
                    setdateError(`Le champ ${name} est requis.`)
                } else {
                   setdateError("");
                  
                }
                break; 
            
            case "startDate" :
                if (value === "" || value.length<1) {
                    setStartDateError(`Le champ ${name} est requis.`)
                } else {
                    setStartDateError("");
                  
                }
                break; 
            case "street" :
                if (value === "" || value.length < 2) {
                    setStreetError(`Le champ ${name} ne peut être vide.`)
                } else {
                    setStreetError("")
                }
            case "city":
                if (value === "" || value.length < 2) {
                    setCityError(`Le champ ${name} ne peut être vide.`)
                } else {
                    setCityError("")
                 
                }
                break;
            case "state":
                if (value === "") {
                    setStateError("Vous devez choisir un état.")
                } else {
                    setStateError("")
                }
                break;
            case "code":
                if (value === "" ) {
                    setCodeError(`Le champ ${name} ne peut être vide et doit contenir que des chiffres.`)
                } else {
                    const regex = /^[0-9]{1,5}$/;
                    ;
                    if (!regex.test(value)) {
                      
                        setCodeError(`Le champ ${name} doit contenir uniquement des chiffres et 5 caractères au max.`);
                    }
                    else {
                        setCodeError("")
                    }
                }
                break;
            case "department":
                if (value === "") {
                    setDepartmentError("Vous devez sélectionner un department.")
                } else {
                    setDepartmentError("")
                }
                break;
            
            default:
                console.log(`Sorry, we are out of ${name}.`) 
        }
    }
    // get value of date's input
    const handleChangeDate = (event) => {
    const { name, value } = event.target;
    errorMsg(name, value);
    setDatas({ ...datas, [name]: value });
    };
    // format the date of birth entered when there is no more focus in the input field 
    const handleBlur = (event) => {
        const value = event.target.value;
        const formattedDate = moment(value, "MM/DD/YYYY").format("MM/DD/YYYY");
    
        setDatas({...datas, dateOfBirth: formattedDate});
    };
    // format the date of start entered when there is no more focus in the input field 
    const handleBlurStartDate = (event) => {
        const value = event.target.value;
        const formattedDate = moment(value, "MM/DD/YYYY").format("MM/DD/YYYY");
        setDatas({...datas, startDate: formattedDate?formattedDate:value});
    };
    // function to format the date
    const formattedDateNow = () => {
        const now = new Date();
        const day = now.getDate().toString().padStart(2, "0");
        const month = (now.getMonth() + 1).toString().padStart(2, "0");
        const year = now.getFullYear().toString();
        const formattedDateNow = `${month}/${day}/${year}`;
        return formattedDateNow;
    }

    // get value of adress fieldset
    const handleChangeAdress = (event) => {
        const { name, value } = event.target;
        errorMsg(name, value);
        setDatas({
          ...datas,
          adress: { ...datas.adress, [name]: value }
        });
    };
    // get value of department
    const handleChangeDepartment = (event) => {
        const { name, value } = event.target;
        errorMsg(name, value);
        setDatas({ ...datas, department: value });
    };
    // get selected date by date picker
    const handleDateSelect = (date) => {
        const formattedDate = moment(date, "MM/DD/YYYY").format("MM/DD/YYYY");
        setDatas({
            ...datas,
            dateOfBirth : formattedDate
        })
   
        setdateError("");
        setStartDateError("");
        setShowDatePickerBirth(false);
    };

    // get selected date by date picker
    const handleDateSelectStart = (date) => {
        const formattedDate = moment(date, "MM/DD/YYYY").format("MM/DD/YYYY");
        setDatas({
            ...datas,
            startDate: formattedDate
        })
        setShowDatePickerBirth(false);
    }
    // submit the form with datas
    const saveEmployee = (e) => {
        e.preventDefault();
        if (lastnameError || firstnameError || dateError || startDateError || cityError || streetError || codeError || stateError || departmentError  ) {
            alert("Form not completed !");
            setIsSubmitted(false);
        } else if (!datas.firstname || !datas.lastname || !datas.dateOfBirth || !datas.startDate || !datas.adress.street || !datas.adress.city || !datas.adress.state || !datas.adress.code || !datas.department) {
            alert("Form not completed !");
            setIsSubmitted(false);
        if (!datas.firstname) {
            setFirstnameError("Please enter your first name");
        }
        if (!datas.lastname) {
            setLastnameError("Please enter your last name");
        }
        if (!datas.dateOfBirth) {
            setdateError("Please enter your date of birth");
        }
        if (!datas.startDate) {
            setStartDateError("Please enter your start date");
        }
        if (!datas.adress.street) {
            setStreetError("Please enter your street");
        }
        if (!datas.adress.city) {
            setCityError("Please enter your city");
        }
        if (!datas.adress.state) {
            setStateError("Please enter your state");
        }
        if (!datas.adress.code) {
            setCodeError("Please enter your code");
        }
        if (!datas.department) {
            setDepartmentError("Please enter your department");
        }
        } else { setDatasEmployee(prevEmployeeData => ({
                ...prevEmployeeData ? prevEmployeeData : {},
                datas: [...(prevEmployeeData?.datas || []), datas],
            }));
            
            setIsSubmitted(!isSubmitted);
            // clear values from form
            resetForm();
            
        }
    };

    // reset values from form
    const resetForm = () => {
        setDatas({
          lastname: "",
          firstname: "",
          dateOfBirth: "",
          startDate:"",
          adress: { street: "", city: "", code: "" },
          department: "",
        });
        setIsSubmitted(false);
        // reset error message
        setFirstnameError("");
        setLastnameError("");
        setdateError("");
        setStartDateError("");
        setStreetError("");
        setCityError("");
        setStateError("");
        setCodeError("");
        setDepartmentError("");
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
                            onChange={handleChangeInput}
                            required
                            className={firstnameError? "error" : ""}
                        />
                        {firstnameError  && (
                            <p className="form-error">{firstnameError}</p>
                        )}

                        <label htmlFor="last-name">Last Name</label>
                        <input 
                            type="text" 
                            id="last-name"
                            name="lastname" 
                            value={datas.lastname}
                            onChange={handleChangeInput}
                            className={lastnameError? "error" : ""}
                        />
                        {lastnameError && (
                            <p className="form-error">{lastnameError}</p>
                        )}
                        
                        <label htmlFor="date-of-birth">Date of Birth</label>
                        <input 
                            id="date-of-birth" 
                            type="text" 
                            name="dateOfBirth"
                            placeholder="MM/JJ/AAAA"
                            value={datas.dateOfBirth}
                            onBlur={handleBlur}
                            onChange={handleChangeDate}
                            className={dateError? "error" : ""}
                        />
                        {dateError && (
                            <p className="form-error">{dateError}</p>
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
                            onChange={handleChangeDate}
                            value={datas.startDate? datas.startDate : formattedDateNow()}
                            className={startDateError? "error" : ""}
                        />
                        {startDateError && (
                            <p className="form-error">{startDateError}</p>
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
                            value={datas.adress.street}
                            onChange={handleChangeAdress}
                            className={streetError? "error" : ""} 
                        />
                        {streetError && (
                            <p className="form-error">{streetError}</p>
                        )}

                        <label htmlFor="city">City</label>
                        <input 
                            id="city" 
                            type="text"
                            name="city" 
                            value={datas.adress.city}
                            onChange={handleChangeAdress}
                            className={cityError? "error" : ""} 
                        />
                        {cityError && (
                            <p className="form-error">{cityError}</p>
                        )}

                        <label htmlFor="state">State</label>
                        <Select 
                            name="state" 
                            id="state"
                            value={datas.adress.state}
                            onChange={handleChangeAdress}
                            data={states}
                            className={stateError? "error":""}
                        />
                         {stateError && (
                            <p className="form-error">{stateError}</p>
                        )}

                        <label htmlFor="zip-code">Zip Code</label>
                        <input 
                            id="zip-code" 
                            type="number" 
                            name="code"
                            value={datas.adress.code}
                            onChange={handleChangeAdress}
                            className={codeError? "error":""}
                        />
                        {codeError && (
                            <p className="form-error">{codeError}</p>
                        )}

                    </fieldset>

                    <div className="form-department">
                        <label htmlFor="department">Department</label>
                        <Select 
                                name="department" 
                                id="department"
                                value={datas.department}
                                onChange={handleChangeDepartment}
                                data={departments}
                                className={departmentError? "error":""}
                        />
                        {departmentError && (
                            <p className="form-error">{departmentError}</p>
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