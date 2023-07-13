/* eslint-disable no-unused-vars */
import React from "react";
import SortComponent from "./sort";
import WheretoWatchComponent from "./wheretoWatch";
import FiltersComponent from "./filters";
function movieList() {
  return (
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
          <div className="w-4/5">Main Content</div>
        </div>
      </div>
    </main>
  );
}

export default movieList;
