import React from "react";

// components
import Navbar from "../../components/Navbar/Navbar";
import FormAddEmployee from "../../components/FormEmployee/FormAddEmployee";
import Modal from "../../components/Modal/Modal";

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
                <div className="container">
                    <FormAddEmployee />
                    <Modal />
                  
                </div>
            </main>
            <footer>

            </footer>
           
            
        </div>
    );
}

export default Homepage;