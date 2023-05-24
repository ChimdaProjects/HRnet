import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Error from "../../components/Error/Error";

function ErrorPage() {
  return (
    <div className="errorpage">
      <header>
        <Navbar />
      </header>
      <main>
        <Error />
      </main>
      <footer />
    </div>
  );
}

export default ErrorPage;
