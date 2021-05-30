import { useEffect } from "react";
import { useRef, useState } from "react";
import { connect } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { useQuery } from "../../consts/utils";

const NavInput = ({ onFocus, onBlur, emptySearchRedirect }) => {
  const inputRef = useRef(null);
  const [searchValue, setSearchValue] = useState(useQuery().get("q"));
  const history = useHistory();
  const searchURL = "/search";
  const linkId = "link-redirector";

  useEffect(() => {
    const navLinkDOM = document?.getElementById(linkId);
    if (searchValue) {
      navLinkDOM?.click();
      navLinkDOM?.focus();
    }

    if (!searchValue && emptySearchRedirect) history.push(emptySearchRedirect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <NavLink
        id={linkId}
        to={`${searchURL}?q=${searchValue}`}
        className="visibility-none"
      />
    </form>
  );
};

function mapStateToProps(state) {
  return {
    emptySearchRedirect: state.emptySearchRedirect,
  };
}

export default connect(mapStateToProps)(NavInput);
