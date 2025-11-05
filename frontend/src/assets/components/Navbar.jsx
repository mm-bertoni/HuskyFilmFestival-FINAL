import "./styles/Navbar.css";
import logo from '../images/logo.png';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Film Festival Logo" />
      </div>
      <div>
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#films">Films</a>
          </li>
          <li>
            <a href="tickets">Tickets</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
