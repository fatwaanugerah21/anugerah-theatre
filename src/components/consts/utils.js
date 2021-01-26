export function concenate(string, digit) {
  return string.length > digit ? string.substr(0, digit) + "..." : string;
}

export function isInTheList(lists, movie) {
  for (const item of lists) {
    if (item.id === movie.id) return true;
  }
  return false;
}
