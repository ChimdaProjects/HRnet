import { createContext, useState } from "react";

export const StateContext = createContext();
 // function to format the date
export const formattedDateNow = () => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear().toString();
    const formattedDateNow = `${month}/${day}/${year}`;
    return formattedDateNow;
}
export const StateProvider = ({ children }) => {
    const [firstnameError, setFirstnameError] = useState("");
    const [lastnameError, setLastnameError] = useState("");
    const [dateError, setdateError] = useState("");
    const [startDateError, setStartDateError] = useState("");
    const [streetError, setStreetError] = useState("");
    const [cityError, setCityError] = useState("");
    const [stateError, setStateError] = useState("");
    const [codeError, setCodeError] = useState("");
    const [departmentError, setDepartmentError] = useState("");
    const [datasEmployee, setDatasEmployee] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showDatePickerBirth, setShowDatePickerBirth] = useState(false);
    const [showDatePickerStart, setShowDatePickerStart] = useState(false);
    const [currentMonth, setCurrentMonth] = useState("");
    const [datas, setDatas] = useState(
        {
        firstname: "",
        lastname: "",
        dateOfBirth:"",
        startDate: "",
        adress: {
            street:"",
            city:"",
            state:"",
            code:""
        },
        department:""
        }
    );
    
    const state = {
        datasEmployee,
        setDatasEmployee,
        isSubmitted,
        setIsSubmitted,
        selectedDate,
        setSelectedDate,
        showDatePickerBirth,
        setShowDatePickerBirth,
        showDatePickerStart,
        setShowDatePickerStart,
        currentMonth,
        setCurrentMonth,
        datas,
        setDatas,
        firstnameError,
        lastnameError,
        dateError,
        startDateError,
        streetError,
        stateError,
        cityError,
        codeError,
        departmentError,
        setFirstnameError,
        setLastnameError,
        setdateError,
        setStartDateError,
        setStreetError,
        setCityError,
        setStateError,
        setCodeError,
        setDepartmentError,
        selectedDate,
        setSelectedDate
    };
        
  return (
    <StateContext.Provider value={state}>
        {children}
    </StateContext.Provider>
  );
};