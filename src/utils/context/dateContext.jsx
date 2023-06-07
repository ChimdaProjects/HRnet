import { createContext, useState } from "react";

export const DateContext = createContext();

// eslint-disable-next-line react/function-component-definition, react/prop-types
export const DateProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePickerBirth, setShowDatePickerBirth] = useState(false);
  const [showDatePickerStart, setShowDatePickerStart] = useState(false);
  const [currentMonth, setCurrentMonth] = useState("");

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const state = {
    selectedDate,
    setSelectedDate,
    showDatePickerBirth,
    setShowDatePickerBirth,
    showDatePickerStart,
    setShowDatePickerStart,
    currentMonth,
    setCurrentMonth,
  };

  // eslint-disable-next-line react/react-in-jsx-scope
  return <DateContext.Provider value={state}>{children}</DateContext.Provider>;
};
