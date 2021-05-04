import Axios from "axios";
import { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import movieTrailer from "movie-trailer";
import { baseImgURL, googleSearch, w500ImgURL } from "../../../consts/urls";
import { concenate } from "../../../consts/utils";
import "./HeaderContent.scss";

const FullscreenTrailer = lazy(() =>
  import("../../../components/FullscreenPlayer/FullscreenPlayer")
);
const BigImg = lazy(() => import("./BigImg"));

const HeaderContent = ({
  className,
  fetchURL,
  setPlayingSection,
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
    setPlayingSection(null);
    setPlayingMovieId(null);
    movieTrailer(movieName).then((response) => {
      setTrailerLink(response);
    });
    if (!isTrailerPlaying) {
      document.body.style.overflow = "hidden";
      const trailerContainerDOM = document.getElementById(
        "header-trailer-container"
      );
      trailerContainerDOM.style.display = "block";
      setReactPlayerSize(["100vw", "100vh"]);
      setIsTrailerPlaying(true);
    } else if (isTrailerPlaying) {
      pauseTrailer();
    }
  };
  function getImageSrc(smallPicture = false) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    return `${smallPicture ? w500ImgURL : baseImgURL}${
      w < h ? movie.poster_path : movie.backdrop_path
    }`;
  }

  function pauseTrailer() {
    document.body.style.overflow = "auto";
    if (isTrailerPlaying) {
      setTrailerLink(null);
      const trailerContainerDOM = document.getElementById(
        "header-trailer-container"
      );
      trailerContainerDOM.style.display = "none";
      setReactPlayerSize(["100vw", "0"]);
      setIsTrailerPlaying(false);
    }
  }

  return (
    <div className={className}>
      <Suspense
        fallback={
          <img
            className="full-size"
            src={getImageSrc(true)}
            id="header-image"
            alt={movie.original_title}
          />
        }
      >
        <BigImg
          className="full-size"
          src={getImageSrc()}
          id="header-image"
          alt={movie.original_title}
        />
      </Suspense>
      <Suspense fallback={<div></div>}>
        <div className="fade-bottom"></div>
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
        <FullscreenTrailer
          movieName={movieName}
          isTrailerPlaying={isTrailerPlaying}
          reactPlayerSize={reactPlayerSize}
          trailerLink={trailerLink}
          pauseTrailer={() => pauseTrailer()}
        />
      </Suspense>
    </div>
  );
};

function mapStateToProps(state, props) {
  return {
    activeMovieId: state.activeMovieId,
    playingSection: state.playingSection,
    allMovie: state.allMovies,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    setPlayingMovieId: (id) => dispatch({ type: "NEW_ACTIVE_MOVIE", id }),
    setPlayingSection: (title) =>
      dispatch({ type: "NEW_PLAYING_SECTION", title }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContent);
