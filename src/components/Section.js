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
    setMovieId(id);
    // const movieIdSelector = document.getElementById(`${id}`);
    if (reactPlayerSize[1] === "0") {
      setReactPlayerSize(["100%", "60vh"]);
      setIsTrailerPlaying(true);
      onPlay();
    } else if (reactPlayerSize[1] === "60vh" && id === movieId) {
      pauseTrailer();
    }
    movieTrailer(movieName).then((response) => {
      setMovieTrailerLink(response);
    });
  };

  function pauseTrailer() {
    if (reactPlayerSize[1] === "60vh") {
      setReactPlayerSize(["100%", "0"]);
      setIsTrailerPlaying(false);
    }
  }

  if (title !== playingSection) {
    pauseTrailer();
  }

  const movieList = movies.map((movie) => {
    const imgSrc = `${imgURL}${
      /* isPotrait
        ? movie.poster_path ?? "show-netflix-logo"
        : movie.backdrop_path ?? "show-netflix-logo" */
      "show-netflix-logo"
    }`;
    return (
      <div className="movie-container">
        <img
          key={movie.id}
          id={movie.id}
          className={isPotrait ? "portrait" : "landscape"}
          src={
            imgSrc.includes("show-netflix-logo")
              ? "/img/netflix_logo.svg"
              : imgSrc
          }
          alt={movie.original_title ?? movie.original_name}
          onClick={() =>
            playTrailer(movie.original_title ?? movie.original_name, movie.id)
          }
        />
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
