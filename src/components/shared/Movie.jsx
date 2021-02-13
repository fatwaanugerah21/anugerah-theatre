import { LazyLoadImage } from "react-lazy-load-image-component";
import MediaIcon from "./MediaIcon";
import { w500ImgURL } from "./../consts/urls";

const Movie = ({
  activeMovieId,
  movie,
  playingSection,
  title,
  playTrailer,
  isLarge,
  key,
}) => {
  const movieName = movie.original_title ?? movie.original_name;
  const imgSrc =
    movie.poster_path !== undefined
      ? `${w500ImgURL}${movie.poster_path}`
      : "/img/netflix_logo.svg";
  return (
    <div
      key={key}
      className={`movie-container ${
        activeMovieId === movie.id && playingSection === title
          ? "active-movie"
          : ""
      }`}
      onClick={() => {
        playTrailer(movieName, movie.id);
      }}
      id={movie.id}
    >
      <div className="movie-content contain-scale-image">
        <LazyLoadImage
          offset="-400px"
          alt={movieName}
          height={isLarge ? "420px" : "230px"}
          src={imgSrc}
          effect="blur"
          width={isLarge ? "210px" : "150px"}
        />
        <div className={"movie-text white-text"}>
          <h4>{movieName}</h4>
          <MediaIcon movieName={movieName} />
        </div>
      </div>
    </div>
  );
};
export default Movie;
