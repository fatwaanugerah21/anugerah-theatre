import { icons } from "./consts";
import MediaIcon from "./MediaIcon";
import "./MediaIcons.scss";

const MediaIcons = ({ movieName }) => {
  const mediaIcons = icons.map((icon) => {
    return (
      <MediaIcon
        icon={icon}
        movieName={movieName}
        key={`Media-icon${icon.name}`}
      />
    );
  });

  return <div className="media-icons">{mediaIcons}</div>;
};
export default MediaIcons;
