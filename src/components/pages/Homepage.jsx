import { Suspense } from "react";
import { allSections } from "../consts/sectionsArray";
import { requestLinks } from "../consts/urls";
import Section from "../shared/Section";
import HeaderContent from "../shared/HeaderContent";

const Homepage = () => {
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
    <div className="homepage">
      <header className="App-header">
        <HeaderContent
          className="header-content"
          fetchURL={requestLinks.actionMovies}
          title="Header"
        />
      </header>

      <Suspense fallback={<div></div>}>
        <div className="mask"></div>
        <main>{sectionList}</main>
      </Suspense>
    </div>
  );
};

export default Homepage;
