import { useState } from "react";
import "./styles/Navbar.css";
import logo from "../images/newLogo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="logo">
        <Link to="/" aria-label="Husky Film Festival home">
          <img src={logo} alt="Husky Film Festival" />
        </Link>
      </div>

      <button
        className="menu-icon"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="navbar-menu"
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </button>

      <ul id="navbar-menu" className={isOpen ? "active" : ""} role="menu">
        <li role="none">
          <Link
            to="/"
            className="navbarLink"
            role="menuitem"
            onClick={closeMenu}
          >
            Home
          </Link>
        </li>
        <li role="none">
          <Link
            to="/filmForm"
            className="navbarLink"
            role="menuitem"
            onClick={closeMenu}
          >
            Submit a Film
          </Link>
        </li>
        <li role="none">
          <Link
            to="/acceptedFilms"
            className="navbarLink"
            role="menuitem"
            onClick={closeMenu}
          >
            Official Selections
          </Link>
        </li>
        <li role="none">
          <Link
            to="/tickets"
            className="navbarLink"
            role="menuitem"
            onClick={closeMenu}
          >
            Buy Tickets
          </Link>
        </li>
        <li role="none">
          <Link
            to="/filmAdmin"
            className="navbarLink"
            role="menuitem"
            onClick={closeMenu}
          >
            Admin Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}
