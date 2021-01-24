import React, { useState, Suspense, lazy } from "react";

import { requestLinks } from "./components/consts";
import "./app.css";
import "./components/shared.css";
import HeaderContent from "./components/HeaderContent";

const Section = lazy(() => import("./components/Section"));
const Navbar = lazy(() => import("./components/Navbar"));

function App() {
  const [playingSection, setPlayingSection] = useState("");
  return (
    <div className="app">
      <header className="App-header">
        <HeaderContent
          className="header-content"
          fetchURL={requestLinks.actionMovies}
          playingSection={playingSection}
          onPlay={() => setPlayingSection("Header")}
        />
      </header>
      <Suspense fallback={<div></div>}>
        <Navbar />
      </Suspense>

      <Suspense fallback={<div></div>}>
        <div className="mask"></div>
        <main>
          <Section
            className="movielist-section"
            title="Netflix Original"
            isLarge={true}
            fetchURL={requestLinks.tvShows}
            playingSection={playingSection}
            onPlay={() => setPlayingSection("Netflix Original")}
          />
          <Section
            className="movielist-section"
            title="Trending"
            fetchURL={requestLinks.trending}
            playingSection={playingSection}
            onPlay={() => setPlayingSection("Trending")}
          />
          <Section
            className="movielist-section"
            title="Top Rated"
            fetchURL={requestLinks.topRated}
            playingSection={playingSection}
            onPlay={() => setPlayingSection("Top Rated")}
          />

          <Section
            className="movielist-section"
            title="Action & Adventure"
            fetchURL={requestLinks.actionMovies}
            playingSection={playingSection}
            onPlay={() => setPlayingSection("Action & Adventure")}
          />
          <Section
            className="movielist-section"
            title="Comedies"
            fetchURL={requestLinks.comedyMovies}
            playingSection={playingSection}
            onPlay={() => setPlayingSection("Comedies")}
          />
          <Section
            className="movielist-section"
            title="Crime"
            fetchURL={requestLinks.crimeMovies}
            playingSection={playingSection}
            onPlay={() => setPlayingSection("Crime")}
          />
          <Section
            className="movielist-section"
            title="Family"
            fetchURL={requestLinks.familyMovies}
            playingSection={playingSection}
            onPlay={() => setPlayingSection("Family")}
          />
          <Section
            className="movielist-section"
            title="Fantasy"
            fetchURL={requestLinks.fantasyMovies}
            playingSection={playingSection}
            onPlay={() => setPlayingSection("Fantasy")}
          />
          <Section
            className="movielist-section"
            title="History"
            fetchURL={requestLinks.historyMovies}
            playingSection={playingSection}
            onPlay={() => setPlayingSection("History")}
          />
          <Section
            className="movielist-section"
            title="Science Fiction"
            fetchURL={requestLinks.scienceFictionMovies}
            playingSection={playingSection}
            onPlay={() => setPlayingSection("Science Fiction")}
          />
          <Section
            className="movielist-section"
            title="War"
            fetchURL={requestLinks.warMovies}
            playingSection={playingSection}
            onPlay={() => setPlayingSection("War")}
          />
          <Section
            className="movielist-section"
            title="Western"
            fetchURL={requestLinks.westernMovies}
            playingSection={playingSection}
            onPlay={() => setPlayingSection("Western")}
          />
          <Section
            className="movielist-section"
            title="Horror"
            fetchURL={requestLinks.horrorMovies}
            playingSection={playingSection}
            onPlay={() => setPlayingSection("Horror")}
          />
          <Section
            className="movielist-section"
            title="Romance"
            fetchURL={requestLinks.romanceMovies}
            playingSection={playingSection}
            onPlay={() => setPlayingSection("Romance")}
          />
          <Section
            className="movielist-section"
            title="Documentaries"
            fetchURL={requestLinks.documentaries}
            playingSection={playingSection}
            onPlay={() => setPlayingSection("Documentaries")}
          />
        </main>
      </Suspense>
    </div>
  );
}

export default App;
