/* eslint-disable jsx-a11y/anchor-is-valid */
import Axios from "axios";
import React, { useEffect, useState, Suspense, lazy } from "react";
import { connect } from "react-redux";
import movieTrailer from "movie-trailer";
import { baseImgURL, googleSearch } from "./consts";
import { MediaIcon } from "./Shared";

const ReactPlayer = lazy(() => import("react-player"));

const HeaderContent = ({
  className,
  fetchURL,
  playingSection,
  onPlay,
  setPlayingMovieId,
}) => {
  const [movie, setMovie] = useState({});
  const [trailerLink, setTrailerLink] = useState("");
  const [reactPlayerSize, setReactPlayerSize] = useState(["0", "0"]);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const movieName = movie.original_title ?? movie.original_name;

  useEffect(() => {
    async function fetchData() {
      const { data } = await Axios.get(fetchURL);
      setMovie(data.results[Math.floor(Math.random() * 20)]);
    }
    fetchData();
  }, [fetchURL]);

  const playTrailer = (movieName) => {
    onPlay();
    setPlayingMovieId(null);
    movieTrailer(movieName).then((response) => {
      setTrailerLink(response);
    });
    if (!isTrailerPlaying) {
      document.body.style.overflow = "hidden";
      const trailerContainerDOM = document.getElementById(
        "header-trailer-container"
      );
      trailerContainerDOM?.classList.add("show");
      setReactPlayerSize(["100vw", "100vh"]);
      setIsTrailerPlaying(true);
    } else if (isTrailerPlaying) {
      pauseTrailer();
    }
  };

  function getImageSrc() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    return baseImgURL + (w < h ? movie.poster_path : movie.backdrop_path);
  }

  function pauseTrailer() {
    document.body.style.overflow = "auto";
    if (isTrailerPlaying) {
      const trailerContainerDOM = document.getElementById(
        "header-trailer-container"
      );
      trailerContainerDOM?.classList.remove("show");
      setReactPlayerSize(["100vw", "0"]);
      setIsTrailerPlaying(false);
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
      <img src={getImageSrc()} alt={movie.original_title} />
      <div className="fade-bottom"></div>
      <Suspense fallback={<div></div>}>
        <div className="header-movie-info white-text">
          <h1>{movieName ? concenate(movieName, 30) : movieName}</h1>
          <p>
            {movie.overview ? concenate(movie.overview, 150) : movie.overview}
          </p>
          <div className="row ">
            <button
              className="button play"
              onClick={() => playTrailer(movieName)}
            >
              Play
            </button>
            <a
              className="button"
              href={googleSearch(movieName)}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              rel="noreferrer"
            >
              More Info
            </a>
          </div>
        </div>
        <div
          id="header-trailer-container"
          className="header-trailer p-relative"
        >
          <div className="top-bar ">
            <h2 className="white-text center-text">{movieName}</h2>
            <div className="row f-sb-ac">
              <div className="movie-provider-button">
                <MediaIcon movieName={movieName} />
              </div>
              <a
                className="close-button white-text"
                onClick={() => pauseTrailer()}
              >
                X
              </a>
            </div>
          </div>
          <Suspense callback={<div></div>}>
            <ReactPlayer
              url={trailerLink}
              width={reactPlayerSize[0]}
              height={reactPlayerSize[1]}
              playing={isTrailerPlaying}
            />
          </Suspense>
        </div>
      </Suspense>
    </div>
  );
};

function mapStateToProps(state, props) {
  return {
    activeMovieId: state.activeMovieId,
    oldActiveMovieId: state.activeMovieId,
    allMovie: state.allMovies,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    setPlayingMovieId: (id) => dispatch({ type: "NEW_ACTIVE_MOVIE", id }),
    setActiveSection: (title) =>
      dispatch({ type: "NEW_ACTIVE_SECTION", title }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContent);
