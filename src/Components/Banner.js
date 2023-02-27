import React,{useState, useEffect} from "react";
import Image from "./banner.jpg";
import axios from "axios";

function Banner() {

  const [movie, setMovie] = useState([]);

  useEffect(function () {
    axios
      .get(
        "https://api.themoviedb.org/3/trending/movie/week?api_key=c7ee8fb81b5b5a537ef10f0f68bcd0c2&page=1"
      )
      .then((res) => {
        console.table(res.data.results);
        setMovie(res.data.results[0]);
      });
  },[]);

  return (
    <div
      className={`bg-[url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})] h-[40vh] md:h-[60vh] bg-center bg-cover flex items-end `}
    >
      <div className="text-xl md:text-3xl text-white p-4 bg-gray-900 bg-opacity-50 w-full flex justify-center">
        {movie.title}
      </div>
    </div>
  );
}

export default Banner;
