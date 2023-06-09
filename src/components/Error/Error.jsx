import { Link } from "react-router-dom";
import React from "react";
import imgError from "../../assets/error.jpg";
import "./error.scss";

/**
 * This function displays the 404 page
 * @returns {JSX} error component react
 */
function Error() {
  return (
    <div className="error">
      <div className="error-content">
        <p className="error-content-text">Oops !</p>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <p className="error-content-txt">La page demandée n'existe pas...</p>
        <img src={imgError} alt="404 page" className="error-img" />
        <Link to="/" className="error-link">
          RETOUR ACCUEIL
        </Link>
      </div>
    </div>
  );
}

export default Error;
