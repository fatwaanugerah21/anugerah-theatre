const API_KEY = "19d7eaee255a9288a902fa6ccbc5c974";
export const baseURL = "https://api.themoviedb.org/3";
export const requestLinks = {
  trending: `${baseURL}/trending/all/week?api_key=${API_KEY}&language=en_US`,
  topRated: `${baseURL}/movie/top_rated?api_key=${API_KEY}&language=en_US`,
  tvShows: `${baseURL}/discover/tv?api_key=${API_KEY}&language=en_US`,
  actionMovies: `${baseURL}/discover/movie?api_key=${API_KEY}&language=en_US&with_genres=28`,
  animationMovies: `${baseURL}/discover/movie?api_key=${API_KEY}&language=en_US&with_genres=16`,
  comedyMovies: `${baseURL}/discover/movie?api_key=${API_KEY}&language=en_US&with_genres=35`,
  crimeMovies: `${baseURL}/discover/movie?api_key=${API_KEY}&language=en_US&with_genres=80`,
  dramaMovies: `${baseURL}/discover/movie?api_key=${API_KEY}&language=en_US&with_genres=18`,
  familyMovies: `${baseURL}/discover/movie?api_key=${API_KEY}&language=en_US&with_genres=10751`,
  fantasyMovies: `${baseURL}/discover/movie?api_key=${API_KEY}&language=en_US&with_genres=14`,
  historyMovies: `${baseURL}/discover/movie?api_key=${API_KEY}&language=en_US&with_genres=36`,
  scienceFictionMovies: `${baseURL}/discover/movie?api_key=${API_KEY}&language=en_US&with_genres=878`,
  warMovies: `${baseURL}/discover/movie?api_key=${API_KEY}&language=en_US&with_genres=10752`,
  westernMovies: `${baseURL}/discover/movie?api_key=${API_KEY}&language=en_US&with_genres=37`,
  horrorMovies: `${baseURL}/discover/movie?api_key=${API_KEY}&language=en_US&with_genres=27`,
  romanceMovies: `${baseURL}/discover/movie?api_key=${API_KEY}&language=en_US&with_genres=10749`,
  documentaries: `${baseURL}/discover/movie?api_key=${API_KEY}&language=en_US&with_genres=99`,
};

export const googleSearch = (movieName) => {
  return `https://google.com/search?q=Watch ${movieName}`;
};

export const baseImgURL = "https://image.tmdb.org/t/p/original/";
export const w500ImgURL = "https://image.tmdb.org/t/p/w300/";

export const otherTrailers = [
  "https://www.youtube.com/watch?v=N10PlyFoSVM",
  "https://www.youtube.com/watch?v=sscdG2ez7-E",
  "https://www.youtube.com/watch?v=I4rS15xBL1Y",
  "https://www.youtube.com/watch?v=LDV8VHbQoPI",
];

export const allNavLinks = [
  { name: "Home", href: "/", emptySearchRedirect: "/" },
  {
    name: "TV Shows",
    href: "movies",
    emptySearchRedirect: "/movies",
    onlyDisplay: true,
  },
  { name: "Movies", href: "/movies", emptySearchRedirect: "/movies" },
  {
    name: "Latest",
    href: "movies",
    emptySearchRedirect: "/movies",
    onlyDisplay: true,
  },
  {
    name: "My List",
    href: "movies",
    emptySearchRedirect: "/movies",
    onlyDisplay: true,
  },
];

export const navNames = {
  "/": "Home",
  "/movies": "Movies",
};
