import { useEffect, useState, useRef, lazy, Suspense } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { connect } from "react-redux";
import Axios from "axios";
import movieTrailer from "movie-trailer";

import { otherTrailers } from "../../../consts/urls";
import { getMoviename } from "../../../consts/utils";

import "./Section.scss";

const ReactPlayer = lazy(() => import("react-player"));
const Movie = lazy(() => import("../../../components/Movie/Movie"));

const Section = ({
  activeMovieId,
  setPlayingMovieId,
  className,
  title,
  fetchURL,
  isLarge,
  wasPlayedSection,
  setPlayingSection,
  playingSection,
  addMovieToStore,
}) => {
  const [movies, setMovies] = useState([]);
  const [movieTrailerLink, setMovieTrailerLink] = useState("");
  const [reactPlayerSize, setReactPlayerSize] = useState(["0", "0"]);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const [movieId, setMovieId] = useState();
  const [randomTrailerIndex, setTrailerIndex] = useState(0);

  const trailerReference = useRef(null);
  const movieListRef = useRef(null);

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchData() {
      const { data } = await Axios.get(fetchURL, {
        signal: abortController.signal,
      });
      setMovies(data.results);
      addMovieToStore({ id: title, movies: data.results });
    }
    fetchData();
    return abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchURL]);

  const playTrailer = (movieName, id) => {
    setPlayingMovieId(id);
    movieTrailer(`${movieName}`, { multi: true })
      .then((response) => {
        setMovieTrailerLink(
          response[Math.floor((Math.random() * 200) % response.length)]
        );
        movieListRef.current.style.overflow = "hidden";
        console.log(movieListRef.current);
      })
      .catch((_) => {
        setMovieTrailerLink(otherTrailers[randomTrailerIndex]);
        setTrailerIndex((randomTrailerIndex + 1) % otherTrailers.length);
      });
    setPlayingSection(title);
    setMovieId(id);
    if (!isTrailerPlaying) {
      setReactPlayerSize(["100%", "70vh"]);
      setIsTrailerPlaying(true);
      trailerReference.current.scrollIntoView();
    } else if (isTrailerPlaying && id === movieId) {
      pauseTrailer();
    }
  };

  function pauseTrailer() {
    movieListRef.current.style.overflow = "auto";

    if (isTrailerPlaying) {
      setMovieTrailerLink(null);
      setReactPlayerSize(["100%", "0"]);
      setIsTrailerPlaying(false);
    }
  }

  if (title === wasPlayedSection && wasPlayedSection !== playingSection) {
    if (movieId) pauseTrailer();
  }

  const movieList = movies.map((movie) => {
    return (
      <Movie
        className="movie-container"
        movie={movie}
        activeMovieId={activeMovieId}
        isLarge={isLarge}
        key={movie.id}
        onClick={() => playTrailer(getMoviename(movie), movie.id)}
        playingSection={playingSection}
        title={title}
      />
    );
  });

  return (
    <div className={className} key={title}>
      <h1 ref={trailerReference}>{title}</h1>
      <Suspense fallback={<div></div>}>
        <div
          ref={movieListRef}
          id={title + "-movielist"}
          className={"movielist " + title}
        >
          {movieList}
        </div>

        <div className="showTrailer">
          <ReactPlayer
            url={movieTrailerLink}
            width={reactPlayerSize[0]}
            height={reactPlayerSize[1]}
            playing={isTrailerPlaying}
            controls
          />
        </div>
      </Suspense>
    </div>
  );
};
function mapStateToProps(state, _) {
  return {
    activeMovieId: state.activeMovieId,
    wasPlayedSection: state.wasPlayedSection,
    playingSection: state.playingSection,
  };
}

function mapDispatchToProps(dispatch, _) {
  return {
    setPlayingSection: (title) =>
      dispatch({ type: "NEW_PLAYING_SECTION", title }),
    setPlayingMovieId: (id) => dispatch({ type: "NEW_ACTIVE_MOVIE", id }),
    addMovieToStore: (data) => dispatch({ type: "ADD_NEW_MOVIES", data }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Section);
