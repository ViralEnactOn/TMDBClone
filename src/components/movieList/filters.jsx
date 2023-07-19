/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { APIURL, Header, IMAGEURL } from "../config/config";
import axios from "axios";
import { connect } from "react-redux";
import store from "../store/store";
axios.defaults.headers.common = Header;
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

function filters() {
  const [isOpen, setIsOpen] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [genres, setGenres] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [certification, setCertification] = useState(["U", "UA", "A"]);
  const [selectedCertification, setSelectedCertification] = useState([]);
  const [userScore, setUserScore] = useState([0, 50]);
  const [minUserScore, setMinUserScore] = useState(250);
  const [runTime, setRunTime] = useState([0, 100]);
  // Open / Close
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  // Handle Set From Date
  const handleFromDate = (event) => {
    setFromDate(event);
    store.dispatch({
      type: "UPDATE_RELEASE_DATE_GTE",
      payload: event,
    });
  };

  // Handle Set To Date
  const handleToDate = (event) => {
    setToDate(event);
    store.dispatch({
      type: "UPDATE_RELEASE_DATE_LTE",
      payload: event,
    });
  };
  // Get Genres
  const handleGenres = async () => {
    const endPoint = APIURL + "genre/movie/list";
    const params = {
      language: "en",
    };
    await axios.get(endPoint, { params }).then((res) => {
      setGenres(res.data.genres);
    });
  };

  useEffect(() => {
    handleGenres();
  }, []);

  const handleGenresSelected = (id, name) => {
    let updatedSelectedGenres;
    if (selectedGenres.includes(id)) {
      updatedSelectedGenres = selectedGenres.filter((genre) => genre !== id);
    } else {
      // updatedSelectedGenres = [...selectedGenres, [id, name]];
      updatedSelectedGenres = [...selectedGenres, id];
    }
    setSelectedGenres(updatedSelectedGenres);
    store.dispatch({
      type: "UPDATE_GENRES",
      payload: updatedSelectedGenres,
    });
  };

  // Handle Certification Selected
  const handleCertificationSelected = (value) => {
    let updatedSelectedCertification;
    if (selectedCertification.includes(value)) {
      updatedSelectedCertification = selectedCertification.filter(
        (v) => v !== value
      );
    } else {
      updatedSelectedCertification = [...selectedCertification, value];
    }
    setSelectedCertification(updatedSelectedCertification);
    store.dispatch({
      type: "UPDATE_CERTIFICATION",
      payload: updatedSelectedCertification,
    });
  };

  // Handle User Score
  const handleChangeUserScore = (value) => {
    setUserScore(value);
    store.dispatch({
      type: "UPDATE_VOTE_AVERAGE",
      payload: value,
    });
  };

  // Handle Minimum User Score
  const handleChangeMinUserScore = (value) => {
    setMinUserScore(value[1] * 5);
    store.dispatch({
      type: "UPDATE_VOTE_COUNT",
      payload: value[1] * 5,
    });
  };

  // Handle Runtime
  const handleChangeRuntime = (value) => {
    setRunTime(value);
    let updateRuntime = value;
    const multipliedValues = updateRuntime.map((value) =>
      Math.floor(value * 4)
    );
    store.dispatch({
      type: "UPDATE_RUNTIME",
      payload: multipliedValues,
    });
  };

  return (
    <div className="p-3 bg-white rounded-lg mt-5 drop-shadow-2xl">
      <div className="flex justify-between" onClick={() => handleIsOpen()}>
        <div className="font-semibold">Filters</div>
        <div className="flex">
          {isOpen ? (
            <ChevronDownIcon className="h-5 w-5 self-center " />
          ) : (
            <ChevronRightIcon className="h-5 w-5 self-center " />
          )}
        </div>
      </div>
      {isOpen && (
        <>
          {/* Release Dates */}
          <div className="border-t-2 mt-2 pt-2 text-gray-400">
            Release Dates
          </div>
          <div className="flex justify-between">
            <div className="self-center opacity-40 text-sm">from</div>
            <div className="border-2 rounded-lg p-2">
              <input
                type="date"
                className="text-xs"
                onChange={(event) => {
                  handleFromDate(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <div className="self-center opacity-40 text-sm">to</div>
            <div className="border-2 rounded-lg p-2">
              <input
                type="date"
                className="text-xs"
                onChange={(event) => {
                  handleToDate(event.target.value);
                }}
              />
            </div>
          </div>

          {/* Genres */}
          <div className="border-t-2 mt-3 pt-2 text-gray-400">Genres</div>
          <div className=" grid grid-cols-2 gap-4 mt-3 ">
            {genres.length !== 0 &&
              genres.map((name, index) => {
                return (
                  <>
                    <div
                      key={index}
                      className="text-center text-sm transition-colors"
                    >
                      <div
                        onClick={() => handleGenresSelected(name.id, name.name)}
                        className={
                          selectedGenres.includes(name.id)
                            ? "selected p-1 hover:bg-white hover:text-black rounded-l-full rounded-r-full border-solid border-2 transition-colors"
                            : "p-1 hover:bg-blue-300 hover:text-white rounded-l-full rounded-r-full border-spacing-2 border-solid border-2  transition-colors"
                        }
                        value={name.value}
                      >
                        {name.name}
                      </div>
                    </div>
                  </>
                );
              })}
          </div>

          {/* Certification */}
          <div className="border-t-2 mt-3 pt-2 text-gray-400">
            Certification
          </div>
          <div className="grid grid-cols-3 gap-4 mt-3">
            {genres.length !== 0 &&
              certification.map((name, index) => {
                return (
                  <>
                    <div className="text-center text-sm transition-colors">
                      <div
                        onClick={() => handleCertificationSelected(name)}
                        className={
                          selectedCertification.includes(name)
                            ? "selected p-1 hover:bg-white hover:text-black rounded-l-full rounded-r-full border-solid border-2 transition-colors"
                            : "p-1 hover:bg-blue-300 hover:text-white rounded-l-full rounded-r-full border-spacing-2 border-solid border-2 transition-colors"
                        }
                        value={name}
                      >
                        {name}
                      </div>
                    </div>
                  </>
                );
              })}
          </div>

          {/* User Score */}
          <div className="border-t-2 mt-3 pt-2 text-gray-400">User Score</div>
          <div className="p-3 mt-3">
            <RangeSlider
              value={userScore}
              onInput={handleChangeUserScore}
              step={10}
            />
            <div className="flex justify-between mt-2 text-sm">
              <span>0</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>

          {/* User Votes */}
          <div className="border-t-2 mt-3 pt-2 text-gray-400">
            Minimum User Votes
          </div>
          <div className="p-3 mt-3">
            <RangeSlider
              onInput={handleChangeMinUserScore}
              defaultValue={[0, 0]}
              step={10}
              thumbsDisabled={[true, false]}
              rangeSlideDisabled={true}
            />
            <div className="flex justify-between mt-2 text-sm ml-4">
              <span>0</span>
              <span>100</span>
              <span>200</span>
              <span>300</span>
              <span>400</span>
              <span>500</span>
            </div>
          </div>

          {/* Runtime */}
          <div className="border-t-2 mt-3 pt-2 text-gray-400">
            Minimum User Votes
          </div>
          <div className="p-3 mt-3">
            <RangeSlider
              value={runTime}
              onInput={handleChangeRuntime}
              step={4}
            />
            <div className="flex justify-between mt-2 text-sm ml-4">
              <span>0</span>
              <span>100</span>
              <span>200</span>
              <span>300</span>
              <span>400</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.example,
});

export default connect(mapStateToProps)(filters);
