import React, { useContext, useEffect } from "react";
// style
import "./formemployee.scss";
// components
import Datepicker from "../Datepicker/Datepicker";
import Modal from "../Modal/Modal";
import Select from "../Select/Select";
// context
import { DateContext } from "../../utils/context/dateContext";
import { FormContext } from "../../utils/context/formContext";
// datas
import states from "../../datas/states";
import departments from "../../datas/departments";
// custom hooks
import useFormData from "../../hooks/useFormData";

/**
 * This function displays the form to add an employee
 * @returns {JSX} component react
 */
function FormAddEmployee() {
  // import state from Context
  const { isSubmitted } = useContext(FormContext);
  const {
    showDatePickerBirth,
    setShowDatePickerBirth,
    showDatePickerStart,
    setShowDatePickerStart,
  } = useContext(DateContext);

  // custom hook
  const {
    datas,
    handleChange,
    resetForm,
    handleBlur,
    handleDateSelect,
    handleDateSelectStart,
    errorsMsg,
    saveEmployee,
    setIsSubmitted,
  } = useFormData();

  useEffect(() => {
    resetForm();
    setIsSubmitted(false);
  }, []);

  return (
    <div className="formaddemployee">
      <h2 className="form-title">HR NET - Create employee</h2>
      <form action="#" id="create-employee" onSubmit={saveEmployee}>
        <div className="form-content">
          <div className="form-left">
            {/* firstname input */}
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              name="firstname"
              value={datas.firstname}
              onChange={handleChange}
              required
              className={errorsMsg.firstname ? "error" : ""}
            />
            {errorsMsg.firstname && (
              <p className="form-error">{errorsMsg.firstname}</p>
            )}
            {/* lastname input */}
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              name="lastname"
              value={datas.lastname}
              onChange={handleChange}
              className={errorsMsg.lastname ? "error" : ""}
            />
            {errorsMsg.lastname && (
              <p className="form-error">{errorsMsg.lastname}</p>
            )}
            {/* date of birth input */}
            <label htmlFor="date-of-birth">Date of Birth</label>
            <input
              id="date-of-birth"
              type="text"
              name="dateOfBirth"
              placeholder="MM/JJ/AAAA"
              value={datas.dateOfBirth}
              onBlur={handleBlur}
              onChange={handleChange}
              className={errorsMsg.dateOfBirth ? "error" : ""}
            />
            <span
              className="form-calendar"
              onClick={() => {
                setShowDatePickerBirth(!showDatePickerBirth);
              }}
              aria-hidden
            >
              <i className="fa-regular fa-calendar" />
            </span>
            {errorsMsg.dateOfBirth && (
              <p className="form-error">{errorsMsg.dateOfBirth}</p>
            )}

            {showDatePickerBirth && <Datepicker onSelect={handleDateSelect} />}
            {/* start date input */}
            <label htmlFor="start-date">Start Date</label>
            <input
              id="start-date"
              type="text"
              name="startDate"
              placeholder="MM/JJ/AAAA"
              onBlur={handleBlur}
              onChange={handleChange}
              value={datas.startDate}
              className={
                datas.startDate === "Invalid date" || errorsMsg.startDate
                  ? "error"
                  : ""
              }
            />
            <span
              className="form-calendar"
              onClick={() => {
                setShowDatePickerStart(!showDatePickerStart);
              }}
              aria-hidden
            >
              <i className="fa-regular fa-calendar" />
            </span>
            {errorsMsg.startDate && (
              <p className="form-error">{errorsMsg.startDate}</p>
            )}

            {showDatePickerStart && (
              <Datepicker onSelect={handleDateSelectStart} />
            )}
          </div>

          <fieldset className="address">
            <legend>Address</legend>
            {/* street input */}
            <label htmlFor="street">Street</label>
            <input
              id="street"
              type="text"
              name="street"
              value={datas.street}
              onChange={handleChange}
              className={errorsMsg.street ? "error" : ""}
            />
            {errorsMsg.street && (
              <p className="form-error">{errorsMsg.street}</p>
            )}
            {/* city input */}
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              name="city"
              value={datas.city}
              onChange={handleChange}
              className={errorsMsg.city ? "error" : ""}
            />
            {errorsMsg.city && <p className="form-error">{errorsMsg.city}</p>}
            {/* state input */}
            <label htmlFor="state">State</label>
            <Select
              name="state"
              id="state"
              value={datas.state}
              onChange={handleChange}
              data={states}
              className={errorsMsg.state ? "error" : ""}
            />
            {errorsMsg.state && <p className="form-error">{errorsMsg.state}</p>}
            {/* zip code input */}
            <label htmlFor="zip-code">Zip Code</label>
            <input
              id="zip-code"
              type="number"
              name="code"
              value={datas.code}
              onChange={handleChange}
              className={errorsMsg.code ? "error" : ""}
            />
            {errorsMsg.code && <p className="form-error">{errorsMsg.code}</p>}
          </fieldset>
          {/* department input */}
          <div className="form-department">
            <label htmlFor="department">Department</label>
            <Select
              name="department"
              id="department"
              value={datas.department}
              onChange={handleChange}
              data={departments}
              className={errorsMsg.department ? "error" : ""}
            />
            {errorsMsg.department && (
              <p className="form-error">{errorsMsg.department}</p>
            )}
          </div>
        </div>
        <button type="submit" className="form-button">
          Save
        </button>
      </form>
      {isSubmitted ? <Modal text="Employee successfully created !" /> : ""}
    </div>
  );
}
export default FormAddEmployee;
