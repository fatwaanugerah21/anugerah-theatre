import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Axios from "axios";
// import { imgURL } from "./consts";
import movieTrailer from "movie-trailer";
import ReactPlayer from "react-player";

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
      .catch((_) =>
        setMovieTrailerLink("https://www.youtube.com/watch?v=sscdG2ez7-E")
      );
    setMovieId(id);
    if (!isTrailerPlaying) {
      setReactPlayerSize(["100%", "60vh"]);
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
    const imgSrc =
      movie.poster_path ?? movie.backdrop_path
        ? `${imgURL}${isPotrait ? movie.poster_path : movie.backdrop_path}`
        : "/img/netflix_logo.svg";
    const googleSearch = `https://google.com/search?q=${
      movie.original_title ?? movie.original_name
    }`;
    return (
      <div
        className="movie-container"
        onClick={() => {
          playTrailer(movie.original_title ?? movie.original_name, movie.id);
        }}
        key={movie.id}
        id={movie.id}
      >
        <div className="movie-content">
          <LazyLoadImage
            is="lazyload-image"
            offset="200px"
            alt={movie.original_title ?? movie.original_name}
            height={isPotrait ? "250px" : "140px"}
            src={imgSrc}
            effect="blur"
            width={isPotrait ? "300px" : "200px"}
          />
          <div className="movie-text white-text">
            <h4>{movie.original_title ?? movie.original_name}</h4>
            <div className="row">
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
        </div>
      </div>
    );
  });

  return (
    <div className={className} key={title}>
      <h1>{title}</h1>
      <div className={"movielist " + title}>{movieList}</div>
      <div className="showTrailer">
        <ReactPlayer
          url={movieTrailerLink}
          width={reactPlayerSize[0]}
          height={reactPlayerSize[1]}
          playing={isTrailerPlaying}
          controls
        />
      </div>
    </div>
  );
};
export default Section;
