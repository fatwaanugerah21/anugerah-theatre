const AnugerahTheaterReducer = (
  state = {
    activeMovieId: null,
    allMovies: null,
  },
  action
) => {
  switch (action.type) {
    case "NEW_ACTIVE_MOVIE":
      if (state.activeMovieId === action.id)
        return (state = { ...state, activeMovieId: undefined });
      state = { ...state, activeMovieId: action.id };
      return state;
    case "ADD_NEW_MOVIES":
      if (state.allMovies) {
        for (const movie of action.movies) {
          state.allMovies = [...state.allMovies, movie];
        }
        state.allMovies = [...state.allMovies, action.movies.slice()];
        return state;
      }
      state = { ...state, allMovies: action.movies };
      return state;
    default:
      return state;
  }
};

export default AnugerahTheaterReducer;
