import { useState } from "react";
import "./styles/Navbar.css";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Film Festival Logo" />
      </div>

      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <ul className={isOpen ? "active" : ""}>
        <li>
          <Link to="/" className="navbarLink">Home</Link>
        </li>
        <li>
          <Link to="/filmForm" className="navbarLink">Submit a Film</Link>
        </li>
        <li>
          <Link to="/acceptedFilms" className="navbarLink">Official Selections</Link>
        </li>

        <li>
          <Link to="/tickets" className="navbarLink">Buy Tickets</Link>
        </li>
      </ul>
    </nav>
  );
}
