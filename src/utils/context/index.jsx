import { createContext, useState } from "react";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
    // function to format the date
    const formattedDateNow = () => {
        const now = new Date();
        const day = now.getDate().toString().padStart(2, "0");
        const month = (now.getMonth() + 1).toString().padStart(2, "0");
        const year = now.getFullYear().toString();
        const formattedDateNow = `${month}/${day}/${year}`;
        return formattedDateNow;
    }
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
        startDate: formattedDateNow,
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
        setDatas
    };
        
  return (
    <StateContext.Provider value={state}>
        {children}
    </StateContext.Provider>
  );
};