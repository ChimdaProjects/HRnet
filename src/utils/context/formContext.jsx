import { createContext, useState } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [datas, setDatas] = useState(
       {
        firstname: "",
        lastname: "",
        dateOfBirth:"",
        startDate: "",
        street:"",
        city:"",
        state:"",
        department:""
        }
    );
    const [datasEmployee, setDatasEmployee] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const state = {
        datas,
        setDatas,
        datasEmployee,
        setDatasEmployee,
        isSubmitted,
        setIsSubmitted,
    };
        
  return (
    <FormContext.Provider value={state}>
        {children}
    </FormContext.Provider>
  );
};