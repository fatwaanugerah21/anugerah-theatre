const API_KEY = "19d7eaee255a9288a902fa6ccbc5c974";
export const baseURL = "https://api.themoviedb.org/3";
export const imgURL = "https://image.tmdb.org/t/p/original/";
export const requestLinks = {
  trending: `${baseURL}/trending/all/week?api_key=${API_KEY}&language=en_US`,
  topRated: `${baseURL}/movie/top_rated?api_key=${API_KEY}&language=en_US`,
  tvShows: `${baseURL}/discover/tv?api_key=${API_KEY}&language=en_US`,
  actionMovies: `${baseURL}/discover/movie?api_key=${API_KEY}&language=en_US&with_genres=28`,
  comedyMovies: `${baseURL}/discover/movie?api_key=${API_KEY}&language=en_US&with_genres=35`,
  horrorMovies: `${baseURL}/discover/movie?api_key=${API_KEY}&language=en_US&with_genres=27`,
  romanceMovies: `${baseURL}/discover/movie?api_key=${API_KEY}&language=en_US&with_genres=10749`,
  documentaries: `${baseURL}/discover/movie?api_key=${API_KEY}&language=en_US&with_genres=99`,
};
