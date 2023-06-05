import { useContext } from "react";
import { ErrorContext } from "../utils/context/errorContext";

const useErrorMsg = () => {
  const { errorsMsg, setErrorsMsg } = useContext(ErrorContext);

  const validateField = (name, value) => {
    switch (name) {
    case "firstname":
    case "lastname":
      if (value === "" || value.length < 2) {
        setErrorsMsg((prevErrorsMsg) => ({
          ...prevErrorsMsg,
          [name]: `The ${name} field cannot be empty and must contain at least 2 characters.`,
        }));
      } else {
        const regex = /^[a-zA-ZÀ-ÿ\s"’.\-]*$/;
        if (!regex.test(value)) {
          setErrorsMsg((prevErrorsMsg) => ({
            ...prevErrorsMsg,
            [name]: `The ${name} field must contain only letters`,
          }));
        } else {
          setErrorsMsg((prevErrorsMsg) => ({
            ...prevErrorsMsg,
            [name]: "",
          }));
        }
      }
      break;

    case "dateOfBirth":
      if (value === "" || value.length < 1) {
        setErrorsMsg((prevErrorsMsg) => ({
          ...prevErrorsMsg,
          [name]: `Le champ ${name} is required.`,
        }));
      }
      if (value === "Invalid date") {
        setErrorsMsg((prevErrorsMsg) => ({
          ...prevErrorsMsg,
          [name]: `The entered date for the field ${name} is invalid.`,
        }));
      } else {
        setErrorsMsg((prevErrorsMsg) => ({
          ...prevErrorsMsg,
          [name]: "",
        }));
      }
      break;
    case "startDate":
      if (value === "" || value.length < 1) {
        setErrorsMsg((prevErrorsMsg) => ({
          ...prevErrorsMsg,
          [name]: `The ${name} fiel is required.`,
        }));
      }
      if (value === "Invalid date") {
        setErrorsMsg((prevErrorsMsg) => ({
          ...prevErrorsMsg,
          [name]: `The entered date for the field ${name} is invalid.`,
        }));
      } else {
        setErrorsMsg((prevErrorsMsg) => ({
          ...prevErrorsMsg,
          [name]: "",
        }));
      }
      break;

    case "street":
    case "city":
      if (value === "" || value.length < 2) {
        setErrorsMsg((prevErrorsMsg) => ({
          ...prevErrorsMsg,
          [name]: `The field ${name} cannot be empty.`,
        }));
      } else {
        setErrorsMsg((prevErrorsMsg) => ({
          ...prevErrorsMsg,
          [name]: "",
        }));
      }
      break;

    case "state":
      if (value === "") {
        setErrorsMsg((prevErrorsMsg) => ({
          ...prevErrorsMsg,
          state: "You must select a State.",
        }));
      } else {
        setErrorsMsg((prevErrorsMsg) => ({
          ...prevErrorsMsg,
          state: "",
        }));
      }
      break;

    case "code":
      if (value === "") {
        setErrorsMsg((prevErrorsMsg) => ({
          ...prevErrorsMsg,
          code: `The field ${name} cannot be empty and must contain only numbers.`,
        }));
      } else {
        const regex = /^[0-9]{1,5}$/;
        if (!regex.test(value)) {
          setErrorsMsg((prevErrorsMsg) => ({
            ...prevErrorsMsg,
            code: `The field ${name} must contain only numbers and at least 5 numbers.`,
          }));
        } else {
          setErrorsMsg((prevErrorsMsg) => ({
            ...prevErrorsMsg,
            code: "",
          }));
        }
      }
      break;

    case "department":
      if (value === "") {
        setErrorsMsg((prevErrorsMsg) => ({
          ...prevErrorsMsg,
          department: "You must select a department.",
        }));
      } else {
        setErrorsMsg((prevErrorsMsg) => ({
          ...prevErrorsMsg,
          department: "",
        }));
      }
      break;

    default:
      console.log(`Sorry, we are out of ${name}.`);
    }
  };

  return { errorsMsg, validateField, setErrorsMsg };
};
export default useErrorMsg;
