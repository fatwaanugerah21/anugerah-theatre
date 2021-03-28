import { Suspense, lazy } from "react";

import "./app.scss";
import "./components/shared.scss";

import Homepage from "./pages/Homepage";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Movies from "./pages/Movies";

const Navbar = lazy(() => import("./components/Navbar"));

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Suspense fallback={<div></div>}>
          <Navbar />
        </Suspense>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/movies" component={Movies} />
          <Route path="/search" component={Movies} />
        </Switch>
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
