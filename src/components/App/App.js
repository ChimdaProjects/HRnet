// styles
import './App.css';
// components
import Homepage from '../../pages/Homepage/Homepage';
import EmployeeView from '../../pages/EmployeesView/EmployeeView';
import { Routes, Route } from 'react-router-dom';
//import Datepicker from '../Datepicker/Datepicker';

function App() {
  return (
    <div className="App">
      <Routes >
      <Route 
        path="/"
        element={<Homepage/>}
      />
      <Route 
        path="/current-employee"
        element={<EmployeeView />}
      />
      </Routes>
    </div>
  );
}

export default App;
