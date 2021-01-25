import { requestLinks } from "./urls";

export const allSections = [
  {
    title: "Netflix Original",
    isLarge: true,
    fetchURL: requestLinks.tvShows,
  },
  {
    title: "Trending",
    isLarge: false,
    fetchURL: requestLinks.trending,
  },
  {
    title: "Top Rated",
    isLarge: false,
    fetchURL: requestLinks.topRated,
  },
  {
    title: "Action & Adventure",
    isLarge: false,
    fetchURL: requestLinks.actionMovies,
  },
  {
    title: "Comedies",
    isLarge: false,
    fetchURL: requestLinks.comedyMovies,
  },
  {
    title: "Crime",
    isLarge: false,
    fetchURL: requestLinks.crimeMovies,
  },
  {
    title: "Family",
    isLarge: false,
    fetchURL: requestLinks.familyMovies,
  },
  {
    title: "Fantasy",
    isLarge: false,
    fetchURL: requestLinks.fantasyMovies,
  },
  {
    title: "History",
    isLarge: false,
    fetchURL: requestLinks.historyMovies,
  },
  {
    title: "Science Fiction",
    isLarge: false,
    fetchURL: requestLinks.scienceFictionMovies,
  },
  {
    title: "War",
    isLarge: false,
    fetchURL: requestLinks.warMovies,
  },
  {
    title: "Western",
    isLarge: false,
    fetchURL: requestLinks.westernMovies,
  },
  {
    title: "Horror",
    isLarge: false,
    fetchURL: requestLinks.horrorMovies,
  },
  {
    title: "Romance",
    isLarge: false,
    fetchURL: requestLinks.romanceMovies,
  },
  {
    title: "Documentaries",
    isLarge: false,
    fetchURL: requestLinks.documentaries,
  },
];
