import React, { useEffect, useState } from "react";

const Navbar = ({ setSearchedMovies, inputValue, autoFocus }) => {
  const [navbarId, setNavbarId] = useState("");
  function setNavbarBG(_) {
    setNavbarId(window.pageYOffset > 100 ? "black-background" : "");
  }

  function searchMovies(e) {
    setSearchedMovies(e.target.value);
  }

  useEffect(() => {
    window.addEventListener("scroll", setNavbarBG);
    return document.body.removeEventListener("scroll", setNavbarBG);
  }, []);

  return (
    <nav className="navbar" id={navbarId}>
      <div className="left-side">
        <img
          src="/img/netflix_logo.svg"
          alt="netflix-logo"
          className="netflix-logo"
        />
        <a className="left-side-nav" href="#home">
          Home
        </a>
        <a className="left-side-nav" href="#home">
          TV Shows
        </a>
        <a className="left-side-nav" href="#home">
          Movies
        </a>
        <a className="left-side-nav" href="#home">
          Latest
        </a>
        <a className="left-side-nav" href="#home">
          My List
        </a>
      </div>

      <div className="right-side">
        <form action="">
          <input
            type="text"
            placeholder="search movies"
            value={inputValue}
            autoFocus={autoFocus}
            onChange={searchMovies}
          />
        </form>
        <img src="/img/account_icon.svg" height="26" width="20" alt="" />
      </div>
    </nav>
  );
};
export default Navbar;
