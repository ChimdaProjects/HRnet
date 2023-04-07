// styles
import './App.css';
// components
import Homepage from '../../pages/Homepage/Homepage';
import EmployeeView from '../../pages/EmployeesView/EmployeeView';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
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
      <Route 
        path="*"
        element={<ErrorPage />}
      />
      </Routes>
    </div>
  );
}

export default App;
