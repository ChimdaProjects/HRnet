import React from "react";

// components
import Navbar from "../../components/Navbar/Navbar";
import FormAddEmployee from "../../components/App/FormEmployee/FormAddEmployee";

/**
 * This function displays the homepage
 * @returns { JSX } homepage component view
 */
const Homepage = () => {
    return (
        <div className="homepage">
            <header>
                <Navbar />
            </header>
            <main >
                <div className="title">
                    <h1>HR net</h1>
                </div>
                <div className="container">
                    <FormAddEmployee />
                </div>
            </main>
            <footer>

            </footer>
           
            
        </div>
    );
}

export default Homepage;