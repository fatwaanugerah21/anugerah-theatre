import React, { useEffect, useState } from "react";
import Axios from "axios";
import { imgURL } from "./consts";
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
  }, []);

  const playTrailer = (movieName, id) => {
    console.log(movieName);
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
    const imgSrc = `${imgURL}${
      isPotrait
        ? movie.poster_path ?? "show-netflix-logo"
        : movie.backdrop_path ?? "show-netflix-logo"
    }`;
    const googleSearch = `https://www.google.com/search?source=hp&ei=uwnjX-ToPOOo3LUPsMaQiAw&q=Watch ${
      movie.original_title ?? movie.original_name
    }&oq=Watch ${
      movie.original_title ?? movie.original_name
    }&gs_lcp=CgZwc3ktYWIQAzIOCC4QsQMQgwEQyQMQkwIyCAgAELEDEIMBMggIABCxAxCDATIFCAAQsQMyCAgAELEDEIMBMgUIABCxAzIFCAAQsQMyAggAMgUIABCxAzIICAAQsQMQgwE6CwgAELEDEIMBEMkDOggILhCxAxCDAToFCC4QsQM6AgguUJcbWKQgYOMiaABwAHgAgAGTAYgBtgSSAQMxLjSYAQCgAQGqAQdnd3Mtd2l6&sclient=psy-ab&ved=0ahUKEwiksqOa4ePtAhVjFLcAHTAjBMEQ4dUDCAc&uact=5`;
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
          <img
            className={isPotrait ? "portrait" : "landscape"}
            src={
              imgSrc.includes("show-netflix-logo")
                ? "/img/netflix_logo.svg"
                : imgSrc
            }
            alt={movie.original_title ?? movie.original_name}
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
      <div className="movielist">{movieList}</div>
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
