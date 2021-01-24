import React, { useState, Suspense, lazy } from "react";

import { requestLinks } from "./components/consts";
import "./app.css";
import "./components/shared.css";
import HeaderContent from "./components/HeaderContent";
import { allSections } from "./components/sectionsArray";

const Section = lazy(() => import("./components/Section"));
const Navbar = lazy(() => import("./components/Navbar"));

function App() {
  const [playingSection, setPlayingSection] = useState("");

  const sectionList = allSections.map((section) => {
    return (
      <Section
        key={section.title}
        className="movielist-section"
        title={section.title}
        fetchURL={section.fetchURL}
        isLarge={section.isLarge}
        playingSection={playingSection}
        onPlay={() => {
          setPlayingSection(section.title);
        }}
      />
    );
  });

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
        <main>{sectionList}</main>
      </Suspense>
    </div>
  );
}

export default App;
