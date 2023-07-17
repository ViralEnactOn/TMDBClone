/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { APIURL, Header, IMAGEURL } from "../config/config";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import store from "../store/store";
import { ThreeCircles } from "react-loader-spinner";
import { Link } from "react-router-dom";
axios.defaults.headers.common = Header;

function mainContainer() {
  const reduxDetails = store.getState().example;
  const [movie, setMovie] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    console.log("reduxDetails", reduxDetails);
    handleMovie();
  }, [reduxDetails]);

  const handleMovie = async () => {
    setLoader(true);
    try {
      const endPoint = APIURL + "discover/movie";
      const params = {
        page: 1,
        language: "en-US",
        include_adult: false,
        include_video: false,
        sort_by: reduxDetails.sort,
        watch_region: reduxDetails.country,
        with_watch_providers: reduxDetails.WatchProviders.join("|"),
        "release_date.gte": reduxDetails.releaseDateGte,
        "release_date.lte": reduxDetails.releaseDateLte,
        certification: reduxDetails.certifications.join("|"),
        "vote_average.gte": reduxDetails.voteAverageGte,
        "vote_average.lte": reduxDetails.voteAverageLte,
        "with_runtime.gte": reduxDetails.runtimeGte,
        "with_runtime.lte": reduxDetails.runtimeLte,
      };

      if (reduxDetails.genres !== "") {
        params.with_genres = reduxDetails.genres.join(",");
      }
      if (reduxDetails.voteCountGte !== "") {
        params["vote_count.lte"] = 0;
        params["vote_count.gte"] = reduxDetails.voteCountGte;
      }
      await axios.get(endPoint, { params }).then((res) => {
        setLoader(false);
        setMovie(res.data.results);
      });
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <>
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
        <div className="grid grid-cols-5 gap-4 absolute w-3/6 pl-12 pt-12 font-poppins">
          {movie.length !== 0 &&
            movie.map((item, index) => {
              let dateObj = new Date(item.release_date);
              let formattedDate = dateObj.toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              });
              return (
                <>
                  <Link to={`movie/${item.id}`}>
                    <div
                      key={index}
                      className="h-auto rounded-lg border-solid border-2 "
                    >
                      <img
                        src={
                          item.poster_path
                            ? IMAGEURL + item.poster_path
                            : IMAGEURL + item.backdrop_path
                        }
                        alt={item.original_title}
                        className="rounded-t-lg"
                      />

                      <div className="p-2 ">
                        {/* <div className="text-center w-11 h-10">
                        <CircularProgressbar
                          strokeWidth={6}
                          value={
                            item.vote_average ? item.vote_average * 10 : ""
                          }
                          text={`${
                            item.vote_average ? item.vote_average * 10 : ""
                          }%`}
                          styles={buildStyles({
                            pathColor: "#03AC13",
                            trailColor: "lightgray",
                            textSize: "30px",
                          })}
                        />
                      </div> */}
                        <div className="font-semibold text-sm mt-2">
                          {item.original_title ? item.original_title : ""}
                        </div>
                        <div className="mt-1 text-xs">
                          {formattedDate ? formattedDate : ""}
                        </div>
                      </div>
                    </div>
                  </Link>
                </>
              );
            })}
        </div>
      )}
      {movie.length === 0 && (
        <>
          <div className="flex justify-start pl-12 pt-12 font-poppins text-gray-400">
            No items were found that match your query.
          </div>
        </>
      )}
    </>
  );
}

export default mainContainer;
