import React from "react";
import { useState } from "react";

import "./datepicker.scss"

const Datepicker = ({onSelect }) => {
  // state
    const [selectedDate, setSelectedDate] = useState(null);
    const [displayedMonth, setDisplayedMonth] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(true);

  const handleDateClick = (date) => {
      setSelectedDate(date);
      if (onSelect) {
        onSelect(date);
      }
    };
    console.log("selected date", selectedDate)
    // when the user clicks to display the previous month
    const handlePrevMonthClick = () => {
      setDisplayedMonth(
        new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() - 1)
      );
    };
    // when the user clicks to display the next month
    const handleNextMonthClick = () => {
      setDisplayedMonth(
        new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + 1)
      );
    };
    // number days of current month
    const getDaysInMonth = (date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      
      return new Date(year, month + 1, 0).getDate();
    };
    // names of day on 1 week
    const getWeekdayNames = () => {
      return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    };
    
    const getCalendarDays = () => {
      //  nombre de jours dans le mois 
      const daysInMonth = getDaysInMonth(displayedMonth);
      // represente le 1er jour du mois en chiffre (lundi =1, mardi=2 etc...)
      const firstDayOfMonth = new Date(
        displayedMonth.getFullYear(),
        displayedMonth.getMonth(),
        1
      ).getDay();
    
      // represente le dernier jour du mois 
      const lastDayOfMonth = new Date(
        displayedMonth.getFullYear(),
        displayedMonth.getMonth(),
        daysInMonth
      ).getDay();
    
      const days = [];
  
      // Remplir les jours du mois précédent (case vide pour les mois ou le 1er jour ne commence pas un lundi )
      for (let i = firstDayOfMonth; i > 0; i--) { 
        days.push(null);
      }
  
      // Remplir les jours du mois en cours
      for (let i = 1; i <= daysInMonth; i++) {
        const calendrier =new Date(displayedMonth.getFullYear(), displayedMonth.getMonth(), i) 
      
        days.push(new Date(displayedMonth.getFullYear(), displayedMonth.getMonth(), i));
      }

      // Remplissez les jours du mois suivant
      for (let i = 0; i < 6 - lastDayOfMonth; i++) {
        days.push(null);
      }
      return days;
    };
    
    const closeDatePicker = () => {
      setShowDatePicker(!showDatePicker)
    }

    return (
        showDatePicker && (
            <div className="calendar">
                <span className="calendar-close" onClick={closeDatePicker}>X</span>
                <div className="calendar-header">
                    <button onClick={handlePrevMonthClick}>&lt;</button>
                    <h2>{displayedMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</h2>
                    <button onClick={handleNextMonthClick}>&gt;</button>
                </div>
                <table className="calendar-table">
                    <thead>
                        <tr>
                            {
                                getWeekdayNames().map((weekday) => (
                                    <th key={weekday}>{weekday}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            getCalendarDays().reduce((rows, day, index) => {
                                if (index % 7 === 0) {
                                    rows.push([]);
                                }
                            rows[rows.length - 1].push(day);
                            return rows;
                            }, []).map((row, rowIndex) => (
                                <tr key={rowIndex}> 
                                {
                                    row.map((day, dayIndex) => (
                                        <td key={dayIndex} className="calendar-td" onClick={() => handleDateClick(day)}>
                                            {
                                                day && day.getDate()
                                            }
                                        </td>
                                    ))
                                }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
          )
    )   
}

export default Datepicker;