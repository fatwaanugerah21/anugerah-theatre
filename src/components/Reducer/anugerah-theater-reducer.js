const AnugerahTheaterReducer = (
  state = {
    activeMovieId: null,
    allMovies: null,
    playingSection: null,
    wasPlayedSection: null,
    searchValue: null,
  },
  action
) => {
  switch (action.type) {
    case "SET_SEARCH_VALUE":
      state = { ...state, searchValue: action.input };
      return state;
    case "NEW_ACTIVE_MOVIE":
      if (state.activeMovieId === action.id)
        return (state = { ...state, activeMovieId: undefined });
      state = { ...state, activeMovieId: action.id };
      return state;
    case "NEW_PLAYING_SECTION":
      state = {
        ...state,
        wasPlayedSection: state.playingSection,
        playingSection: action.title,
      };
      return state;
    case "ADD_NEW_MOVIES":
      if (state.allMovies) {
        for (const movie of action.movies) {
          state.allMovies.push(movie);
        }
        return state;
      }
      state = { ...state, allMovies: action.movies };
      return state;
    default:
      return state;
  }
};

export default AnugerahTheaterReducer;
