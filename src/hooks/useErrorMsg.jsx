import { useContext } from "react";
import { ErrorContext } from "../utils/context/errorContext";

const useErrorMsg = (name) => {
  const { errorsMsg, setErrorsMsg } = useContext(ErrorContext);

  const validateField = (value) => {
    switch (name) {
      case "firstname":
      case "lastname":
        if (value === "" || value.length < 2) {
          setErrorsMsg((prevErrorsMsg) => ({
            ...prevErrorsMsg,
            [name]: `Le champ ${name} ne peut être vide et doit contenir au min 2 caractères.`,
          }));
        } else {
          const regex = /^[a-zA-ZÀ-ÿ\s'’.\-]*$/;
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
      case "startDate":
        if (value === "" || value.length < 1) {
          setErrorsMsg((prevErrorsMsg) => ({
            ...prevErrorsMsg,
            [name]: `Le champ ${name} est requis.`,
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
  }

  return { errorsMsg , validateField
   }
}
export default useErrorMsg;




/*import { useContext } from "react";
import { ErrorContext } from "../utils/context/errorContext";

const useErrorMsg = () => {

  const { errorsMsg, setErrorsMsg }  = useContext(ErrorContext);
  
    /**
     * This function handles errors when entering the form field and returns an error message
     * @param {string} name - field's name
     * @param {string} value - the value of all field's form
     */
    /*const errorMsg = (name, value) => {
      switch(name) {
          case "firstname" :
              if (value === "" || value.length < 2) {
                setErrorsMsg.firstname(`Le champ ${name} ne peut être vide et doit contenir au min 2 caractères.`)
              } else {
                  const regex = /^[a-zA-ZÀ-ÿ\s'’.\-]*$/;
                  if (!regex.test(value)) {
                    
                    setErrorsMsg.firstname(`Le champ ${name} doit contenir uniquement des lettres`);
                  }    
                  else {
                    setErrorsMsg.firstname("")
                  }
              }
              break;

          case "lastname" :
              if (value === "" || value.length < 2) {
                setErrorsMsg.lastname(`Le champ ${name} ne peut être vide et doit contenir au min 2 caractères.`)
              } else {
                  const regex = /^[a-zA-ZÀ-ÿ\s'’.\-]*$/;
                  if (!regex.test(value)) {
                    
                    setErrorsMsg.lastname(`Le champ ${name} doit contenir uniquement des lettres`);
                  }
                  else {
                    setErrorsMsg.lastname("")
                  }
              }
          
          case "dateOfBirth" :
              if (value === "" || value.length<1) {
              
                setErrorsMsg.dateOfBirth(`Le champ ${name} est requis.`)
              } else {
                setErrorsMsg.dateOfBirth("");
                
              }
              break; 
          
          case "startDate" :
              if (value === "" || value.length<1) {
                setErrorsMsg.startDate(`Le champ ${name} est requis.`)
              } else {
                setErrorsMsg.startDate("");
                
              }
              break; 
          case "street" :
              if (value === "" || value.length < 2) {
                  setErrorsMsg.street(`Le champ ${name} ne peut être vide.`)
              } else {
                setErrorsMsg.street("")
              }
          case "city":
              if (value === "" || value.length < 2) {
                setErrorsMsg.city(`Le champ ${name} ne peut être vide.`)
              } else {
                setErrorsMsg.city("")
               
              }
              break;
          case "state":
              if (value === "") {
                setErrorsMsg.statecitysetStateError("Vous devez choisir un état.")
              } else {
                setErrorsMsg.state("")
              }
              break;
          case "code":
              if (value === "" ) {
                setErrorsMsg.city(`Le champ ${name} ne peut être vide et doit contenir que des chiffres.`)
              } else {
                  const regex = /^[0-9]{1,5}$/;
                  ;
                  if (!regex.test(value)) {
                    
                    setErrorsMsg.city(`Le champ ${name} doit contenir uniquement des chiffres et 5 caractères au max.`);
                  }
                  else {
                    setErrorsMsg.city("")
                  }
              }
              break;
          case "department":
              if (value === "") {
                setErrorsMsg.department("Vous devez sélectionner un department.")
              } else {
                setErrorsMsg.department("")
              }
              break;
          
          default:
              console.log(`Sorry, we are out of ${name}.`) 
      }
  }
  return {
    errorsMsg, errorMsg
  };
}
export default useErrorMsg;*/