import React, {useState} from "react";
import PropTypes from "prop-types";
import "./datepicker.scss";

/**
 * This component represents a date picker.
 *
 * @param {Object} props - The props object.
 * @param {function} props.onSelect - The callback function called when a date is selected.
 * @returns {JSX.Element} - The date picker component.
 */
const Datepicker = ({ onSelect }) => {
  // state
  const [selectedDate, setSelectedDate] = useState(null);
  const [displayedMonth, setDisplayedMonth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [monthSelected, setMonthSelected] = useState(new Date().getMonth());
  const [yearSelected, setYearSelected] = useState(new Date().getFullYear());
  const [showSelectionDate, setShowSelectionDate] = useState(false);

  const currentDate = new Date();
  const handleDateClick = (date) => {
    setSelectedDate(date);
    if (onSelect) {
      onSelect(date);
    }
  };
  // when the user clicks to display the previous month
  const handlePrevMonthClick = () => {
    setDisplayedMonth(
      new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() - 1)
    );
    setMonthSelected(monthSelected - 1);
    // si le mois est égal à Janvier
    if (monthSelected === 0) {
      setYearSelected(yearSelected - 1);
      setMonthSelected(monthSelected + 11);
    }
  };
  // when the user clicks to display the next month
  const handleNextMonthClick = () => {
    setDisplayedMonth(
      new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + 1)
    );
    setMonthSelected(monthSelected + 1);
    if (monthSelected === 11) {
      setYearSelected(yearSelected + 1);
      setMonthSelected(monthSelected - 11);
    }
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

  // names of month on 1 year
  const getMonthNames = () => {
    return [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  };
  // years on dropdown menu for year selection
  const years = [];
  for (let i = 1949; i <= new Date().getFullYear(); i++) {
    years.push(i);
  }
  years.sort((a, b) => b - a);

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
      const calendrier = new Date(
        displayedMonth.getFullYear(),
        displayedMonth.getMonth(),
        i
      );

      days.push(
        new Date(displayedMonth.getFullYear(), displayedMonth.getMonth(), i)
      );
    }

    // Remplissez les jours du mois suivant
    for (let i = 0; i < 6 - lastDayOfMonth; i++) {
      days.push(null);
    }
    return days;
  };

  const closeDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  // get month by select and display the calendar of this selection
  const handleMonthSelected = (e) => {
    const month = e.target.value;
    setMonthSelected(month);
    setDisplayedMonth(new Date(yearSelected, month));
  };

  // get year
  const handleYearSelected = (e) => {
    const yearSelected = e.target.value;
    setYearSelected(yearSelected);
    setDisplayedMonth(new Date(yearSelected, monthSelected));
  };
  const handleSelectionDate = () => {
    setShowSelectionDate(!showSelectionDate);
    const date = document.querySelector(".calendar-title");
    date.style.display = "none";
  };

  const handleResetToCurrentDate = () => {
    setDisplayedMonth(currentDate);
    setMonthSelected(currentDate.getMonth());
    setYearSelected(currentDate.getFullYear());
  };

  return (
    showDatePicker && (
      <div className="calendar">
        <span className="calendar-close" onClick={closeDatePicker}>
          <i className="fa-solid fa-xmark"></i>
        </span>
        <div className="calendar-header">
          <button className="calendar-reset" onClick={handleResetToCurrentDate}>
            <i className="fa-solid fa-house"></i>
          </button>
          <button
            className="calendar-header-left"
            onClick={handlePrevMonthClick}
          >
            &lt;
          </button>
          <h2 className="calendar-title" onClick={handleSelectionDate}>
            {displayedMonth.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          {showSelectionDate && (
            <>
              <select
                className="calendar-month"
                value={monthSelected}
                onChange={handleMonthSelected}
              >
                {getMonthNames().map((month, index) => {
                  return (
                    <option key={month} value={index}>
                      {month}
                    </option>
                  );
                })}
              </select>
              <select
                className="calendar-year"
                value={yearSelected}
                onChange={handleYearSelected}
              >
                {years.map((year) => {
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </>
          )}
          <button
            className="calendar-header-right"
            onClick={handleNextMonthClick}
          >
            &gt;
          </button>
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
            {getCalendarDays()
              .reduce((rows, day, index) => {
                if (index % 7 === 0) {
                  rows.push([]);
                }
                rows[rows.length - 1].push(day);
                return rows;
              }, [])
              .map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((day, dayIndex) => (
                    <td
                      key={dayIndex}
                      className={
                        day && day.getDate() === currentDate.getDate()
                          ? "calendar-td-current-day"
                          : "calendar-td"
                      }
                      onClick={() => handleDateClick(day)}
                    >
                      {day && day.getDate()}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    )
  );
};

Datepicker.propTypes = {
  onSelect: PropTypes.func,
};

export default Datepicker;
