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
      <div>
        <p>
          Whether its a short or feature film, animated or live action, we
          welcome all indie filmmakers to submit their work for screening at the
          Husky Film Festival!
        </p>
      </div>
      <div className="cards-container">
        <Card title="Buy Tickets Here!" image={ticketImage} link="/tickets" />
        <Card title="Submit Your Film!" image={filmReel} link="/filmForm" />
      </div>
    </>
  );
}
