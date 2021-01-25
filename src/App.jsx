import { Suspense, lazy, useState } from "react";

import { requestLinks } from "./components/consts";
import "./app.css";
import "./components/shared.css";
import HeaderContent from "./components/HeaderContent";
import { allSections } from "./components/sectionsArray";
// import SearchMovies from "./components/SearchMovies";

const SearchMovies = lazy(() => import("./components/SearchMovies"));
const Section = lazy(() => import("./components/Section"));
const Navbar = lazy(() => import("./components/Navbar"));

function App() {
  const [searchedMovie, setSearchedMovie] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  if (searchedMovie) {
    return (
      <Suspense fallback={<div></div>}>
        <SearchMovies
          mustContains={searchedMovie}
          setMustContains={(input) => setSearchedMovie(input)}
        />
      </Suspense>
    );
  }

  const sectionList = allSections.map((section) => {
    return (
      <Section
        key={section.title}
        className="movielist-section"
        title={section.title}
        fetchURL={section.fetchURL}
        isLarge={section.isLarge}
      />
    );
  });

  return (
    <div className="app">
      <header className="App-header">
        <HeaderContent
          className="header-content"
          fetchURL={requestLinks.actionMovies}
          title="Header"
        />
      </header>
      <Suspense fallback={<div></div>}>
        <Navbar
          setSearchedMovies={(title) => {
            setSearchedMovie(title);
          }}
          isFocus={isFocus}
          setIsFocus={() => setIsFocus(true)}
        />
      </Suspense>

      <Suspense fallback={<div></div>}>
        <div className="mask"></div>
        <main>{sectionList}</main>
      </Suspense>
    </div>
  );
}

export default App;
