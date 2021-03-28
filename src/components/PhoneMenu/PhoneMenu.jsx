import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { allNavLinks } from "../../consts/urls";
import "./PhoneMenu.scss";

const PhoneMenu = ({ setEmptySearchRedirect }) => {
  const pathname = useLocation().pathname;

  function formatActiveNavName() {
    if (pathname === "/") return "Home";
    return pathname.replace("/", "").replace("-", " ");
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
      className="white-text phone-menu desktop-hide"
    >
      {formatActiveNavName()} <span>&#8595;</span>
      <ul className="navigations hide">
        {allNavLinks.map((link) => {
          return (
            <li>
              <Link
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
