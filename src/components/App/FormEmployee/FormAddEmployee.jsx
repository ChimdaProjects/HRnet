import React, {useState, useRef} from "react";

const FormAddEmployee = () => {
    // state 
    const [datasEmployee, setDatasEmployee] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
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

    const formEmployee = useRef();

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
         
            setDatas((prevState) => ({
            ...prevState,
            [name]: value,
            
    }));
    }
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
    const handleChangeDepartment = (e) => {
        const selectedDepartment = e.target.value;
        setDatas(prevState => ({
            ...prevState,
            department: selectedDepartment
        }));
    }
    
    console.log("datas",datas.firstname);

    const saveEmployee = (e) => {
        if (datas) {
            e.preventDefault();
            setDatasEmployee(datas);
            setIsSubmitted(true);
            formEmployee.current.value.clear();
        }
        else {
            alert("form not completed !")
        }
       
    }
    return (
        <div>
            <h2>Create employee</h2>

            <form action="#" id="create-employee" onSubmit={saveEmployee} ref={formEmployee}>
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
                    value={datas.dateOfBirth}
                    onChange={handleChangeInput}
                    required
                />

                <label htmlFor="start-date">Start Date</label>
                <input 
                    id="start-date" 
                    type="text"
                    name="startDate" 
                    value={datas.startDate}
                    onChange={handleChangeInput}
                    required
                    />

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
                <button>
                    Save
                </button>
        </form>
      
        {isSubmitted && (
            <p>Employee created !</p>
        )}
       {/**
        * add modal when the form is submitted (create component modal and add it here)
        * isSubmitted && 
        <div id="confirmation" className="modal">Employee Created!</div>
        */} 
 
    </div>
    )
};
export default FormAddEmployee;