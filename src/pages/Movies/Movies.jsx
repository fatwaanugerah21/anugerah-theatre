import { lazy, useState, Suspense, useEffect } from "react";
import movieTrailer from "movie-trailer";
import { connect } from "react-redux";
import Axios from "axios";
import Loader from "react-loader-spinner";

import { otherTrailers, requestLinks } from "../../consts/urls";
import { getMoviename } from "../../consts/utils";
import { Movie } from "../../components";

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
  const [endSlice, setEndSlice] = useState(50);

  const alreadyDumpedMovies = new Map();

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
      setTrailerLink("");
    }
  }

  const lgtmMovies =
    movies &&
    movies
      .flatMap((row) => {
        return row?.flatMap((movie) => {
          if (alreadyDumpedMovies.has(movie.id)) return [];

          alreadyDumpedMovies.set(movie.id, "Is dumped");
          const movieName = getMoviename(movie);

          return isValid(movieName, searchValue) ? (
            <Movie
              movie={movie}
              onClick={() => handleClick(movieName)}
              className="movie-container"
              key={movie.id}
            />
          ) : (
            []
          );
        });
      })
      .slice(0, endSlice);

  return (
    <div className="app">
      <div className="searched-movies-contents white-text">
        {isLoading ? (
          <div className="white-text flex align-items-center">
            <h2 style={{ marginBottom: "10px", marginRight: "10px " }}>
              Loading Movies
            </h2>
            <Loader type="Oval" color="#FFF" height={25} width={25} />
          </div>
        ) : lgtmMovies.length ? (
          lgtmMovies
        ) : (
          "Film not found"
        )}
      </div>
      <Suspense fallback={<div />}>
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
