import { LazyLoadImage } from "react-lazy-load-image-component";
import { w500ImgURL, otherTrailers, requestLinks } from "../consts/urls";
import { lazy, useState, Suspense } from "react";
import Navbar from "../shared/Navbar";
import movieTrailer from "movie-trailer";
import MediaIcon from "../shared/MediaIcon";
import { connect } from "react-redux";
import Axios from "axios";

const FullscreenTrailer = lazy(() => import("../shared/FullscreenPlayer"));

const Movies = ({ allMovies, searchValue }) => {
  const [trailerLink, setTrailerLink] = useState("");
  const [reactPlayerSize, setReactPlayerSize] = useState(["0", "0"]);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const [randomTrailerIndex, setTrailerIndex] = useState(0);
  const [movieName, setMovieName] = useState("");
  const [movies, setMovies] = useState(allMovies);
  let alreadyDumped = [];

  async function fetchAllMovies() {
    console.log("Fetching");
    const tempMovies = [];
    for (const fetchURL in requestLinks) {
      const { data } = await Axios.get(requestLinks[fetchURL]);

      for (let i = 0; i < data.results.length; i++) {
        tempMovies.push(data.results[i]);
      }
      setMovies(tempMovies);
    }
  }

  if (!movies) {
    fetchAllMovies();
  }

  if (searchValue) console.log("Sesuatu");

  function handleClick(movieName) {
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

  function isInTheList(lists, movie) {
    for (const item of lists) {
      if (item.id === movie.id) return true;
    }
    return false;
  }

  const lgtmMovies =
    movies &&
    movies.map((movie) => {
      const movieName =
        movie.name ??
        movie.original_title ??
        movie.original_name ??
        movie.title;
      if (isInTheList(alreadyDumped, movie)) return null;
      alreadyDumped.push(movie);
      const imgSrc =
        movie.poster_path !== undefined
          ? `${w500ImgURL}${movie.poster_path}`
          : "/img/netflix_logo.svg";
      return (
        <div
          className="movie"
          key={movie.id}
          onClick={() => handleClick(movieName)}
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
    });

  return (
    <div className="app">
      <Navbar inputValue={searchValue} />
      <div className="searched-movies-contents white-text">{lgtmMovies}</div>
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
  };
};

export default connect(mapStateToProps)(Movies);
