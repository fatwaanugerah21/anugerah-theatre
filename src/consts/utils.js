import { useLocation } from "react-router-dom";

export function concenate(string, digit) {
  return string.length > digit ? string.substr(0, digit) + "..." : string;
}

export function generateKey(dataOf = "data") {
  return `${dataOf}-${Math.random().toString(22)}`;
}

export function getMoviename(movie) {
  return (
    movie.name ?? movie.original_title ?? movie.original_name ?? movie.title
  );
}

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}
