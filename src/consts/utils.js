export function concenate(string, digit) {
  return string.length > digit ? string.substr(0, digit) + "..." : string;
}

export function isInTheList(lists, movie) {
  for (const item of lists) {
    const movieName =
      movie.name ?? movie.original_title ?? movie.original_name ?? movie.title;
    const itemName =
      item.name ?? item.original_title ?? item.original_name ?? item.title;
    if (item.id === movie.id || movieName === itemName) return true;
  }
  return false;
}

export function getMoviename(movie) {
  return (
    movie.name ?? movie.original_title ?? movie.original_name ?? movie.title
  );
}
