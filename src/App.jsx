/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import SortComponent from "./components/movieList/sort";
import WheretoWatchComponent from "./components/movieList/wheretoWatch";
import FiltersComponent from "./components/movieList/filters";
import MainContainerComponent from "./components/movieList/mainContainer";
function App() {
  return (
    <>
      <main className="min-w-max flex justify-center bg-#000 font-poppins">
        <div className="container   ">
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
    </>
  );
}

export default App;
