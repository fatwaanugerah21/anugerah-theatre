import React, { useEffect, useState } from "react";
import Axios from "axios";
import { imgURL } from "./consts";
import movieTrailer from "movie-trailer";
import ReactPlayer from "react-player";
import YouTube from "react-youtube";

const Section = ({ className, title, fetchURL, isPotrait }) => {
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
    if (reactPlayerSize[1] === "0") {
      setReactPlayerSize(["100%", "60vh"]);
      setIsTrailerPlaying(true);
    } else if (reactPlayerSize[1] === "60vh" && id === movieId) {
      setReactPlayerSize(["100%", "0"]);
      setIsTrailerPlaying(false);
      setMovieId(id);
    }
    movieTrailer(movieName).then((response) => {
      setMovieTrailerLink(response);
    });
  };

  const movieList = movies.map((movie) => {
    const imgSrc = `${imgURL}${
      isPotrait ? movie.poster_path : movie.backdrop_path
    }`;
    return (
      <div className="movie-container">
        <img
          key={movie.id}
          className={isPotrait ? "portrait" : "landscape"}
          src={imgSrc}
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
