import { createContext, useState } from "react";

export const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePickerBirth, setShowDatePickerBirth] = useState(false);
  const [showDatePickerStart, setShowDatePickerStart] = useState(false);
  const [currentMonth, setCurrentMonth] = useState("");

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

  return <DateContext.Provider value={state}>{children}</DateContext.Provider>;
};
