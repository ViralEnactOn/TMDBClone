/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { APIURL, Header, IMAGEURL } from "../config/config";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
axios.defaults.headers.common = Header;

function movieDetail() {
  const { id } = useParams();
  const [loader, setLoader] = useState(true);
  const [movieDetail, setMovieDetail] = useState([]);
  const handleMovieDetil = async () => {
    setLoader(true);
    try {
      const endPoint = `${APIURL}movie/${id}`;
      const params = {
        movie_id: id,
      };
      await axios.get(endPoint).then((res) => {
        console.log("Response", res.data);
        setMovieDetail(res.data);
        setLoader(false);
      });
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleMovieDetil();
  }, []);
  return (
    <>
      <main className="min-w-max flex bg-#000 font-poppins">
        {loader && (
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
        )}
        <div>movieDetail</div>
      </main>
    </>
  );
}

const mapStateToProps = (state) => ({
  data: state.example,
});

export default connect(mapStateToProps)(movieDetail);
