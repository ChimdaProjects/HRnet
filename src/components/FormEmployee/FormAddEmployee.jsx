import React, {useState, useRef} from "react";
import Modal from "../Modal/Modal";
import "./formemployee.scss"
import Datepicker from "../Datepicker/Datepicker";
const FormAddEmployee = () => {
    // state 
    const [datasEmployee, setDatasEmployee] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [currentMonth,setCurrentMonth] = useState("");
  

    // data retrieved from the form
    const [datas, setDatas] = useState({
        firstname: "",
        lastname: "",
        dateOfBirth:"",
        startDate:"",
        adress: {
            street:"",
            city:"",
            state:"",
            code:""
        },
        department:""
    });
    console.log("showDatePicker", showDatePicker)

    // handle change input
    const handleChangeInput = (e) => {
        // Vérifie si l'utilisateur a entré une date manuellement
        const enteredDate = new Date(e.target.value);
        if (!isNaN(enteredDate.getTime())) {
            setSelectedDate(enteredDate);
            setCurrentMonth(enteredDate);
        }
        setShowDatePicker(!showDatePicker);
        
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
        setShowDatePicker(!showDatePicker);
      };
      
    // submit the form with datas
    const saveEmployee = (e) => {
        if (datas) {
            e.preventDefault();
            setDatasEmployee(datas);
            setIsSubmitted(true);
            
        }
        else {
            alert("form not completed !")
        }
       
    }
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
                            required
                            />
                        
                        
                        <label htmlFor="date-of-birth">Date of Birth</label>
                        <input 
                            id="date-of-birth" 
                            type="text" 
                            name="dateOfbirth"
                            value={selectedDate?selectedDate.toLocaleDateString("fr-FR"):""}
                            onChange={handleChangeInput}
                            required
                        />
                        {/*showDatePicker && (
                            <Datepicker 
                                handleDateClick={handleDateClick} 
                                selectedDate = {selectedDate} 
                                setSelectedDate={setSelectedDate}
                                showDatePicker = {showDatePicker} 
                                setShowDatePicker={setShowDatePicker}/>
                        )*/}
                        {showDatePicker || document.activeElement === document.getElementById('date-of-birth') ? (
                        <Datepicker 
                            handleDateClick={handleDateClick} 
                            selectedDate={selectedDate} 
                            setSelectedDate={setSelectedDate}
                            showDatePicker={showDatePicker} 
                            setShowDatePicker={setShowDatePicker}
                            displayedMonth={currentMonth} 
                            setDisplayedMonth={setCurrentMonth}
                        />
                        ) : null}

                        <label htmlFor="start-date">Start Date</label>
                        <input 
                            id="start-date" 
                            type="text"
                            name="startDate" 
                            value={datas.startDate}
                            onChange={handleChangeInput}
                            required
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
                            required
                            />

                        <label htmlFor="city">City</label>
                        <input 
                            id="city" 
                            type="text"
                            name="city" 
                            value={datas.adress.city}
                            onChange={handleChangeAdress}
                            required
                            />

                        <label htmlFor="state">State</label>
                        <select 
                            name="state" 
                            id="state"
                            value={datas.adress.state}
                            onChange={handleChangeAdress}
                            required
                            >
                        </select>

                        <label htmlFor="zip-code">Zip Code</label>
                        <input 
                            id="zip-code" 
                            type="number" 
                            name="code"
                            value={datas.adress.code}
                            onChange={handleChangeInput}
                            required
                            />
                    </fieldset>
                    <div className="form-department">
                    <label htmlFor="department">Department</label>
                    <select 
                        name="department" 
                        id="department"
                        value={datas.department}
                        onChange={handleChangeDepartment}
                        required
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