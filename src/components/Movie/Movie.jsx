import { LazyLoadImage } from "react-lazy-load-image-component";

import { w500ImgURL } from "../../consts/urls";
import { getMoviename } from "../../consts/utils";
import MediaIcon from "../MediaIcons/MediaIcons";

import "./Movie.scss";

const Movie = ({
  activeMovieId,
  movie,
  playingSection,
  title,
  className,
  onClick,
  isLarge,
}) => {
  const movieName = getMoviename(movie);
  const imgSrc = movie.poster_path
    ? `${w500ImgURL}${movie.poster_path}`
    : "/img/netflix_logo.svg";

  const extraClassName =
    activeMovieId === movie.id
      ? playingSection === title
        ? "active-movie"
        : ""
      : "";

  return (
    <div className={className} onClick={onClick} id={movie.id}>
      <div className={`${extraClassName} movie transition cursor-pointer`}>
        <LazyLoadImage
          offset="-400px"
          alt={movieName}
          height={isLarge ? "420px" : "230px"}
          src={imgSrc}
          effect="blur"
          className="movie-cover"
          width={isLarge ? "210px" : "150px"}
        />
        <div className={"movie-text absolute-center white-text"}>
          <h4>{movieName}</h4>
          <MediaIcon movieName={movieName} />
        </div>
      </div>
    </div>
  );
};
export default Movie;
