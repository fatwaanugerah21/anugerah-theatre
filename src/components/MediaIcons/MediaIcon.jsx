export default function MediaIcon({ icon, movieName }) {
  const { name, imgSrc, baseUrl } = icon;
  return (
    <a
      href={`${baseUrl}/search?q=${movieName}`}
      onClick={(e) => e.stopPropagation()}
      target="_blank"
      rel="noreferrer"
    >
      <img src={imgSrc} alt={`${name}-search-button`} />
    </a>
  );
}
