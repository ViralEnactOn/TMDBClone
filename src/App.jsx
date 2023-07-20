/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import SortComponent from "./components/movieList/sort";
import WheretoWatchComponent from "./components/movieList/wheretoWatch";
import FiltersComponent from "./components/movieList/filters";
import MainContainerComponent from "./components/movieList/mainContainer";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogged, setIsLogged] = useState(true);

  useEffect(() => {
    handleLogin();
  }, []);

  const handleLogin = () => {
    const authToken = localStorage.getItem("authToken");
    const authTokenExpiration = localStorage.getItem("authTokenExpiration");
    const isLoggedIn =
      authToken !== null && new Date().getTime() < authTokenExpiration;
    setIsLogged(isLoggedIn);
    if (isLoggedIn === false) {
      navigate("/");
    } else {
      setIsAuthenticated(true);
    }
    // Perform your authentication logic here, e.g., check credentials
    // For this example, we'll simply set isAuthenticated to true when the user logs in
  };
  return (
    <>
      {isLogged && (
        <main className="min-w-max flex justify-center bg-#000 font-poppins">
          <div className="container">
            <div className="flex min-h-screen mt-20">
              {/* Sidebar */}
              <div className="w-1/5 flex flex-col ">
                <div className="font-semibold text-xl">Popular Movie</div>
                <SortComponent />
                <WheretoWatchComponent />
                <FiltersComponent />
              </div>
              {/* Main Component */}
              <div className="w-4/5">
                <MainContainerComponent />
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  data: state.example,
});

export default connect(mapStateToProps)(App);
