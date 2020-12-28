import Axios from "axios";
import React, { useEffect, useState, Suspense } from "react";
import movieTrailer from "movie-trailer";
import ReactPlayer from "react-player";

const HeaderContent = ({ className, fetchURL, playingSection, onPlay }) => {
  const baseImgURL = "https://image.tmdb.org/t/p/original/";

  const [movie, setMovie] = useState({});
  const [trailerLink, setTrailerLink] = useState("");
  const [reactPlayerSize, setReactPlayerSize] = useState(["0", "0"]);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const [playText, setPlayText] = useState("Play");
  const googleSearch = `https://www.google.com/search?source=hp&ei=uwnjX-ToPOOo3LUPsMaQiAw&q=${
    movie.original_title ?? movie.original_name
  }`;
  useEffect(() => {
    async function fetchData() {
      await Axios.get(fetchURL).then((request) => {
        setMovie(request.data.results[Math.floor(Math.random() * 20)]);
      });
    }
    fetchData();
  }, [fetchURL]);

  const playTrailer = (movieName) => {
    onPlay();
    movieTrailer(movieName).then((response) => {
      setTrailerLink(response);
    });
    if (reactPlayerSize[1] === "0") {
      setReactPlayerSize(["70vw", "96vh"]);
      setIsTrailerPlaying(true);
      setPlayText("Pause");
    } else if (reactPlayerSize[1] === "96vh") {
      pauseTrailer();
    }
  };

  function pauseTrailer() {
    if (reactPlayerSize[1] === "96vh") {
      setReactPlayerSize(["100vw", "0"]);
      setIsTrailerPlaying(false);
      setPlayText("Play");
    }
  }

  if ("Header" !== playingSection) {
    pauseTrailer();
  }

  function concenate(string, digit) {
    return string.length > digit ? string.substr(0, digit) + "..." : string;
  }

  return (
    <div className={className}>
      <img
        src={movie.backdrop_path ? `${baseImgURL}${movie.backdrop_path}` : ""}
        alt={movie.original_title}
      />
      <div className="fade-bottom"></div>
      <Suspense fallback={<div></div>}>
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
              className="button play"
              onClick={() =>
                playTrailer(movie.original_name ?? movie.original_title)
              }
            >
              {playText}
            </button>
            <a
              className="button"
              href={googleSearch}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              rel="noreferrer"
            >
              More Info
            </a>
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
      </Suspense>
    </div>
  );
};
export default HeaderContent;
