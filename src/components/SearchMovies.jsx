import { LazyLoadImage } from "react-lazy-load-image-component";
import { w500ImgURL, otherTrailers } from "./consts";
import { useState } from "react";
import Navbar from "./Navbar";
import { FullscreenTrailer } from "./Shared";
import movieTrailer from "movie-trailer";
import { MediaIcon } from "./Shared";
import { connect } from "react-redux";

const SearchMovies = ({ mustContains, setMustContains, allMovies }) => {
  const [trailerLink, setTrailerLink] = useState("");
  const [reactPlayerSize, setReactPlayerSize] = useState(["0", "0"]);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const [randomTrailerIndex, setTrailerIndex] = useState(0);
  const [movieName, setMovieName] = useState("");
  const [alreadyDumped, setAlreadyDumped] = useState([]);

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

  const lgtmMovies = allMovies.map((movie, index) => {
    const movieName = movie.name;
    if (movieName?.includes(mustContains)) {
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
    } else return null;
  });
  return (
    <div className="app">
      <Navbar
        inputValue={mustContains}
        autoFocus
        setSearchedMovies={(title) => {
          setMustContains(title);
        }}
      />
      <div className="searched-movies-contents">{lgtmMovies}</div>
      <FullscreenTrailer
        isTrailerPlaying={isTrailerPlaying}
        movieName={movieName}
        reactPlayerSize={reactPlayerSize}
        trailerLink={trailerLink}
        pauseTrailer={() => pauseTrailer()}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    allMovies: state.allMovies,
  };
};

export default connect(mapStateToProps)(SearchMovies);
