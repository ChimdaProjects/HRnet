// context
import {useContext, useState} from "react";
import {FormContext} from "../utils/context/formContext"
import { DateContext } from "../utils/context/dateContext";
// hook
import useErrorMsg from "./useErrorMsg";
// npm
import moment from "moment";

const useFormData = () => {
    const { datas, setDatas, setDatasEmployee, setIsSubmitted, isSubmitted } = useContext(FormContext);
    const { setShowDatePickerBirth, setShowDatePickerStart } = useContext(DateContext);
    const { errorsMsg, setErrorsMsg, validateField } = useErrorMsg(); // Ajout de useErrorMsg

    /**
     * this function retrieves each value from the form and validates it
     * @param {Event} event 
     */
    const handleChange = (event) => {
        const { name, value } = event.target;
        setDatas((prevState) => ({
            ...prevState,
            [name]:value
        }));
        validateField(name, value);// Validation des données lorsqu'une saisie a été effectuée
    };

    const formatDateString = (dateString) => {
        const date = new Date(dateString);
      
        // Vérifier si la date est valide
        if (isNaN(date.getTime())) {
          return "Invalid date"
        }
      
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Mois (ajouter 1 au mois car il est basé sur zéro)
        const day = date.getDate().toString().padStart(2, "0"); // Jour
        const year = date.getFullYear(); // Année
      
        let formattedYear = year.toString();
      
        // Formater l'année si elle est saisie avec seulement deux chiffres
        if (formattedYear.length === 2) {
          const currentYear = new Date().getFullYear();
          const currentCentury = Math.floor(currentYear / 100) * 100;
          const prefix = year <= currentYear % 100 ? currentCentury : currentCentury - 100;
          formattedYear = (prefix + year).toString();
        }
      
        // Formater la date au format MM/DD/YYYY
        const formattedDate = `${month}/${day}/${formattedYear}`;
      
        return formattedDate;
      };
    /**
     * This function gets selected date of birth by date picker
     * @param {object} date selected by the component Datepicker
     */
    const handleDateSelect = (date) => {
        //const formattedDate = moment(date, "MM/DD/YYYY").format("MM/DD/YYYY");
        const formattedDate = formatDateString(date);
        setDatas({
            ...datas,
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
    //const formattedDate = moment(date, "MM/DD/YYYY").format("MM/DD/YYYY");
    const formattedDate = formatDateString(date);
        setDatas({
            ...datas,
            startDate: formattedDate
        })
        setShowDatePickerStart(false);
        validateField('startDate', formattedDate); // Validation de la date de début lorsqu'elle a été modifiée
    
    }

    
    /**
     * This function formats the date entered when there is no focus in this input field 
     * @param {Event} event 
     */
    const handleBlur = (event) => {
        const {name, value} = event.target;
        //const formattedDate = moment(value, "MM/DD/YYYY").format("MM/DD/YYYY");
        const formattedDate = formatDateString(value);
        setDatas({
            ...datas, 
            [name]: formattedDate
        });
        validateField(name, formattedDate); // Validation de la date de naissance lorsqu'elle a été modifiée
        console.log("date",value) 
    };



    /**
     * This function resets values of form
     */
    const resetForm = () => {
        setDatas({});
    };

    /**
     * This function saves the values entered in the form
     * @param {Event} e 
     */
    const saveEmployee = (e) => {
        e.preventDefault();
        // checking if each field is completed
        const requiredFields = ["firstname", "lastname", "dateOfBirth", "startDate", "street", "city", "state", "code", "department"];
        const newErrorsMsg = {};
        requiredFields.forEach(field => {
            // if a field is not completed, add an error msg to newErrorsMsg
            if (!datas[field]) {
            newErrorsMsg[field] = `Please enter your ${field}`;
            }
        });
        // add to state
        setErrorsMsg({...errorsMsg, ...newErrorsMsg});
        // checking if there s value in newErrorsMsg
        if (Object.values(newErrorsMsg).every(val => val === "")) {
            setDatasEmployee(prevEmployeeData => {
                return [...prevEmployeeData, datas]
            });
            setIsSubmitted(!isSubmitted);
            // clear values from form
            resetForm(); 
        } else { 
            alert("Form not completed !");
            console.log("error msg", newErrorsMsg);
        }             
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
        setIsSubmitted
    };
};
export default useFormData;