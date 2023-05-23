import React from "react";
import { Routes, Route } from "react-router-dom";

// components
import Homepage from "../../pages/Homepage/Homepage";
import EmployeeView from "../../pages/EmployeesView/EmployeeView";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

// styles
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/current-employee" element={<EmployeeView />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
