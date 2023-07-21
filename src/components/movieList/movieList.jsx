/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import SortComponent from "./sort";
import WheretoWatchComponent from "./wheretoWatch";
import FiltersComponent from "./filters";
import MainContainerComponent from "./mainContainer";
import { connect } from "react-redux";

function movieList() {
  return (
    <>
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
    </>
  );
}

const mapStateToProps = (state) => ({
  data: state.example,
});

export default connect(mapStateToProps)(movieList);
