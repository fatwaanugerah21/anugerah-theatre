import React, { useEffect, useState, useRef, lazy, Suspense } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { connect } from "react-redux";
import Axios from "axios";
import movieTrailer from "movie-trailer";
import { otherTrailers, w500ImgURL } from "../consts/urls";
import MediaIcon from "./MediaIcon";

const ReactPlayer = lazy(() => import("react-player"));

const Section = ({
  activeMovieId,
  setPlayingMovieId,
  className,
  title,
  fetchURL,
  isLarge,
  wasPlayedSection,
  setPlayingSection,
  playingSection,
  addMovieToStore,
}) => {
  const [movies, setMovies] = useState([]);
  const [movieTrailerLink, setMovieTrailerLink] = useState("");
  const [reactPlayerSize, setReactPlayerSize] = useState(["0", "0"]);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const [movieId, setMovieId] = useState();
  const isMdLgMobile = window.innerWidth < 768;
  const [endSliceIndex, setEndSliceIndex] = useState(isMdLgMobile ? 3 : 10);
  const [randomTrailerIndex, setTrailerIndex] = useState(0);
  const trailerReference = useRef(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    async function fetchData() {
      const { data } = await Axios.get(fetchURL, signal);
      setMovies(data.results);
      addMovieToStore(data.results);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchURL]);

  useEffect(() => {
    const section = document.getElementById(title + "-movielist");

    section.addEventListener("scroll", (_) => {
      const scrollValue = isMdLgMobile
        ? section.scrollWidth - section.scrollLeft
        : section.scrollHeight - section.scrollTop;
      if (
        (!isMdLgMobile && scrollValue <= 1700) ||
        (isMdLgMobile && scrollValue <= 600)
      ) {
        setEndSliceIndex((old) => (old + 4 >= 20 ? 20 : old + 4));
      }
      if (
        (!isMdLgMobile && scrollValue >= 3500) ||
        (isMdLgMobile && scrollValue >= 1500)
      ) {
        setEndSliceIndex((old) => (old - 4 <= 10 ? 10 : old - 4));
      }
    });
  }, [title, isMdLgMobile]);

  const playTrailer = (movieName, id) => {
    setPlayingMovieId(id);
    movieTrailer(`${movieName}`, { multi: true })
      .then((response) => {
        setMovieTrailerLink(
          response[Math.floor((Math.random() * 200) % response.length)]
        );
      })
      .catch((_) => {
        setMovieTrailerLink(otherTrailers[randomTrailerIndex]);
        setTrailerIndex((randomTrailerIndex + 1) % otherTrailers.length);
      });
    setPlayingSection(title);
    setMovieId(id);
    if (!isTrailerPlaying) {
      setReactPlayerSize(["100%", "70vh"]);
      setIsTrailerPlaying(true);
      trailerReference.current.scrollIntoView();
    } else if (isTrailerPlaying && id === movieId) {
      pauseTrailer();
    }
  };

  function pauseTrailer() {
    if (isTrailerPlaying) {
      setReactPlayerSize(["100%", "0"]);
      setIsTrailerPlaying(false);
    }
  }
  if (title === wasPlayedSection && wasPlayedSection !== playingSection) {
    if (movieId) pauseTrailer();
  }

  const movieList = movies.slice(0, endSliceIndex).map((movie) => {
    const movieName = movie.original_title ?? movie.original_name;
    const imgSrc =
      movie.poster_path !== undefined
        ? `${w500ImgURL}${movie.poster_path}`
        : "/img/netflix_logo.svg";
    return (
      <div
        className={`movie-container ${
          activeMovieId === movie.id && playingSection === title
            ? "active-movie"
            : ""
        }`}
        onClick={() => {
          playTrailer(movieName, movie.id);
        }}
        key={movie.id}
        id={movie.id}
        tabIndex={-1}
      >
        <div className="movie-content contain-scale-image">
          <LazyLoadImage
            offset="-400px"
            alt={movieName}
            height={isLarge ? "420px" : "230px"}
            src={imgSrc}
            effect="blur"
            width={isLarge ? "210px" : "150px"}
          />
          <div className={"movie-text white-text"}>
            <h4>{movieName}</h4>
            <MediaIcon movieName={movieName} />
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={className} key={title}>
      <h1 ref={trailerReference}>{title}</h1>
      <div id={title + "-movielist"} className={"movielist " + title}>
        {movieList}
      </div>
      <div className="showTrailer">
        <Suspense fallback={<div></div>}>
          <ReactPlayer
            url={movieTrailerLink}
            width={reactPlayerSize[0]}
            height={reactPlayerSize[1]}
            playing={isTrailerPlaying}
            controls
          />
        </Suspense>
      </div>
    </div>
  );
};
function mapStateToProps(state, props) {
  return {
    activeMovieId: state.activeMovieId,
    wasPlayedSection: state.wasPlayedSection,
    playingSection: state.playingSection,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    setPlayingSection: (title) =>
      dispatch({ type: "NEW_PLAYING_SECTION", title }),
    setPlayingMovieId: (id) => dispatch({ type: "NEW_ACTIVE_MOVIE", id }),
    addMovieToStore: (movies) => dispatch({ type: "ADD_NEW_MOVIES", movies }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Section);
