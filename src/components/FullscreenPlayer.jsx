import { lazy, Suspense } from "react";

const ReactPlayer = lazy(() => import("react-player"));
const MediaIcon = lazy(() => import("./MediaIcon"));

const FullscreenTrailer = ({
  trailerLink,
  movieName,
  reactPlayerSize,
  isTrailerPlaying,
  pauseTrailer,
}) => {
  return (
    <div id="header-trailer-container" className="header-trailer p-relative">
      <Suspense fallback={<div></div>}>
        <div className="top-bar ">
          <h2 className="white-text center-text">{movieName}</h2>
          <div className="row f-sb-ac">
            <div className="movie-provider-button">
              <MediaIcon movieName={movieName} />
            </div>
            <button
              className="close-button white-text"
              onClick={() => pauseTrailer()}
            >
              X
            </button>
          </div>
        </div>

        <ReactPlayer
          url={trailerLink}
          width={reactPlayerSize[0]}
          height={reactPlayerSize[1]}
          playing={isTrailerPlaying}
          controls
        />
      </Suspense>
    </div>
  );
};

export default FullscreenTrailer;
