import Axios from "axios";
import React, { useEffect, useState } from "react";
import { imgURL } from "./consts";
import movieTrailer from "movie-trailer";
import ReactPlayer from "react-player";
const HeaderContent = ({ className, fetchURL }) => {
  const [movie, setMovie] = useState({});
  const [trailerLink, setTrailerLink] = useState("");
  const [reactPlayerSize, setReactPlayerSize] = useState(["0", "0"]);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const [playText, setPlayText] = useState("Play");

  useEffect(() => {
    async function fetchData() {
      await Axios.get(fetchURL).then((request) => {
        setMovie(request.data.results[Math.floor(Math.random() * 20)]);
      });
    }
    fetchData();
  }, []);

  const playTrailer = (movieName) => {
    console.log("run");
    const movieTrailerContainer = document.querySelector(".header-trailer");
    if (reactPlayerSize[0] === "0") {
      setReactPlayerSize(["100%", "80vh"]);
      movieTrailerContainer.style.width = "100%";
      setIsTrailerPlaying(true);
      setPlayText("Pause");
    } else {
      setReactPlayerSize(["0", "0"]);
      movieTrailerContainer.style.width = "0";
      setIsTrailerPlaying(false);
      setPlayText("Play");
    }
    movieTrailer(movieName).then((response) => {
      setTrailerLink(response);
    });
  };

  function concenate(string, digit) {
    return string.length > digit ? string.substr(0, digit) + "..." : string;
  }

  return (
    <div className={className}>
      <img src={`${imgURL}${movie.backdrop_path}`} alt={movie.original_title} />
      <div className="fade-bottom"></div>
      <div className="header-movie-info white-text">
        <h1>
          {movie.original_title ?? movie.original_name
            ? concenate(movie.original_title ?? movie.original_name, 30)
            : movie.original_title ?? movie.original_name}
        </h1>
        <p>
          {movie.overview ? concenate(movie.overview, 150) : movie.overview}
        </p>
        <div className="row ">
          <button
            onClick={() =>
              playTrailer(movie.original_name ?? movie.original_title)
            }
          >
            {playText}
          </button>
          <button>More Info</button>
        </div>
      </div>
      <div className="header-trailer p-relative">
        <ReactPlayer
          url={trailerLink}
          width={reactPlayerSize[0]}
          height={reactPlayerSize[1]}
          playing={isTrailerPlaying}
          controls
        />
      </div>
    </div>
  );
};
export default HeaderContent;
