import { icons } from "./consts";
import "./MediaIcons.scss";

const MediaIcon = ({ movieName }) => {
  const mediaIcons = icons.map((icon) => {
    return <MediaIcon icon={icon} movieName={movieName} />;
  });

  return <div className="media-icons">{mediaIcons}</div>;
};
export default MediaIcon;
