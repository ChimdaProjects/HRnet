// context
import {useContext, useState} from "react";
import {FormContext} from "../utils/context/formContext"
import { DateContext } from "../utils/context/dateContext";
// hook
import useErrorMsg from "./useErrorMsg";
// npm
import moment from "moment";

const useFormData = () => {
    const { datas, setDatasEmployee, setIsSubmitted, isSubmitted } = useContext(FormContext);
    const { setShowDatePickerBirth, setShowDatePickerStart } = useContext(DateContext);
    const { errorsMsg, setErrorsMsg, validateField } = useErrorMsg(); // Ajout de useErrorMsg

    // Initial datas
    const initialData = {
        lastname: "",
        firstname: "",
        dateOfBirth: "",
        startDate: "",
        street: "",
        city: "",
        code: "",
        department: "",
    };

  // Initialiser le state de vos données de formulaire à initialData
  const [ formData, setFormData ] = useState(initialData);
  const [ errors, setErrors ] = useState(errorsMsg); 
    /**
     * this function retrieves each value from the form and validates it
     * @param {Event} event 
     */
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]:value
        }));
        validateField(name, value);// Validation des données lorsqu'une saisie a été effectuée
    };
    
    /**
     * This function formats the date entered when there is no more focus in this input field 
     * @param {Event} event 
     */
    const handleBlur = (event) => {
        const {name, value} = event.target;
        const formattedDate = moment(value, "MM/DD/YYYY").format("MM/DD/YYYY");
        setFormData({...formData, [name]: formattedDate});
        validateField(name, formattedDate); // Validation de la date de naissance lorsqu'elle a été modifiée
    };
   
    /**
     * This function gets selected date of birth by date picker
     * @param {object} date selected by the component Datepicker
     */
    const handleDateSelect = (date) => {
        const formattedDate = moment(date, "MM/DD/YYYY").format("MM/DD/YYYY");
        setFormData({
            ...formData,
            dateOfBirth : formattedDate
        })

        setShowDatePickerBirth(false);
        validateField('dateOfBirth', formattedDate); // Validation de la date de naissance lorsqu'elle a été modifiée
    };

     /**
     * This function gets selected start date by date picker
     * @param {object} date selected by the component Datepicker
     */
    const handleDateSelectStart = (date) => {
        const formattedDate = moment(date, "MM/DD/YYYY").format("MM/DD/YYYY");
        setFormData({
            ...formData,
            startDate: formattedDate
        })
        setShowDatePickerStart(false);
        validateField('startDate', formattedDate); // Validation de la date de début lorsqu'elle a été modifiée
    
    }
    const resetForm = () => {
        setFormData(initialData);
    };

    const saveEmployee = (e) => {
        e.preventDefault();
        // checking if each field is completed
        const requiredFields = ["firstname", "lastname", "dateOfBirth", "startDate", "street", "city", "state", "code", "department"];
        const newErrorsMsg = {};
        requiredFields.forEach(field => {
            // if a field is not completed, add an error msg to newErrorsMsg
            if (!formData[field]) {
            newErrorsMsg[field] = `Please enter your ${field}`;
            }
        });
        // add to state
        setErrors({...errors, ...newErrorsMsg});
        // checking if there s value in newErrorsMsg
        if (Object.values(newErrorsMsg).every(val => val === "")) {
            setDatasEmployee(prevEmployeeData => ({
                ...prevEmployeeData ? prevEmployeeData : {},
                formData: [...(prevEmployeeData?.formData || []), formData],
            }));
            setIsSubmitted(!isSubmitted);
            // clear values from form
            resetForm(); 
        } else { 
            alert("Form not completed !");
            console.log("error msg", newErrorsMsg);
        }             
    };
   
    return {
        datas: formData,
        errorsMsg: errors,
        setErrorsMsg,
        handleChange, 
        resetForm, 
        handleBlur, 
        handleDateSelect, 
        handleDateSelectStart, 
        saveEmployee
    };
};
export default useFormData;