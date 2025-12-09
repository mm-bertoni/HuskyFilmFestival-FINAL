import Banner from "../Homepage/Banner";
import Card from "../Homepage/Card";
import "../styles/IndexPage.css";
import ticketImage from "../../images/ticket.jpg";
import filmReel from "../../images/filmReel.jpg";
import Navbar from "../Navbar";

export default function IndexPage() {
  return (
    <>
      <Navbar />
      <Banner />
      <main>
        <section aria-labelledby="welcome-heading">
          <h1 id="welcome-heading" className="visually-hidden">
            Welcome to Husky Film Festival
          </h1>
          <p>
            Whether it's a short or feature film, animated or live action, we
            welcome all indie filmmakers to submit their work for screening at
            the Husky Film Festival!
          </p>
        </section>

        <section aria-labelledby="quick-actions">
          <h2 id="quick-actions" className="visually-hidden">
            Quick Actions
          </h2>
          <div className="cards-container">
            <Card
              title="Buy Tickets Here!"
              image={ticketImage}
              link="/tickets"
              alt="Movie Tickets"
            />
            <Card
              title="Submit Your Film!"
              image={filmReel}
              link="/filmForm"
              alt="Film Reel"
            />
          </div>
        </section>
      </main>
    </>
  );
}
