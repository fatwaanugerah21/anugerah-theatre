import { Suspense, useEffect, useState } from "react";
import { allSections } from "../consts/sectionsArray";
import { requestLinks } from "../consts/urls";
import Section from "../shared/Section";
import HeaderContent from "../shared/HeaderContent";
import { connect } from "react-redux";

const Homepage = ({ setEmptySearchRedirect }) => {
  const [endIndex, setEndIndex] = useState(2);

  useEffect(() => {
    const bottomFetch = (_) => {
      const windowScrollHeight =
        document.body.scrollHeight - window.pageYOffset;
      if (windowScrollHeight <= 800)
        setEndIndex((old) => (old + 3 > 16 ? 16 : old + 3));
    };
    window.addEventListener("scroll", () => bottomFetch());
    return window.removeEventListener("scroll", () => bottomFetch());
  });

  const sectionList = allSections.slice(0, endIndex).map((section, index) => {
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

function mapDispatchToProps(dispatch, _) {
  return {
    setEmptySearchRedirect: (input) =>
      dispatch({ type: "SET_EMPTY_SEARCH_REDIRECT", input }),
  };
}
export default connect(null, mapDispatchToProps)(Homepage);
