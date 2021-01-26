import { Suspense } from "react";
import { allSections } from "../consts/sectionsArray";
import { requestLinks } from "../consts/urls";
import Section from "../shared/Section";
import HeaderContent from "../shared/HeaderContent";
import { connect } from "react-redux";

const Homepage = ({ setEmptySearchRedirect }) => {
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
