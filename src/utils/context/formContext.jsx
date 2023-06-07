import { createContext, useState } from "react";

import employees from "../../datas/employees";

export const FormContext = createContext();

// eslint-disable-next-line react/function-component-definition, react/prop-types
export const FormProvider = ({ children }) => {
  const [datas, setDatas] = useState({
    firstname: "",
    lastname: "",
    dateOfBirth: "",
    startDate: "",
    street: "",
    city: "",
    state: "",
    code: "",
    department: "",
  });
  const [datasEmployee, setDatasEmployee] = useState(employees);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const state = {
    datas,
    setDatas,
    datasEmployee,
    setDatasEmployee,
    isSubmitted,
    setIsSubmitted,
  };

  // eslint-disable-next-line react/react-in-jsx-scope
  return <FormContext.Provider value={state}>{children}</FormContext.Provider>;
};
