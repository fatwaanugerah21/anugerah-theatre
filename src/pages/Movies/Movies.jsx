import { lazy, useState, Suspense, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import movieTrailer from "movie-trailer";
import { connect } from "react-redux";
import Axios from "axios";

import { w500ImgURL, otherTrailers, requestLinks } from "../../consts/urls";
import { getMoviename, isInTheList } from "../../consts/utils";
import { Navbar, MediaIcon } from "../../components";

import "./Movies.scss";

const FullscreenTrailer = lazy(() =>
  import("../../components/FullscreenPlayer/FullscreenPlayer")
);

const Movies = ({
  allMovies,
  searchValue,
  history,
  emptySearchRedirect,
  setPlayingMovieId,
}) => {
  const [trailerLink, setTrailerLink] = useState("");
  const [reactPlayerSize, setReactPlayerSize] = useState(["0", "0"]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const [randomTrailerIndex, setTrailerIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [movieName, setMovieName] = useState("");
  const [movies, setMovies] = useState(allMovies);
  let alreadyDumped = [];
  const lastItemId = "lastmoviesitem";
  const [endSlice, setEndSlice] = useState(50);

  if (!searchValue && emptySearchRedirect === "/") {
    if (history) history?.push(emptySearchRedirect);
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", () => handleResize());
    return window.removeEventListener("resize", handleResize());
  });

  async function fetchAllMovies() {
    const tempMovies = [];

    for (const fetchURL in requestLinks) {
      const { data } = await Axios.get(requestLinks[fetchURL]);
      tempMovies.push(data.results);
    }
    setMovies(tempMovies);
    setIsLoading(false);
  }

  if (!movies?.length || movies?.length < 17) {
    fetchAllMovies();
  }

  function isValid(moviename, searchValue) {
    if (!searchValue) return true;
    return moviename.toLowerCase().includes(searchValue.toLowerCase());
  }

  useEffect(() => {
    const bottomFetch = () => {
      const windowScrollHeight =
        document.body.scrollHeight - window.pageYOffset;
      if (windowScrollHeight <= 1200) {
        setEndSlice((old) => Math.min(340, old + 50));
      }
      if (
        (isMobile && windowScrollHeight >= 10000) ||
        (!isMobile && windowScrollHeight >= 2800)
      ) {
        setEndSlice((old) => Math.max(50, old - 50));
      }
    };
    window.addEventListener("scroll", () => bottomFetch());
    return window.removeEventListener("scroll", () => bottomFetch());
  });

  function handleClick(movieName) {
    setPlayingMovieId(null);
    movieTrailer(movieName)
      .then((response) => {
        setTrailerLink(response);
      })
      .catch((_) => {
        setTrailerLink(otherTrailers[randomTrailerIndex]);
        setTrailerIndex((randomTrailerIndex + 1) % otherTrailers.length);
      });
    if (!isTrailerPlaying) {
      document.body.style.overflow = "hidden";
      const trailerContainerDOM = document.getElementById(
        "header-trailer-container"
      );
      trailerContainerDOM.style.display = "block";
      setMovieName(movieName);
      setReactPlayerSize(["100vw", "95vh"]);
      setIsTrailerPlaying(true);
    } else if (isTrailerPlaying) {
      pauseTrailer();
    }
  }

  function pauseTrailer() {
    document.body.style.overflow = "auto";
    if (isTrailerPlaying) {
      const trailerContainerDOM = document.getElementById(
        "header-trailer-container"
      );
      trailerContainerDOM.style.display = "none";
      setReactPlayerSize(["100vw", "0"]);
      setIsTrailerPlaying(false);
    }
  }

  function createMovieDOM(movie, movieName, imgSrc, isLast) {
    return (
      <div
        className="movie"
        key={movie.id}
        id={isLast ? lastItemId : movieName}
        onClick={() => handleClick(movieName)}
        tabIndex={-1}
      >
        <div className="movie-container" key={movie.id} id={movie.id}>
          <div className="movie-content contain-scale-image">
            <LazyLoadImage
              offset="-400px"
              alt={movieName}
              height={"230px"}
              src={imgSrc}
              effect="blur"
              width={"150px"}
            />
            <div className={"movie-text absolute-center white-text"}>
              <h4>{movieName}</h4>
              <MediaIcon movieName={movieName} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const lgtmMovies =
    movies &&
    movies
      .flatMap((row) => {
        return row?.flatMap((movie) => {
          if (isInTheList(alreadyDumped, movie)) return [];
          alreadyDumped.push(movie);
          const movieName = getMoviename(movie);
          const imgSrc =
            movie.poster_path !== null
              ? `${w500ImgURL}${movie.poster_path}`
              : "/img/netflix_logo.svg";

          return isValid(movieName, searchValue)
            ? createMovieDOM(movie, movieName, imgSrc)
            : [];
        });
      })
      .slice(0, endSlice);
  return (
    <div className="app">
      <div className="searched-movies-contents white-text">
        {isLoading ? (
          <div className="white-text">Loading ...</div>
        ) : lgtmMovies.length ? (
          lgtmMovies
        ) : (
          "Film tidak ditemukan"
        )}
      </div>
      <Suspense fallback={<div></div>}>
        <FullscreenTrailer
          isTrailerPlaying={isTrailerPlaying}
          movieName={movieName}
          reactPlayerSize={reactPlayerSize}
          trailerLink={trailerLink}
          pauseTrailer={() => pauseTrailer()}
        />
      </Suspense>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    allMovies: state.allMovies,
    searchValue: state.searchValue,
    emptySearchRedirect: state.emptySearchRedirect,
  };
};
function mapDispatchToProps(dispatch, _) {
  return {
    setEmptySearchRedirect: (input) =>
      dispatch({ type: "SET_EMPTY_SEARCH_REDIRECT", input }),
    setPlayingMovieId: (id) => dispatch({ type: "NEW_ACTIVE_MOVIE", id }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Movies);
