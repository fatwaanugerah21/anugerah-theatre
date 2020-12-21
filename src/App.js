import { requestLinks } from "./components/consts";
import Section from "./components/Section";
import "./app.min.css";
import Navbar from "./components/Navbar";
import HeaderContent from "./components/HeaderContent";
import { useState } from "react";

function App() {
  const [playingSection, setPlayingSection] = useState("");
  console.log(playingSection);
  return (
    <div className="app">
      <Navbar />
      <header className="App-header">
        <HeaderContent
          className="header-content"
          fetchURL={requestLinks.actionMovies}
          playingSection={playingSection}
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
          title="Netflix Original"
          isPotrait={true}
          fetchURL={requestLinks.tvShows}
          playingSection={playingSection}
          onPlay={() => setPlayingSection("Netflix Original")}
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
    </div>
  );
}

export default App;
