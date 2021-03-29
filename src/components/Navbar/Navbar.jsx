import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";

import PhoneMenu from "../PhoneMenu/PhoneMenu";
import { allNavLinks } from "../../consts/urls";

import "./Navbar.scss";

const NavInput = ({ onChange, searchValue, onFocus, onBlur }) => {
  const inputRef = useRef(null);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex align-items-center transition"
    >
      <img
        onClick={() => inputRef.current.focus()}
        className="cursor-pointer search-icon"
        src="/img/search-icon.svg"
        alt=""
      />
      <input
        className="search-input white-text transparent transition"
        type="text"
        ref={inputRef}
        placeholder="search movies"
        onFocus={onFocus}
        onBlur={onBlur}
        value={searchValue ?? ""}
        onChange={(e) => onChange(e)}
      />
    </form>
  );
};

const Navbar = ({ searchValue, setSearchValue, setEmptySearchRedirect }) => {
  const [navbarId, setNavbarId] = useState("");
  const pathName = useLocation().pathname;
  const [isInputingSearch, setIsInputingSearch] = useState(false);

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
        <div key={link.name} className="left-side-nav white-text">
          {link.name}
        </div>
      );
    return (
      <NavLink
        className="left-side-nav white-text"
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

  return (
    <nav className="navbar transition f-sb-ac fixed-top w-full" id={navbarId}>
      <div className="left-side flex">
        <Link to="/" onClick={() => setSearchValue(null)}>
          <img
            src="/img/netflix_logo.svg"
            alt="netflix-logo"
            className="netflix-logo"
          />
        </Link>
        <div className="navlinks flex">{navLinks}</div>
      </div>
      <PhoneMenu isInputingSearch={isInputingSearch} pathname={pathName}>
        {navLinks}
      </PhoneMenu>
      <div className="right-side f-sb-ac">
        <NavInput
          onChange={(e) => setSearchValue(e.target.value)}
          searchValue={searchValue}
          onFocus={() => setIsInputingSearch(true)}
          onBlur={() => setTimeout(() => setIsInputingSearch(false), 450)}
        />
        <img src="/img/account_icon.svg" height="26" width="20" alt="" />
      </div>
    </nav>
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
