import { createContext, useState } from "react";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [datasEmployee, setDatasEmployee] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [currentMonth, setCurrentMonth] = useState("");
    const [datas, setDatas] = useState(
        {
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
        }
    );
    const state = {
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
    };

  return (
    <StateContext.Provider value={state}>
        {children}
    </StateContext.Provider>
  );
};