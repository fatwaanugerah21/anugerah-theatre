const AnugerahTheaterReducer = (
  state = {
    activeMovieId: null,
    allMovies: [],
    playingSection: null,
    wasPlayedSection: null,
    searchValue: null,
    emptySearchRedirect: null,
    dumpedMovies: [],
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
    case "SET_EMPTY_SEARCH_REDIRECT":
      state = { ...state, emptySearchRedirect: action.input };
      return state;
    case "NEW_PLAYING_SECTION":
      state = {
        ...state,
        wasPlayedSection: state.playingSection,
        playingSection: action.title,
      };
      return state;
    case "ADD_NEW_MOVIES":
      for (const id of state.dumpedMovies)
        if (id === action.data.id) return state;
      state.dumpedMovies.push(action.data.id);
      state.allMovies.push(action.data.movies);
      return state;
    default:
      return state;
  }
};

export default AnugerahTheaterReducer;
