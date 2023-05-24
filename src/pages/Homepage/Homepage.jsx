import React from "react";

// components
import Navbar from "../../components/Navbar/Navbar";
import FormAddEmployee from "../../components/FormEmployee/FormAddEmployee";

/**
 * This function displays the homepage
 * @returns { JSX } homepage component view
 */
function Homepage() {
  return (
    <div className="homepage">
      <header>
        <Navbar />
      </header>
      <main>
        <div className="container">
          <FormAddEmployee />
        </div>
      </main>
    </div>
  );
}

export default Homepage;
