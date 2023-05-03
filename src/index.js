import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from '../src/components/App/App';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { FormProvider } from "./utils/context/formContext";
import { ErrorProvider } from './utils/context/errorContext';
import { DateProvider } from './utils/context/dateContext';
import { PaginationProvider } from './utils/context/paginationContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <FormProvider>
        <DateProvider>
            <ErrorProvider>
              <PaginationProvider>
                <React.StrictMode>
                    <App />
                  </React.StrictMode>
              </PaginationProvider>
                  
            </ErrorProvider>
        </DateProvider>
      </FormProvider>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
