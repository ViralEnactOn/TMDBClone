/* eslint-disable no-prototype-builtins */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, Header, IMAGE_URL } from "../config/config";
import "react-circular-progressbar/dist/styles.css";
import store from "../store/store";
import { ThreeCircles } from "react-loader-spinner";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import * as solid from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
axios.defaults.headers.common = Header;

function mainContainer() {
  const [lazyLoading, setLazyLoading] = useState(true);
  const reduxDetails = store.getState().example;
  const [movie, setMovie] = useState([]);
  const [loader, setLoader] = useState(true);
  const selectedFilters = useSelector((state) => state.example);
  const parameters = {};

  // Fetch URL Params
  const extractURLParameters = () => {
    const urlParams = new URLSearchParams(window.location.search);
    for (const [key, value] of urlParams.entries()) {
      parameters[key] = value;
    }
    return parameters;
  };

  // Filter Redux Value
  const handleFilterToggle = (filterType, filterValue) => {
    const newFilters = {
      ...selectedFilters,
      [filterType]: Array.isArray(selectedFilters[filterType])
        ? selectedFilters[filterType].includes(filterValue)
          ? selectedFilters[filterType].filter((f) => f !== filterValue)
          : [...selectedFilters[filterType], filterValue]
        : filterValue,
    };
    store.dispatch({ type: "UPDATE_FILTERS", payload: newFilters });
  };

  // Set Params
  const handleParams = (obj) => {
    let parts = [];
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        if (Array.isArray(value)) {
          // Handling array values
          if (value.length > 0) {
            const encodedValues = value.map((item) =>
              encodeURIComponent(item.value)
            );
            parts.push(`${encodeURIComponent(key)}=${encodedValues.join(",")}`);
          }
        } else if (typeof value === "object" && value !== null) {
          // Handling object values
          parts.push(
            `${encodeURIComponent(key)}=${encodeURIComponent(value.value)}`
          );
        } else {
          // Handling other values
          parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        }
      }
    }
    const newUrl = `${location.pathname}?${parts.join("&").toString()}`;
    window.history.replaceState(null, "", newUrl);
  };

  useEffect(() => {
    console.log("reduxDetails", reduxDetails);
    handleParams(selectedFilters);
    extractURLParameters();
    handleMovie();
  }, [reduxDetails]);

  const handleMovie = async () => {
    setLazyLoading(true);
    setLoader(true);
    try {
      const endPoint = API_URL + "discover/movie";
      const params = {
        page: 1,
        language: "en-US",
        include_adult: false,
        include_video: false,
        sort_by: parameters.sort,
        watch_region: parameters.country,
        with_watch_providers:
          parameters.WatchProviders === undefined
            ? ""
            : parameters.WatchProviders.replace(/,/g, "|"),
        "release_date.gte": parameters.releaseDateGte,
        "release_date.lte": parameters.releaseDateLte,
        certification:
          parameters.certification === undefined
            ? ""
            : parameters.certifications.replace(/,/g, "|"),
        "vote_average.gte": parameters.voteAverageGte,
        "vote_average.lte": parameters.voteAverageLte,
        "with_runtime.gte": parameters.runtimeGte,
        "with_runtime.lte": parameters.runtimeLte,
      };
      if (parameters.genres !== "") {
        params.with_genres = parameters.genres;
      }
      if (parameters.voteCountGte !== "") {
        params["vote_count.lte"] = 0;
        params["vote_count.gte"] = parameters.voteCountGte;
      }
      await axios.get(endPoint, { params }).then((res) => {
        setLoader(false);
        setMovie(res.data.results);
        // setTimeout(() => {
        setLazyLoading(false);
      }, 5000);
      // });
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  return (
    <>
      {/* Display selected filters as chips */}
      {/* <div
        className="grid gap-4 absolute sm:pl-12 xs:mt-5 font-poppins items-center auto-rows-fr 
    grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 
    xl:max-w-none 2xl:max-w-none w-fit"
      >
        {Object.entries(selectedFilters).map(([filterType, filterValue]) => {
          if (filterType === "userDetails") {
            return null;
          }
          return Array.isArray(filterValue)
            ? filterValue.map((value) => (
                <div
                  key={`${filterType}-${value}`}
                  className="items-center text-center text-sm transition-colors flex justify-between p-2 hover:bg-blue-300 hover:text-white 
                    rounded-l-full rounded-r-full border-spacing-2 border-solid border-2 px-4"
                  onClick={() => handleFilterToggle(filterType, value)}
                >
                  <div>{value.name}</div>
                  <div className="font-bold self-center">
                    <solid.XMarkIcon className="h-5 w-5" />
                  </div>
                </div>
              ))
            : filterValue !== "" && (
                <div
                  key={`${filterType}-${filterValue}`}
                  className="items-center text-center text-sm transition-colors flex justify-between p-2 hover:bg-blue-300 hover:text-white 
                    rounded-l-full rounded-r-full border-spacing-2 border-solid border-2 px-4"
                  onClick={() => handleFilterToggle(filterType, "")}
                >
                  <div>{filterValue.name ? filterValue.name : filterValue}</div>
                  <div className="font-bold self-center">
                    <solid.XMarkIcon className="h-5 w-5" />
                  </div>
                </div>
              );
        })}
      </div> */}

      {loader === true ? (
        <>
          <div className="flex justify-center h-screen items-center">
            <ThreeCircles
              height="100"
              width="100"
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor=""
              innerCircleColor=""
              middleCircleColor=""
            />
          </div>
        </>
      ) : (
        <>
          {movie.length === 0 ? (
            <>
              <div className="flex justify-center pl-12 h-screen font-poppins text-gray-400">
                <div className="self-center">
                  No items were found that match your query.
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mx-auto relative  grid gap-4 mt-24 font-poppins sm:grid-cols-2 sm:pl-12 xs:grid-flow-wrap md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 2xl:max-w-none xl:max-w-none ">
                {movie.length !== 0 &&
                  movie.map((item, index) => {
                    let dateObj = new Date(item.release_date);
                    let formattedDate = dateObj.toLocaleDateString("en-US", {
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                    });
                    return (
                      <Link to={`/${item.id}`} key={index}>
                        <div className=" sm:h-90 sm:w-36  rounded-lg border-solid border-2 xs:flex sm:flex-col">
                          <div className="rounded-t-lg">
                            {lazyLoading === true ? (
                              <Skeleton height={245} />
                            ) : (
                              <img
                                src={
                                  item.poster_path
                                    ? IMAGE_URL + item.poster_path
                                    : IMAGE_URL + item.backdrop_path
                                }
                                alt={item.original_title}
                                className="rounded-t-lg h-60 "
                              />
                            )}
                          </div>
                          <div>
                            <div className="p-2">
                              <div className="font-semibold text-sm mt-2">
                                {item.original_title ? item.original_title : ""}
                              </div>
                              <div className="mt-1 text-xs">
                                {formattedDate ? formattedDate : ""}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default mainContainer;
