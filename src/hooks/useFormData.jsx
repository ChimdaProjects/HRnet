// context
import { useContext, useState } from "react";
import { FormContext } from "../utils/context/formContext";
import { DateContext } from "../utils/context/dateContext";
import moment from "moment";
// hook
import useErrorMsg from "./useErrorMsg";
// component
import Modal from "../components/Modal/Modal";

const useFormData = () => {
  const { datas, setDatas, setDatasEmployee, setIsSubmitted, isSubmitted } =
    useContext(FormContext);
  const { setShowDatePickerBirth, setShowDatePickerStart } =
    useContext(DateContext);
  const { errorsMsg, setErrorsMsg, validateField } = useErrorMsg();

  const initialDatas = {
    firstname: "",
    lastname: "",
    dateOfBirth: "",
    startDate: "",
    street: "",
    city: "",
    state: "",
    code: "",
    department: "",
  };
  /**
   * This function retrieves each value from the form and validates it
   * @param {Event} event
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDatas((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validateField(name, value);
  };
  /**
   * This function does the formatting of the date
   * @param {String} dateString
   * @returns
   */
  const formatDateString = (dateString) => {
    // the formats of the entered values allowed
    const formats = ["MMDDYYYY", "MM/DD/YYYY", "MMDDYY", "MM/DD/YY"];

    for (let i = 0; i < formats.length; i++) {
      const format = formats[i];
      const parsedDate = moment(dateString, format, true);

      if (parsedDate.isValid()) {
        // date is valid, format it as MM/DD/YYYY
        return parsedDate.format("MM/DD/YYYY");
      }
    }

    return "Invalid date";
  };

  /**
   * This function gets selected date of birth by date picker
   * @param {object} date selected by the component Datepicker
   */
  const handleDateSelect = (date) => {
    const formattedDate = formatDateString(date);
    setDatas({
      ...datas,
      dateOfBirth: formattedDate,
    });
    setShowDatePickerBirth(false);
    validateField("dateOfBirth", formattedDate);
  };

  /**
   * This function gets selected start date by date picker
   * @param {object} date selected by the component Datepicker
   */
  const handleDateSelectStart = (date) => {
    const formattedDate = formatDateString(date);
    setDatas({
      ...datas,
      startDate: formattedDate,
    });
    setShowDatePickerStart(false);
    validateField("startDate", formattedDate);
  };

  /**
   * This function formats the date entered when there is no focus in this input field
   * @param {Event} event
   */
  const handleBlur = (event) => {
    const { name, value } = event.target;
    const formattedDate = formatDateString(value);
    setDatas({
      ...datas,
      [name]: formattedDate,
    });
    validateField(name, formattedDate);
  };

  /**
   * This function resets values of form
   */
  const resetForm = () => {
    setDatas(initialDatas);
    setErrorsMsg({});
  };

  /**
   * This function saves the values entered in the form
   * @param {Event} e
   */
  const saveEmployee = (e) => {
    e.preventDefault();
    // checking if each field is completed
    const requiredFields = [
      "firstname",
      "lastname",
      "dateOfBirth",
      "startDate",
      "street",
      "city",
      "state",
      "code",
      "department",
    ];
    const newErrorsMsg = {};
    requiredFields.forEach((field) => {
      // if a field is not completed, add an error msg to newErrorsMsg
      if (!datas[field]) {
        newErrorsMsg[field] = `Please enter your ${field}`;
      }
    });
    // add to state
    setErrorsMsg({ ...errorsMsg, ...newErrorsMsg });
    // Checking if there are any error messages
    const hasErrors = Object.values(errorsMsg).some((val) => val !== "") || Object.values(newErrorsMsg).some((val) => val !== "");

    if (hasErrors) {
      // If there are error messages, do not save the employee
      //
      setIsSubmitted(false);
      return (
        alert("Form not completed !")
      );
    }

    // Save the employee
    setDatasEmployee((prevEmployeeData) => [...prevEmployeeData, datas]);
    setIsSubmitted(!isSubmitted);

    // Clear values from form
    resetForm();
  };

  return {
    datas,
    errorsMsg,
    setErrorsMsg,
    handleChange,
    resetForm,
    handleBlur,
    handleDateSelect,
    handleDateSelectStart,
    saveEmployee,
    isSubmitted,
    setIsSubmitted,
  };
};
export default useFormData;
