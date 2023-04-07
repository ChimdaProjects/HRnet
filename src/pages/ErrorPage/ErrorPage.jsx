import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Error from "../../components/Error/Error";
const ErrorPage = () => {
    return (
        <div className="errorpage">
            <header>
                <Navbar />
            </header>
            <main >
                <Error />
            </main>
            <footer>

            </footer>
        </div>
    )
}

export default ErrorPage;