import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import { allNavLinks } from "../../consts/urls";

import "./PhoneMenu.scss";
import { generateKey } from "../../consts/utils";

const PhoneMenu = ({ setEmptySearchRedirect, isInputingSearch }) => {
  const pathname = useLocation().pathname;

  function capitalizeString(text, divider) {
    if (text.includes(" ") && divider === /(?=[A-Z])/) return;
    if (divider) {
      const splittedText = text.split(divider);
      // "No splitted text"
      if (splittedText.length === 1)
        return (
          text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase()
        );
      let returnedtext = "";
      for (const textInPart of splittedText) {
        returnedtext +=
          textInPart.substring(0, 1).toUpperCase() +
          textInPart.substring(1).toLowerCase() +
          " ";
      }
      return returnedtext;
    }
  }
  function formatActiveNavName() {
    if (pathname === "/") return "Home";
    const removedSlash = pathname.substr(1);
    return capitalizeString(removedSlash, "-");
  }

  function toggleClass(DOMElement, toggledClass) {
    DOMElement?.classList.toggle(toggledClass);
  }
  function hoverListener() {
    const navigationsDOM = document.querySelector(".navigations");

    toggleClass(navigationsDOM, "hide");
  }

  return (
    <div
      onClick={() => hoverListener()}
      className={`white-text phone-menu desktop-hide cursor-pointer ${
        isInputingSearch && "hide"
      }`}
    >
      {formatActiveNavName()} <span>&#8595;</span>
      <ul className="navigations hide">
        {allNavLinks.map((link) => {
          return (
            <li
              className={`${link.href === pathname && "active"}`}
              key={generateKey("phone-menu")}
            >
              <Link
                className="white-text"
                onClick={() => setEmptySearchRedirect(link.emptySearchRedirect)}
                to={link.href}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

function mapDispatchToProps(dispatch, _) {
  return {
    setSearchValue: (input) => dispatch({ type: "SET_SEARCH_VALUE", input }),
    setEmptySearchRedirect: (input) =>
      dispatch({ type: "SET_EMPTY_SEARCH_REDIRECT", input }),
  };
}
export default connect(null, mapDispatchToProps)(PhoneMenu);
