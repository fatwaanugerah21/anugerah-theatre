import { Suspense, lazy } from "react";

import "./app.scss";

import Homepage from "./pages/Homepage/Homepage";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Movies from "./pages/Movies/Movies";

const Navbar = lazy(() => import("./components/Navbar/Navbar"));

function App() {
  return (
    <BrowserRouter>
      <div className="app overflow-hidden">
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
