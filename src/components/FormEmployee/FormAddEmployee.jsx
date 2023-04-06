import React, {useState, useRef, useContext} from "react";
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

    // handle change input (firstname, lastname)
    const handleChangeInput = (e) => {
       const { name, value } = e.target;
       setDatas((prevState) => ({
        ...prevState,
        [name] : value
       }))
         
    };
    console.log("firstname", datas.firstname);
    console.log("lastname", datas.lastname);

    // handle change for input's date
    const handleChangeInputDate = (e) => {

    }

    // handle change adress and store value in state
    const handleChangeAdress = (e) => {
        const { name, value } = e.target;
        setDatas((prevState) => ({
          ...prevState,
          adress: {
            ...prevState.adress,
            [name]: value
          }
        }));
    };

    // handle change department and store value in state
    const handleChangeDepartment = (e) => {
        const selectedDepartment = e.target.value;
        setDatas(prevState => ({
            ...prevState,
            department: selectedDepartment
        }));
    }
    console.log("datas",datas);

    const handleDateClick = (day) => {
    console.log("day", day)
    const selectedDate = `${day.getDate()} / ${day.getMonth() + 1} / ${day.getFullYear()}`;
    setDatas({ ...datas, dateOfBirth: selectedDate });
    setShowDatePicker(false);
    };
      
    // submit the form with datas
    const saveEmployee = (e) => {
        e.preventDefault();
        if (datas) {
          setDatasEmployee(datas);
          setIsSubmitted(!isSubmitted);
          setDatas({
            firstname: "",
            lastname: "",
            dateOfBirth: "",
            startDate: "",
            adress: {
              street: "",
              city: "",
              state: "",
              code: ""
            },
            department: ""
          });
        } else {
          alert("form not completed !");
        }
      };
    
    console.log("selected date", selectedDate)
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
                            name="dateOfbirth"
                            value={selectedDate?selectedDate.toLocaleDateString("fr-FR"):""}
                            onChange={handleChangeInputDate}
                          
                        />

                        {showDatePicker || document.activeElement === document.getElementById('date-of-birth') ? (
                        <Datepicker 
                            onSelect = {selectedDate}
                        />
                        ) : null}

                        <label htmlFor="start-date">Start Date</label>
                        <input 
                            id="start-date" 
                            type="text"
                            name="startDate" 
                            value={datas.startDate}
                            onChange={handleChangeInputDate}
                            
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
                            onChange={handleChangeInput}
                            
                            />
                    </fieldset>
                    <div className="form-department">
                    <label htmlFor="department">Department</label>
                    <select 
                        name="department" 
                        id="department"
                        value={datas.department}
                        onChange={handleChangeDepartment}
                        
                    >
                        <option>Sales</option>
                        <option>Marketing</option>
                        <option>Engineering</option>
                        <option>Human Resources</option>
                        <option>Legal</option>
                    </select>
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