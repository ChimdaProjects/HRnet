import { createContext, useState } from "react";

export const ErrorContext = createContext();

// eslint-disable-next-line react/function-component-definition, react/prop-types
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

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const state = {
    errorsMsg,
    setErrorsMsg,
  };

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <ErrorContext.Provider value={state}>{children}</ErrorContext.Provider>
  );
};
