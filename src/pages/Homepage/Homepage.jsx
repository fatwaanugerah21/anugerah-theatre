import { Suspense, useEffect, lazy, useState } from "react";
import { connect } from "react-redux";

import { allSections } from "../../consts/sectionsArray";
import { requestLinks } from "../../consts/urls";
import HeaderContent from "./HeaderContent";

import "./Homepage.scss";
const Section = lazy(() => import("./Section"));

const Homepage = ({ setEmptySearchRedirect }) => {
  const [endIndex, setEndIndex] = useState(1);

  useEffect(() => {
    const bottomFetch = (_) => {
      const windowScrollHeight =
        document.body.scrollHeight - window.pageYOffset;
      if (windowScrollHeight <= 900)
        setEndIndex((old) => Math.min(16, old + 2));
    };
    window.addEventListener("scroll", () => bottomFetch());
    return window.removeEventListener("scroll", () => bottomFetch());
  });

  const sectionList = allSections.slice(0, endIndex).map((section) => {
    return (
      <Suspense>
        <Section
          key={section.title + section.fetchURL}
          className="movielist-section"
          title={section.title}
          fetchURL={section.fetchURL}
          isLarge={section.isLarge}
        />
      </Suspense>
    );
  });

  setEmptySearchRedirect("/");

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

function mapDispatchToProps(dispatch) {
  return {
    setEmptySearchRedirect: (input) =>
      dispatch({ type: "SET_EMPTY_SEARCH_REDIRECT", input }),
  };
}
export default connect(null, mapDispatchToProps)(Homepage);
