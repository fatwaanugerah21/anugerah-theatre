import { LazyLoadImage } from "react-lazy-load-image-component";
import { w500ImgURL, otherTrailers, requestLinks } from "../consts/urls";
import { isInTheList } from "../consts/utils";
import { lazy, useState, Suspense, useEffect } from "react";
import Navbar from "../shared/Navbar";
import movieTrailer from "movie-trailer";
import MediaIcon from "../shared/MediaIcon";
import { connect } from "react-redux";
import Axios from "axios";
import { getMoviename } from "./../consts/utils";
const FullscreenTrailer = lazy(() => import("../shared/FullscreenPlayer"));

const Movies = ({
  allMovies,
  searchValue,
  history,
  emptySearchRedirect,
  setPlayingMovieId,
}) => {
  const [trailerLink, setTrailerLink] = useState("");
  const [reactPlayerSize, setReactPlayerSize] = useState(["0", "0"]);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const [randomTrailerIndex, setTrailerIndex] = useState(0);
  const [movieName, setMovieName] = useState("");
  const [movies, setMovies] = useState(allMovies);
  let movieFound = false;
  let alreadyDumped = [];
  const lastItemId = "lastmoviesitem";
  const [endSlice, setEndSlice] = useState(3);

  if (!searchValue && emptySearchRedirect === "/") {
    if (history) history?.push(emptySearchRedirect);
  }

  async function fetchAllMovies() {
    const tempMovies = [];

    for (const fetchURL in requestLinks) {
      const { data } = await Axios.get(requestLinks[fetchURL]);
      tempMovies.push(data.results);
    }
    setMovies(tempMovies);
  }

  if (!movies?.length || movies?.length < 17) {
    fetchAllMovies();
  }

  useEffect(() => {
    const bottomFetch = () => {
      const windowScrollHeight =
        document.body.scrollHeight - window.pageYOffset;
      const isMdLgMobile = window.innerWidth < 768;
      if (windowScrollHeight <= 800) {
        setEndSlice((old) => {
          return old + 2 > 17 ? 17 : old + 2;
        });
      }
      if (
        (isMdLgMobile && windowScrollHeight >= 10000) ||
        (!isMdLgMobile && windowScrollHeight >= 2800)
      ) {
        setEndSlice((old) => (old - 3 >= 3 ? old - 3 : 3));
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
            <div className={"movie-text white-text"}>
              <h4>{movieName}</h4>
              <MediaIcon movieName={movieName} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  function filterMovies(movies) {
    const filteredMovies = [];
    let i = 0;
    let tempContainer = [];
    for (const row of movies) {
      for (const movie of row) {
        const movieName = getMoviename(movie);

        if (movieName.toLowerCase().includes(searchValue.toLowerCase())) {
          i++;
          if (i >= 20) {
            filteredMovies.push(tempContainer);
            tempContainer = [];
            i = 0;
          }
          tempContainer.push(movie);
        }
      }
    }
    filteredMovies.push(tempContainer);
    return filteredMovies;
  }

  const lgtmMovies =
    movies &&
    (searchValue ? filterMovies(movies) : movies)
      .slice(0, endSlice)
      .map((row) => {
        if (row.length) if (!movieFound) movieFound = true;
        return row?.map((movie) => {
          if (isInTheList(alreadyDumped, movie)) return null;
          alreadyDumped.push(movie);
          const movieName = getMoviename(movie);

          const imgSrc =
            movie.poster_path !== null
              ? `${w500ImgURL}${movie.poster_path}`
              : "/img/netflix_logo.svg";

          return createMovieDOM(movie, movieName, imgSrc);
        });
      });

  return (
    <div className="app">
      <Navbar inputValue={searchValue} />
      <div className="searched-movies-contents white-text">
        {movieFound ? lgtmMovies : "Film tidak ditemukan"}
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
