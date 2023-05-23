import React from "react";
import "./modal.scss"

/**
 * This function displays a modal when an employee is created
 * @returns {JSX} modal react component
 */
const Modal = ({text}) => {
    const handleCloseModal = () => {
        const modal = document.querySelector(".modal");
        modal.style.display="none";
    }
    return (
        <div className="modal">
            <div 
                id="confirmation" 
                className="modal-content">
                    <span className="modal-content-close" onClick={handleCloseModal}>X</span>
                    <p className="modal-content-text">{text}</p>
            </div>
        </div>
      
    )
    
}
export default Modal;