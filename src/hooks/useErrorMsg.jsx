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
          [name]: `Le champ ${name} ne peut être vide et doit contenir au min 2 caractères.`,
        }));
      } else {
        const regex = /^[a-zA-ZÀ-ÿ\s"’.\-]*$/;
        if (!regex.test(value)) {
          setErrorsMsg((prevErrorsMsg) => ({
            ...prevErrorsMsg,
            [name]: `Le champ ${name} doit contenir uniquement des lettres`,
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
          [name]: `Le champ ${name} est requis.`,
        }));
      }
      if (value === "Invalid date") {
        setErrorsMsg((prevErrorsMsg) => ({
          ...prevErrorsMsg,
          [name]: `La date saisie pour le champ ${name} est invalide.`,
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
          [name]: `Le champ ${name} est requis.`,
        }));
      }
      if (value === "Invalid date") {
        setErrorsMsg((prevErrorsMsg) => ({
          ...prevErrorsMsg,
          [name]: `La date saisie pour le champ ${name} est invalide.`,
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
          [name]: `Le champ ${name} ne peut être vide.`,
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
          state: "Vous devez choisir un état.",
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
          code: `Le champ ${name} ne peut être vide et doit contenir que des chiffres.`,
        }));
      } else {
        const regex = /^[0-9]{1,5}$/;
        if (!regex.test(value)) {
          setErrorsMsg((prevErrorsMsg) => ({
            ...prevErrorsMsg,
            code: `Le champ ${name} doit contenir uniquement des chiffres et 5 caractères au max.`,
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
          department: "Vous devez sélectionner un département.",
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
