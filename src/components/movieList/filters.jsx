/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { APIURL, Header, IMAGEURL } from "../config/config";
import axios from "axios";
import Slider from "@mui/material/Slider";
import MainContainerComponent from "./mainContainer";
axios.defaults.headers.common = Header;

function filters() {
  const [isOpen, setIsOpen] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [genres, setGenres] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [certification, setCertification] = useState(["U", "UA", "A"]);
  const [selectedCertification, setSelectedCertification] = useState([]);
  const [userScore, setUserScore] = useState([0, 50]);
  const [minUserScore, setMinUserScore] = useState("");
  const [runTime, setRunTime] = useState([0, 100]);
  const multipliedValues = runTime.map((value) => Math.floor(value * 4));

  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 50,
      label: "5",
    },
    {
      value: 100,
      label: "10",
    },
  ];

  const minUserMarks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 20,
      label: "100",
    },
    {
      value: 40,
      label: "200",
    },
    {
      value: 60,
      label: "300",
    },
    {
      value: 80,
      label: "400",
    },
    {
      value: 100,
      label: "500",
    },
  ];

  const runtimeMark = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 30,
      label: "120",
    },
    {
      value: 60,
      label: "240",
    },
    {
      value: 90,
      label: "360",
    },
  ];
  // Open / Close
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
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

  // Handle Genres Selected
  const handleGenresSelected = (value) => {
    if (selectedGenres.includes(value)) {
      setSelectedGenres(selectedGenres.filter((v) => v !== value));
    } else {
      setSelectedGenres([...selectedGenres, value]);
    }
  };

  // Handle Certification Selected
  const handleCertificationSelected = (value) => {
    if (selectedCertification.includes(value)) {
      setSelectedCertification(
        selectedCertification.filter((v) => v !== value)
      );
    } else {
      setSelectedCertification([...selectedCertification, value]);
    }
  };

  // Handle User Score
  const handleChangeUserScore = (event, newValue) => {
    setUserScore(newValue);
  };

  // Handle Minimum User Score
  const handleChangeMinUserScore = (value) => {
    setMinUserScore(value * 5);
  };

  // Handle Runtime
  const handleChangeRuntime = (event, newValue) => {
    setRunTime(newValue);
  };

  return (
    <div className="p-3 bg-white rounded-lg mt-5 drop-shadow-2xl">
      <div className="flex justify-between" onClick={() => handleIsOpen()}>
        <div className="font-semibold">Filters</div>
        <div>
          <ChevronRightIcon />
        </div>
      </div>
      {isOpen && (
        <>
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
                  setFromDate(event.target.value);
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
                  setToDate(event.target.value);
                }}
              />
            </div>
          </div>
          {/* Genres */}
          <div className="border-t-2 mt-3 pt-2 text-gray-400">Genres</div>
          <div className=" grid grid-cols-2 gap-4 mt-3">
            {genres.length !== 0 &&
              genres.map((name, index) => {
                return (
                  <>
                    <div className="text-center text-sm transition-colors">
                      <div
                        onClick={() => handleGenresSelected(name.id)}
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
            <Slider
              value={userScore}
              onChange={handleChangeUserScore}
              defaultValue={50}
              // valueLabelDisplay={value / 10}
              step={10}
              marks={marks}
            />
          </div>

          {/* User Score */}
          <div className="border-t-2 mt-3 pt-2 text-gray-400">
            Minimum User Votes
          </div>
          <div className="p-3 mt-3">
            <Slider
              getAriaValueText={handleChangeMinUserScore}
              defaultValue={50}
              step={10}
              marks={minUserMarks}
            />
          </div>

          {/* Runtime */}
          <div className="border-t-2 mt-3 pt-2 text-gray-400">
            Minimum User Votes
          </div>
          <div className="p-3 mt-3">
            <Slider
              value={runTime}
              onChange={handleChangeRuntime}
              defaultValue={100}
              step={3.8461}
              marks={runtimeMark}
            />
          </div>
        </>
      )}
      {/* <div style={{ display: "none" }}>
        <MainContainerComponent selectedGenres={selectedGenres} />
      </div> */}
    </div>
  );
}

export default filters;
