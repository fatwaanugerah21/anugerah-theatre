import { requestLinks } from "./components/consts";
import Section from "./components/Section";
import "./app.min.css";
import Navbar from "./components/Navbar";
import HeaderContent from "./components/HeaderContent";

function App() {
  return (
    <div className="app">
      <Navbar />
      <header className="App-header">
        <HeaderContent
          className="header-content"
          fetchURL={requestLinks.actionMovies}
        />
      </header>
      <div className="mask"></div>
      <main>
        <Section
          className="movielist-section"
          title="Trending"
          fetchURL={requestLinks.trending}
        />
        <Section
          className="movielist-section"
          title="Top Rated"
          fetchURL={requestLinks.topRated}
        />
        <Section
          className="movielist-section"
          title="Netflix Original"
          isPotrait={true}
          fetchURL={requestLinks.tvShows}
        />
        <Section
          className="movielist-section"
          title="Action & Adventure"
          fetchURL={requestLinks.actionMovies}
        />
        <Section
          className="movielist-section"
          title="Comedies"
          fetchURL={requestLinks.comedyMovies}
        />
        <Section
          className="movielist-section"
          title="Horror"
          fetchURL={requestLinks.horrorMovies}
        />
        <Section
          className="movielist-section"
          title="Romance"
          fetchURL={requestLinks.romanceMovies}
        />
        <Section
          className="movielist-section"
          title="Documentaries"
          fetchURL={requestLinks.documentaries}
        />
      </main>
    </div>
  );
}

export default App;
