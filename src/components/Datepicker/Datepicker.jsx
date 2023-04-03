import React from "react";
import { useState } from "react";
const Datepicker = ({ onSelect }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [displayedMonth, setDisplayedMonth] = useState(new Date());
  
    const handleDateClick = (date) => {
      setSelectedDate(date);
      if (onSelect) {
        onSelect(date);
      }
    };
  
    const handlePrevMonthClick = () => {
      setDisplayedMonth(
        new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() - 1)
      );
    };
  
    const handleNextMonthClick = () => {
      setDisplayedMonth(
        new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + 1)
      );
    };
  
    const getDaysInMonth = (date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      return new Date(year, month + 1, 0).getDate();
    };
  
    const getWeekdayNames = () => {
      return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    };
  
    const getCalendarDays = () => {
      const daysInMonth = getDaysInMonth(displayedMonth);
      const firstDayOfMonth = new Date(
        displayedMonth.getFullYear(),
        displayedMonth.getMonth(),
        1
      ).getDay();
      const lastDayOfMonth = new Date(
        displayedMonth.getFullYear(),
        displayedMonth.getMonth(),
        daysInMonth
      ).getDay();
      const days = [];
  
      // Remplissez les jours du mois précédent
      for (let i = firstDayOfMonth; i > 0; i--) {
        days.push(null);
      }
  
      // Remplissez les jours du mois en cours
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(displayedMonth.getFullYear(), displayedMonth.getMonth(), i));
      }
  
      // Remplissez les jours du mois suivant
      for (let i = 0; i < 6 - lastDayOfMonth; i++) {
        days.push(null);
      }
  
      return days;
    };
  
    return (
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={handlePrevMonthClick}>&lt;</button>
          <h2>{displayedMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</h2>
          <button onClick={handleNextMonthClick}>&gt;</button>
        </div>
        <table className="calendar-table">
          <thead>
            <tr>
              {getWeekdayNames().map((weekday) => (
                <th key={weekday}>{weekday}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {getCalendarDays().reduce((rows, day, index) => {
              if (index % 7 === 0) {
                rows.push([]);
              }
              rows[rows.length - 1].push(day);
              return rows;
            }, []).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((day, dayIndex) => (
                  <td key={dayIndex} onClick={() => handleDateClick(day)}>
                    {day && day.getDate()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
    </div>
    )
                }

                export default Datepicker;