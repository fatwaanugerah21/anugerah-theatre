import React, { useEffect, useState, lazy, Suspense } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Axios from "axios";
import movieTrailer from "movie-trailer";

// import ReactPlayer from "react-player";

const ReactPlayer = lazy(() => import("react-player"));

const Section = ({
  className,
  title,
  fetchURL,
  isPotrait,
  onPlay,
  playingSection,
}) => {
  const imgURL = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]);
  const [movieTrailerLink, setMovieTrailerLink] = useState("");
  const [reactPlayerSize, setReactPlayerSize] = useState(["0", "0"]);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const [movieId, setMovieId] = useState();
  const [randomTrailerIndex, setTrailerIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      Axios.get(fetchURL).then((request) => {
        setMovies(request.data.results);
      });
    }
    fetchData();
  }, [fetchURL]);

  const playTrailer = (movieName, id) => {
    movieTrailer(`${movieName}`)
      .then((response) => {
        setMovieTrailerLink(response);
      })
      .catch((_) => {
        const otherTrailers = [
          "https://www.youtube.com/watch?v=N10PlyFoSVM",
          "https://www.youtube.com/watch?v=sscdG2ez7-E",
          "https://www.youtube.com/watch?v=I4rS15xBL1Y",
          "https://www.youtube.com/watch?v=LDV8VHbQoPI",
        ];

        setMovieTrailerLink(otherTrailers[randomTrailerIndex]);
        setTrailerIndex((randomTrailerIndex + 1) % otherTrailers.length);
      });
    setMovieId(id);
    if (!isTrailerPlaying) {
      setReactPlayerSize(["100%", "70vh"]);
      setIsTrailerPlaying(true);
      onPlay();
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
  if (title !== playingSection) {
    if (movieId) pauseTrailer();
  }
  const movieList = movies.map((movie) => {
    const movieName = movie.original_title ?? movie.original_name;
    const imgSrc =
      movie.poster_path !== null
        ? `${imgURL}${movie.poster_path}`
        : "/img/netflix_logo.svg";
    const googleSearch = `https://google.com/search?q=Watch ${movieName}`;
    return (
      <div
        className="movie-container"
        onClick={() => {
          playTrailer(movieName, movie.id);
        }}
        key={movie.id}
        id={movie.id}
        tabIndex="-1"
      >
        <div className="movie-content contain-scale-image">
          <LazyLoadImage
            offset="-400px"
            alt={movieName}
            height={isPotrait ? "420px" : "230px"}
            src={imgSrc}
            effect="blur"
            width={isPotrait ? "210px" : "150px"}
          />
          <div className={"movie-text white-text"}>
            <h4>{movieName}</h4>
            <div className="row">
              <a
                href={`https://netflix.com/search?q=${movieName}`}
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noreferrer"
              >
                <img src="/img/netflix-button-icon.svg" alt="netflix-search" />
              </a>
              <a
                href={`https://hotstar.com/in/`}
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noreferrer"
              >
                <img src="/img/hotstar-button-icon.svg" alt="hotstar-search" />
              </a>
              <a
                href={googleSearch}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                rel="noreferrer"
              >
                <img src="/img/google-icon.svg" alt="google-search" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={className} key={title}>
      <h1>{title}</h1>
      <div className={"movielist " + title}>{movieList}</div>
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
export default Section;
