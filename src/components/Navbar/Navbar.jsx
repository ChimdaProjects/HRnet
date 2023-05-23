import React from "react";
// router
import { NavLink, Link } from "react-router-dom";
// img
import logo from "../../assets/logo_wealth_health.jpg";
// style
import "./navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="logo of hrnet" className="navbar-logo-img" />
        </Link>
      </div>
      <ul className="navbar-content">
        <li className="navbar-content-path">
          <NavLink to="/">Create employee</NavLink>
        </li>
        <li className="navbar-content-path">
          <NavLink to="/current-employee">Current employees</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
