import { requestLinks } from "./components/consts";
import Section from "./components/Section";
import "./app.min.css";
import Navbar from "./components/Navbar";
import HeaderContent from "./components/HeaderContent";
import { useState } from "react";

function App() {
  const [playingSection, setPlayingSection] = useState("");
  const [previousPlayingMovie, setPreviousPlayingMovie] = useState();
  return (
    <div className="app">
      <Navbar />
      <header className="App-header">
        <HeaderContent
          className="header-content"
          fetchURL={requestLinks.actionMovies}
          playingSection={playingSection}
          previousPlayingMovie={previousPlayingMovie}
          setPreviousPlayingMovie={(id) => setPreviousPlayingMovie(id)}
          onPlay={() => setPlayingSection("Header")}
        />
      </header>
      <div className="mask"></div>
      <main>
        <Section
          className="movielist-section"
          title="Trending"
          fetchURL={requestLinks.trending}
          playingSection={playingSection}
          previousPlayingMovie={previousPlayingMovie}
          setPreviousPlayingMovie={(id) => setPreviousPlayingMovie(id)}
          onPlay={() => setPlayingSection("Trending")}
        />
        <Section
          className="movielist-section"
          title="Top Rated"
          fetchURL={requestLinks.topRated}
          playingSection={playingSection}
          previousPlayingMovie={previousPlayingMovie}
          setPreviousPlayingMovie={(id) => setPreviousPlayingMovie(id)}
          onPlay={() => setPlayingSection("Top Rated")}
        />
        <Section
          className="movielist-section"
          title="Netflix Original"
          isPotrait={true}
          fetchURL={requestLinks.tvShows}
          playingSection={playingSection}
          previousPlayingMovie={previousPlayingMovie}
          setPreviousPlayingMovie={(id) => setPreviousPlayingMovie(id)}
          onPlay={() => setPlayingSection("Netflix Original")}
        />
        <Section
          className="movielist-section"
          title="Action & Adventure"
          fetchURL={requestLinks.actionMovies}
          playingSection={playingSection}
          previousPlayingMovie={previousPlayingMovie}
          setPreviousPlayingMovie={(id) => setPreviousPlayingMovie(id)}
          onPlay={() => setPlayingSection("Action & Adventure")}
        />
        <Section
          className="movielist-section"
          title="Comedies"
          fetchURL={requestLinks.comedyMovies}
          playingSection={playingSection}
          previousPlayingMovie={previousPlayingMovie}
          setPreviousPlayingMovie={(id) => setPreviousPlayingMovie(id)}
          onPlay={() => setPlayingSection("Comedies")}
        />
        <Section
          className="movielist-section"
          title="Crime"
          fetchURL={requestLinks.crimeMovies}
          playingSection={playingSection}
          previousPlayingMovie={previousPlayingMovie}
          setPreviousPlayingMovie={(id) => setPreviousPlayingMovie(id)}
          onPlay={() => setPlayingSection("Crime")}
        />
        <Section
          className="movielist-section"
          title="Family"
          fetchURL={requestLinks.familyMovies}
          playingSection={playingSection}
          previousPlayingMovie={previousPlayingMovie}
          setPreviousPlayingMovie={(id) => setPreviousPlayingMovie(id)}
          onPlay={() => setPlayingSection("Family")}
        />
        <Section
          className="movielist-section"
          title="Fantasy"
          fetchURL={requestLinks.fantasyMovies}
          playingSection={playingSection}
          previousPlayingMovie={previousPlayingMovie}
          setPreviousPlayingMovie={(id) => setPreviousPlayingMovie(id)}
          onPlay={() => setPlayingSection("Fantasy")}
        />
        <Section
          className="movielist-section"
          title="History"
          fetchURL={requestLinks.historyMovies}
          playingSection={playingSection}
          previousPlayingMovie={previousPlayingMovie}
          setPreviousPlayingMovie={(id) => setPreviousPlayingMovie(id)}
          onPlay={() => setPlayingSection("History")}
        />
        <Section
          className="movielist-section"
          title="Science Fiction"
          fetchURL={requestLinks.scienceFictionMovies}
          playingSection={playingSection}
          previousPlayingMovie={previousPlayingMovie}
          setPreviousPlayingMovie={(id) => setPreviousPlayingMovie(id)}
          onPlay={() => setPlayingSection("Science Fiction")}
        />
        <Section
          className="movielist-section"
          title="War"
          fetchURL={requestLinks.warMovies}
          playingSection={playingSection}
          previousPlayingMovie={previousPlayingMovie}
          setPreviousPlayingMovie={(id) => setPreviousPlayingMovie(id)}
          onPlay={() => setPlayingSection("War")}
        />
        <Section
          className="movielist-section"
          title="Western"
          fetchURL={requestLinks.westernMovies}
          playingSection={playingSection}
          previousPlayingMovie={previousPlayingMovie}
          setPreviousPlayingMovie={(id) => setPreviousPlayingMovie(id)}
          onPlay={() => setPlayingSection("Western")}
        />
        <Section
          className="movielist-section"
          title="Horror"
          fetchURL={requestLinks.horrorMovies}
          playingSection={playingSection}
          previousPlayingMovie={previousPlayingMovie}
          setPreviousPlayingMovie={(id) => setPreviousPlayingMovie(id)}
          onPlay={() => setPlayingSection("Horror")}
        />
        <Section
          className="movielist-section"
          title="Romance"
          fetchURL={requestLinks.romanceMovies}
          playingSection={playingSection}
          previousPlayingMovie={previousPlayingMovie}
          setPreviousPlayingMovie={(id) => setPreviousPlayingMovie(id)}
          onPlay={() => setPlayingSection("Romance")}
        />
        <Section
          className="movielist-section"
          title="Documentaries"
          fetchURL={requestLinks.documentaries}
          playingSection={playingSection}
          previousPlayingMovie={previousPlayingMovie}
          setPreviousPlayingMovie={(id) => setPreviousPlayingMovie(id)}
          onPlay={() => setPlayingSection("Documentaries")}
        />
      </main>
    </div>
  );
}

export default App;
