import { googleSearch } from "../../consts/urls";
import "./MediaIcon.scss";

const MediaIcon = ({ movieName }) => {
  return (
    <div className="row media-icon">
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
        href={googleSearch(movieName)}
        target="_blank"
        onClick={(e) => e.stopPropagation()}
        rel="noreferrer"
      >
        <img src="/img/google-icon.svg" alt="google-search" />
      </a>
    </div>
  );
};
export default MediaIcon;
