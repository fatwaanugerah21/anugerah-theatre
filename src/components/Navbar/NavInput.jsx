import { useEffect } from "react";
import { useRef, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";

const NavInput = ({ onChange, onFocus, onBlur }) => {
  const inputRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const history = useHistory();
  const searchURL = "/search";
  const linkId = "link-redirector";

  useEffect(() => {
    const navLinkDOM = document?.getElementById(linkId);
    navLinkDOM?.click();
  }, [searchValue, history]);

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
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <NavLink id={linkId} to={`${searchURL}?q=${searchValue}`}>
        asf
      </NavLink>
    </form>
  );
};

export default NavInput;
