import { useEffect, useState } from "react";
import { allNavLinks } from "../../consts/urls";
import { connect } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import PhoneMenu from "../PhoneMenu/PhoneMenu";
import "./Navbar.scss";

const Navbar = ({ searchValue, setSearchValue, setEmptySearchRedirect }) => {
  const [navbarId, setNavbarId] = useState("");
  const pathName = useLocation().pathname;
  useEffect(() => {
    window.addEventListener("scroll", setNavbarBG);
    return document.body.removeEventListener("scroll", setNavbarBG);
  }, []);

  function setNavbarBG(_) {
    setNavbarId(window.pageYOffset > 100 ? "black-background" : "");
  }

  const navLinks = allNavLinks.map((link) => {
    if (link.onlyDisplay)
      return (
        <div key={link.name} className="left-side-nav white-text od-nav">
          {link.name}
        </div>
      );
    return (
      <NavLink
        className="left-side-nav"
        onClick={() => {
          setSearchValue(null);
          setEmptySearchRedirect(link.emptySearchRedirect);
        }}
        key={link.name}
        to={link.href}
        exact={true}
      >
        {link.name}
      </NavLink>
    );
  });

  if (searchValue && pathName !== "/movies") {
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
          <Link to="/" onClick={() => setSearchValue(null)}>
            <img
              src="/img/netflix_logo.svg"
              alt="netflix-logo"
              className="netflix-logo"
            />
          </Link>
          {navLinks}
        </div>
        <PhoneMenu pathname={pathName}>{navLinks}</PhoneMenu>
        <div className="right-side f-sb-ac">
          <form onSubmit={(e) => e.preventDefault()}>
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
