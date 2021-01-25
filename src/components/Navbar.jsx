import React, { useEffect, useState } from "react";
import { allNavLinks } from "./consts";

const Navbar = ({
  setSearchedMovies,
  inputValue,
  autoFocus,
  isFocus,
  setIsFocus,
}) => {
  const [navbarId, setNavbarId] = useState("");
  function setNavbarBG(_) {
    setNavbarId(window.pageYOffset > 100 ? "black-background" : "");
  }

  function searchMovies(e) {
    setSearchedMovies(e.target.value);
    if (setIsFocus) setIsFocus(true);
  }

  useEffect(() => {
    window.addEventListener("scroll", setNavbarBG);
    return document.body.removeEventListener("scroll", setNavbarBG);
  }, []);

  const navLinks = allNavLinks.map((link) => {
    return (
      <a className="left-side-nav" href="#home">
        {link.name}
      </a>
    );
  });

  return (
    <nav className="navbar" id={navbarId}>
      <div className="left-side">
        <img
          src="/img/netflix_logo.svg"
          alt="netflix-logo"
          className="netflix-logo"
        />
        {navLinks}
      </div>

      <div className="right-side f-sb-ac">
        <form action="">
          <input
            type="text"
            placeholder="search movies"
            value={inputValue}
            autoFocus={autoFocus || isFocus}
            onChange={searchMovies}
          />
        </form>
        <img src="/img/account_icon.svg" height="26" width="20" alt="" />
      </div>
    </nav>
  );
};
export default Navbar;
