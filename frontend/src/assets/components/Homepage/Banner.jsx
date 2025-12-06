import "../styles/Banner.css";
import logo from "../../images/newLogo.png";

export default function Banner() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <img src={logo} alt="Film Festival" className="hero-image" />
          <div className="hero-text">
            <h1>Welcome to the Husky Film Festival!</h1>
            <p>The biggest indie film festival in New England</p>
          </div>
        </div>
      </section>
    </>
  );
}
