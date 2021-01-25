import React, { useEffect, useState } from "react";
import { allNavLinks } from "../consts/urls";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = ({ searchValue, setSearchValue }) => {
  const [navbarId, setNavbarId] = useState("");
  function setNavbarBG(_) {
    setNavbarId(window.pageYOffset > 100 ? "black-background" : "");
  }

  function searchMovies(e) {
    setSearchValue(e.target.value);
  }

  useEffect(() => {
    window.addEventListener("scroll", setNavbarBG);
    return document.body.removeEventListener("scroll", setNavbarBG);
  }, []);

  const navLinks = allNavLinks.map((link) => {
    return (
      <Link className="left-side-nav" key={link.name} to={link.href}>
        {link.name}
      </Link>
    );
  });

  return (
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
            type="text"
            placeholder="search movies"
            value={searchValue ?? ""}
            onChange={searchMovies}
          />
        </form>
        <img src="/img/account_icon.svg" height="26" width="20" alt="" />
      </div>
    </nav>
  );
};

function mapStateToProps(state, _) {
  return {
    searchValue: state.searchValue,
  };
}

function mapDispatchToProps(dispatch, _) {
  return {
    setSearchValue: (input) => dispatch({ type: "SET_SEARCH_VALUE", input }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
