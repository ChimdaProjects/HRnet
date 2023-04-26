// context
import {useContext, useState} from "react";
import {FormContext} from "../utils/context/formContext"
import { DateContext } from "../utils/context/dateContext";
// hook
import useErrorMsg from "./useErrorMsg";
// npm
import moment from "moment";
import { ErrorContext } from "../utils/context/errorContext";

const useFormData = () => {
    const {datas, setDatas} = useContext(FormContext);
    const {setShowDatePickerBirth} = useContext(DateContext);
    const {errorsMsg, validateField} = useErrorMsg(); // Ajout de useErrorMsg

    // Définir les données initiales
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
  const [formData, setFormData] = useState(initialData);

    const handleChange = (event) => {
        const { name, value } = event.target;
        validateField(name, value);
        setFormData((prevState) => ({
            ...prevState,
            [name]:value
        }));
        // Validation des données lorsqu'une saisie a été effectuée
    };
    
    // format the date of birth entered when there is no more focus in the input field 
    const handleBlur = (event) => {
        const value = event.target.value;
        const formattedDate = moment(value, "MM/DD/YYYY").format("MM/DD/YYYY");
        setFormData({...datas, dateOfBirth: formattedDate});
        validateField('dateOfBirth', formattedDate); // Validation de la date de naissance lorsqu'elle a été modifiée
    };
    // format the date of start entered when there is no more focus in the input field 
    const handleBlurStartDate = (event) => {
        const value = event.target.value;
        const formattedDate = moment(value, "MM/DD/YYYY").format("MM/DD/YYYY");
        setFormData({...datas, startDate: formattedDate?formattedDate:value});
        validateField('startDate', formattedDate); // Validation de la date de naissance lorsqu'elle a été modifiée
    };
   
    // get selected date by date picker
    const handleDateSelect = (date) => {
        const formattedDate = moment(date, "MM/DD/YYYY").format("MM/DD/YYYY");
        setFormData({
            ...datas,
            dateOfBirth : formattedDate
        })

        setShowDatePickerBirth(false);
        validateField('dateOfBirth', formattedDate); // Validation de la date de naissance lorsqu'elle a été modifiée
    };

    // get selected date by date picker
    const handleDateSelectStart = (date) => {
        const formattedDate = moment(date, "MM/DD/YYYY").format("MM/DD/YYYY");
        setFormData({
            ...datas,
            startDate: formattedDate
        })
        setShowDatePickerBirth(false);
        validateField('startDate', formattedDate); // Validation de la date de début lorsqu'elle a été modifiée
    
    }
    const resetForm = () => {
        setFormData(initialData);
    };
   
    return {
        datas: formData,
        errorsMsg,
        handleChange, 
        resetForm, 
        handleBlur, 
        handleBlurStartDate, 
        handleDateSelect, 
        handleDateSelectStart
    };
};
export default useFormData;