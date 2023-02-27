import React, { useState, useEffect } from "react";
import Image from "./banner.jpg";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import Pagination from "./Pagination";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hover, setHover] = useState("");
  const [favourites, setFavourites] = useState([]);

  function goBack() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function goAhead() {
    setPage(page + 1);
  }

  useEffect(
    function () {
        // get data from local storage and sets in favourites
        let oldFav = localStorage.getItem("imdb");
        oldFav = JSON.parse(oldFav) || [];
        setFavourites([...oldFav])

        // get data from tmdb api
      axios
        .get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=c7ee8fb81b5b5a537ef10f0f68bcd0c2&page=${page}`
        )
        .then((res) => {
          console.table(res.data.results);
          setMovies(res.data.results);
        });
    },
    [page]
  );

  let add = (movie) => {
    let newArray = [...favourites, movie];
    setFavourites([...newArray]);
    // console.log(newArray);
    localStorage.setItem("imdb",JSON.stringify(newArray))
  };

  let del = (movie) => {
    let newArray =  favourites.filter((m)=> m.id!=movie.id)
    setFavourites([...newArray])
    localStorage.setItem("imdb",JSON.stringify(newArray))
  }

  return (
    <div className="mb-8">
      <div className="mt-8 mb-8 font-bold text-2xl text-center">
        Trending Movies
      </div>

      {movies.length == 0 ? (
        <div className="flex justify-center">
          <Oval
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {movies.map((movie) => (
            <div
              className={`
          bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})]
          md:h-[30vh] md:w-[250px]
          h-[25vh] w-[150px]
          bg-center bg-cover 
          rounded-xl 
          flex
          items-end
          m-4
          hover:scale-110 
          ease-out duration-300
          relative
        `}
              onMouseEnter={() => {
                setHover(movie.id);
              }}
              onMouseLeave={() => setHover("")}
            >
              {hover == movie.id && (
                <>
                  {
                  !favourites.find((m) => m.id == movie.id) ? (
                    <div
                      className="absolute top-2 right-2 p-2 bg-gray-800 rounded-xl text-xl cursor-pointer"
                      onClick={() => add(movie)}
                    >
                      😍
                    </div>
                  ) : (
                    <div
                      className="absolute top-2 right-2 p-2 bg-gray-800 rounded-xl text-xl cursor-pointer"
                      onClick={() => del(movie)}
                    >
                      ❌
                    </div>
                  )
                  }
                </>
              )}

              <div className="w-full bg-gray-900 text-white py-2 text-center rounded-b-xl font-bold">
                {movie.title}
              </div>
            </div>
          ))}
        </div>
      )}
      <Pagination pageProp={page} goBack={goBack} goAhead={goAhead} />
    </div>
  );
}

export default Movies;
