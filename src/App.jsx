import { Suspense, lazy } from "react";

import "./app.css";
import "./components/shared/shared.css";
import Homepage from "./components/pages/Homepage";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import Movies from "./components/pages/Movies";

// const SearchMovies = lazy(() => import("./components/pages/SearchMovies"));
const Navbar = lazy(() => import("./components/shared/Navbar"));

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Suspense fallback={<div></div>}>
          <Navbar />
        </Suspense>
        <div>
          <Route exact path="/" component={Homepage} />
          <Route path="/movies" component={Movies} />
        </div>
      </div>
    </BrowserRouter>
  );
}

function mapStateToProps(state, _) {
  return {
    searchValue: state.searchValue,
  };
}

export default connect(mapStateToProps)(App);
