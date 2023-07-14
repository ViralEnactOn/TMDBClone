/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { APIURL, Header, IMAGEURL } from "../config/config";
import CircularProgress from "@mui/material/CircularProgress";
axios.defaults.headers.common = Header;

function mainContainer(props) {
  let newValue;
  if (props.selectedGenres) {
    let propValue = props.selectedGenres;
    newValue = propValue.join(",").replace(" ", "");
  }
  const [movie, setMovie] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    handleMovie();
  }, [props]);

  const handleMovie = async () => {
    setLoader(true);
    try {
      const endPoint = APIURL + "discover/movie";
      const params = {
        page: 1,
        language: "en-US",
        include_adult: false,
        include_video: false,
      };
      if (props.selected) {
        params.sort_by = props.selected;
      }
      if (props.selectedGenres) {
        params.with_genres = newValue;
      }
      await axios.get(endPoint, { params }).then((res) => {
        setLoader(false);
        console.log("handleMovie", res.data.results);
        setMovie(res.data.results);
      });
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <>
      {loader === true ? (
        <></>
      ) : (
        <div className="grid grid-cols-5 gap-4 absolute w-3/5 pl-12 pt-12 font-poppins">
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
                  <div
                    key={index}
                    className="h-96 w-5/5 rounded-lg border-solid border-2 "
                  >
                    <img
                      src={IMAGEURL + item.poster_path}
                      alt="poster"
                      className="rounded-t-lg h-64 w-full"
                    />

                    <div className="p-2 ">
                      <div className="absolute text-center">
                        <CircularProgress
                          variant="determinate"
                          value={
                            item.vote_average ? item.vote_average * 10 : ""
                          }
                        />
                      </div>
                      <div className="w-10 h-10 rounded-lg ">
                        <div className="flex flex-col items-center justify-center w-full h-full text-xs">
                          {`${
                            item.vote_average ? item.vote_average * 10 : ""
                          }%`}
                        </div>
                      </div>
                      <div className="font-semibold text-sm">
                        {item.original_title ? item.original_title : ""}
                      </div>
                      <div className="mt-1 text-xs">
                        {formattedDate ? formattedDate : ""}
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      )}
    </>
  );
}

export default mainContainer;
