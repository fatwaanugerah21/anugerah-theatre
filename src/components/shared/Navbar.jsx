import React, { useEffect, useState } from "react";
import { allNavLinks } from "../consts/urls";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = ({ searchValue, setSearchValue, setEmptySearchRedirect }) => {
  const [navbarId, setNavbarId] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", setNavbarBG);
    return document.body.removeEventListener("scroll", setNavbarBG);
  }, []);

  function setNavbarBG(_) {
    setNavbarId(window.pageYOffset > 100 ? "black-background" : "");
  }

  const navLinks = allNavLinks.map((link) => {
    return (
      <Link
        className="left-side-nav"
        onClick={() => setEmptySearchRedirect(link.emptySearchRedirect)}
        key={link.name}
        to={link.href}
      >
        {link.name}
      </Link>
    );
  });

  if (searchValue) {
    console.log("clicking");
    setTimeout(() => {
      const link = document.getElementById("searchMovieWithParams");
      link?.click();
    }, 300);
  }

  function searchMovies(e) {
    setSearchValue(e.target.value);
  }

  return (
    <div>
      <nav className="navbar" id={navbarId}>
        <div className="left-side">
          <Link to="/">
            <img
              src="/img/netflix_logo.svg"
              alt="netflix-logo"
              className="netflix-logo"
            />
          </Link>
          {navLinks}
        </div>
        <div className="right-side f-sb-ac">
          <form action="">
            <input
              className="searchInput"
              type="text"
              placeholder="search movies"
              value={searchValue ?? ""}
              onChange={searchMovies}
            />
          </form>
          <img src="/img/account_icon.svg" height="26" width="20" alt="" />
        </div>
      </nav>
      <Link className="hide white-text" id="searchMovieWithParams" to="movies">
        a
      </Link>
    </div>
  );
};

function mapStateToProps(state, _) {
  return {
    searchValue: state.searchValue,
    emptySearchRedirect: state.emptySearchRedirect,
  };
}

function mapDispatchToProps(dispatch, _) {
  return {
    setSearchValue: (input) => dispatch({ type: "SET_SEARCH_VALUE", input }),
    setEmptySearchRedirect: (input) =>
      dispatch({ type: "SET_EMPTY_SEARCH_REDIRECT", input }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
