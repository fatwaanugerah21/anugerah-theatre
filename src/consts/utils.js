export function concenate(string, digit) {
  return string.length > digit ? string.substr(0, digit) + "..." : string;
}

export function getMoviename(movie) {
  return (
    movie.name ?? movie.original_title ?? movie.original_name ?? movie.title
  );
}
