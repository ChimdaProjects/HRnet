import React from "react";
// router
import { NavLink, Link } from 'react-router-dom';
// img
import logo from "../../assets/logo_wealth_health.jpg"
// style
import "./navbar.scss"

const Navbar = () => {
    const linkStyle = {
        textDecoration: 'none', 
        color:'black'
      };
   
  return (
    <nav className="navbar">
        <div className="navbar-logo">
            <Link 
                    to="/" 
                    exact
                >
                    <img src={ logo } alt="logo of hrnet" className="navbar-logo-img" />
            </Link>
        </div>
      <ul className="navbar-content">
        <li className="navbar-content-path">
            <NavLink to="/" exact style={linkStyle} >
                Accueil
            </NavLink>
        </li>
        <li className="navbar-content-path">
            <NavLink to="/view-employees" exact style={linkStyle} >
                Liste des employés
            </NavLink>
        </li>
        <li className="navbar-content-path button-path">
            <NavLink to="/create-employee" exact style={linkStyle} >
                Ajouter un employé
            </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

