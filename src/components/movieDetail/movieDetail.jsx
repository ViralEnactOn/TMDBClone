/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { API_URL, Header, IMAGE_URL } from "../config/config";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {
  ListBulletIcon,
  HeartIcon,
  BookmarkIcon,
  StarIcon,
  PlayIcon,
} from "@heroicons/react/20/solid";
axios.defaults.headers.common = Header;

function movieDetail() {
  const { id } = useParams();
  const [loader, setLoader] = useState(true);
  const [details, setDetails] = useState([]);
  const handleMovieDetail = async () => {
    setLoader(true);
    try {
      const endPoint = `${API_URL}movie/${id}`;
      await axios.get(endPoint).then((res) => {
        setDetails([res.data]);
        setLoader(false);
      });
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleMovieDetail();
  }, []);
  return (
    <>
      <main className="min-w-max flex justify-center font-poppins mt-10">
        {loader === true ? (
          <div className="flex justify-center h-screen w-screen items-center">
            <ThreeCircles
              height={100}
              width={100}
              color="#4fa94d"
              visible={true}
              ariaLabel="three-circles-rotating"
            />
          </div>
        ) : (
          <div className="container">
            {details.length !== 0 ? (
              <>
                <div>
                  {details.map((item, index) => {
                    // Date
                    let dateStr = item.release_date;
                    let [year, month, day] = dateStr.split("-");
                    let formattedDate = `${month}/${day}/${year}`;
                    // Run time
                    const hours = Math.floor(item.runtime / 60);
                    const minutes = item.runtime % 60;
                    const formattedTime = hours + "h " + minutes + "m";
                    // Genres
                    const genres = item.genres.map((item) => item.name);
                    const genresString = genres.join(", ");

                    return (
                      <>
                        <div className="relative">
                          {/* Container for the backdrop image */}
                          <div className="absolute inset-0 overflow-hidden rounded-lg max-w-full max-h-full">
                            <img
                              src={IMAGE_URL + item.backdrop_path}
                              alt="Movie Poster"
                              className="ml-48 "
                            />
                            <div
                              className="absolute inset-0 bg-black opacity-50"
                              // style={{
                              //   background:
                              //     "linear-gradient(to top,rgba(255, 255, 255, 0.8) 0%,rgba(255, 255, 255, 0) 100%)",
                              // }}
                            ></div>
                          </div>

                          {/* Main content */}
                          <div className="flex relative p-10">
                            <div className="flex flex-col w-1/5">
                              <img
                                src={IMAGE_URL + item.poster_path}
                                alt="Movie Poster"
                                className="rounded-lg"
                              />
                            </div>
                            <div className="flex flex-col w-4/5 ml-10 items-start">
                              <span className="text-white text-3xl font-bold mt-5">
                                {item.original_title}
                                {" (" + item.release_date.slice(0, 4) + ")"}
                              </span>
                              <span className="text-white text-base mt-2 font-light">
                                {formattedDate}
                                <span className="ml-3">{genresString}</span>
                                <span className="ml-3">{formattedTime}</span>
                              </span>
                              <span className="mt-5 flex items-center">
                                <div className="w-16 h-16 text-center">
                                  <CircularProgressbar
                                    strokeWidth={6}
                                    value={
                                      item.vote_average
                                        ? item.vote_average * 10
                                        : ""
                                    }
                                    text={`${
                                      item.vote_average
                                        ? Math.round(item.vote_average * 10)
                                        : ""
                                    }%`}
                                    styles={buildStyles({
                                      pathColor: "#03AC13",
                                      trailColor: "lightgray",
                                      textSize: "30px",
                                      textColor: "#FFF",
                                    })}
                                  />
                                </div>
                                <span className="text-white text-base ml-2 w-5 font-semibold">
                                  User Score
                                </span>
                                <div className="mx-auto ml-11">
                                  <span className="flex justify-center items-center text-white text-base w-12 h-12 rounded-full font-semibold bg-blue-500">
                                    <ListBulletIcon className="h-4 w-4 text-white self-center" />
                                  </span>
                                </div>

                                <div className="mx-auto ml-5">
                                  <span className="flex justify-center items-center text-white text-base w-12 h-12 rounded-full font-semibold bg-blue-500">
                                    <HeartIcon className="h-4 w-4 text-white self-center" />
                                  </span>
                                </div>

                                <div className="mx-auto ml-5">
                                  <span className="flex justify-center items-center text-white text-base w-12 h-12 rounded-full font-semibold bg-blue-500">
                                    <BookmarkIcon className="h-4 w-4 text-white self-center" />
                                  </span>
                                </div>

                                <div className="mx-auto ml-5">
                                  <span className="flex justify-center items-center text-white text-base w-12 h-12 rounded-full font-semibold bg-blue-500">
                                    <StarIcon className="h-4 w-4 text-white self-center" />
                                  </span>
                                </div>

                                <div className="mx-auto ml-5">
                                  <span className="flex justify-center items-center text-white text-base w-12 h-12 rounded-full font-semibold ">
                                    <PlayIcon className="h-4 w-4 text-white self-center" />
                                  </span>
                                </div>
                                <div className="mx-auto flex justify-center items-center text-white text-base rounded-full font-semibold ">
                                  Play Trailer
                                </div>
                              </span>
                              <span className="mt-5 flex items-center text-gray-400 italic text-base rounded-full font-semibold">
                                {item.tagline}
                              </span>
                              <span className="mt-2 flex  items-center text-white  text-lg rounded-full font-bold">
                                Overview
                              </span>
                              <span className="mt-2 flex items-center text-white  text-base rounded-full font-normal">
                                {item.overview}
                              </span>
                              <div className="grid grid-cols-3 gap-40 mt-2">
                                <div>
                                  <div className="text-white items-start">
                                    Tomek Baginski
                                  </div>
                                  <div className="text-gray-300 items-start text-sm ">
                                    Director
                                  </div>
                                </div>
                                <div>
                                  <div className="text-white items-start">
                                    Josh Campbell
                                  </div>
                                  <div className="text-gray-300 items-start text-sm">
                                    Screenplay
                                  </div>
                                </div>
                                <div>
                                  <div className="text-white items-start">
                                    Tomek Baginski
                                  </div>
                                  <div className="text-gray-300 items-start text-sm">
                                    Screenplay
                                  </div>
                                </div>
                              </div>
                              <div className="grid grid-cols-3 gap-40 mt-2">
                                <div>
                                  <div className="text-white items-start">
                                    Matthew Stuecken
                                  </div>
                                  <div className="text-gray-300 items-start text-sm">
                                    Screenplay
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </>
            ) : (
              <div>
                <p>No movie details available.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </>
  );
}

const mapStateToProps = (state) => ({
  data: state.example,
});

export default connect(mapStateToProps)(movieDetail);
