import { useEffect, useState, useRef, lazy, Suspense } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { connect } from "react-redux";
import Axios from "axios";
import movieTrailer from "movie-trailer";
import { otherTrailers } from "../../consts/urls";
import "./Section.scss";

const ReactPlayer = lazy(() => import("react-player"));
const Movie = lazy(() => import("../Movie/Movie"));

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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [endSliceIndex, setEndSliceIndex] = useState(isMobile ? 3 : 10);
  const [randomTrailerIndex, setTrailerIndex] = useState(0);
  const trailerReference = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const { data } = await Axios.get(fetchURL);
      setMovies(data.results);
      addMovieToStore({ id: title, movies: data.results });
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchURL]);

  useEffect(() => {
    const section = document.getElementById(title + "-movielist");

    section.addEventListener("scroll", (_) => {
      const scrollValue = isMobile
        ? section.scrollWidth - section.scrollLeft
        : section.scrollHeight - section.scrollTop;
      if (
        (!isMobile && scrollValue <= 1700) ||
        (isMobile && scrollValue <= 1000)
      )
        setEndSliceIndex((old) => (old + 4 >= 20 ? 20 : old + 4));
      if (
        (!isMobile && scrollValue >= 3500) ||
        (isMobile && scrollValue >= 2000)
      )
        setEndSliceIndex((old) => (old - 4 <= 10 ? 10 : old - 4));
    });
  }, [title, isMobile]);

  // Listening to windows resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setEndSliceIndex(isMobile ? 3 : 10);
    };

    window.addEventListener("resize", () => handleResize());
    return window.removeEventListener("resize", () => handleResize());
  });

  const playTrailer = (movieName, id) => {
    setPlayingMovieId(id);
    movieTrailer(`${movieName}`, { multi: true })
      .then((response) => {
        setMovieTrailerLink(
          response[Math.floor((Math.random() * 200) % response.length)]
        );
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
    if (isTrailerPlaying) {
      setReactPlayerSize(["100%", "0"]);
      setIsTrailerPlaying(false);
    }
  }

  if (title === wasPlayedSection && wasPlayedSection !== playingSection) {
    if (movieId) pauseTrailer();
  }

  const movieList = movies.slice(0, endSliceIndex).map((movie) => {
    return (
      <Movie
        className="movie-container"
        movie={movie}
        activeMovieId={activeMovieId}
        isLarge={isLarge}
        key={movie.id}
        playTrailer={(movieName, id) => playTrailer(movieName, id)}
        playingSection={playingSection}
        title={title}
      />
    );
  });

  return (
    <div className={className} key={title}>
      <h1 ref={trailerReference}>{title}</h1>
      <Suspense fallback={<div></div>}>
        <div id={title + "-movielist"} className={"movielist " + title}>
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
function mapStateToProps(state, props) {
  return {
    activeMovieId: state.activeMovieId,
    wasPlayedSection: state.wasPlayedSection,
    playingSection: state.playingSection,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    setPlayingSection: (title) =>
      dispatch({ type: "NEW_PLAYING_SECTION", title }),
    setPlayingMovieId: (id) => dispatch({ type: "NEW_ACTIVE_MOVIE", id }),
    addMovieToStore: (data) => dispatch({ type: "ADD_NEW_MOVIES", data }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Section);
