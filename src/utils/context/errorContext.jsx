import { createContext, useState } from "react";

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [errorsMsg, setErrorsMsg] = useState({
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

  const state = {
    errorsMsg,
    setErrorsMsg,
  };

  return (
    <ErrorContext.Provider value={state}>{children}</ErrorContext.Provider>
  );
};
