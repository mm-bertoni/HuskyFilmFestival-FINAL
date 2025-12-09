import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Navbar from "../Navbar";
import AcceptedFilms from "../Film/acceptedFilmList.jsx";
import TotalFilmsSubmitted from "../Film/totalFilmsSubmitted.jsx";

export default function AcceptedFilmPage() {
  return (
    <>
      <Navbar />
      <main>
        <Container>
          <h1>Husky Film Fest Official Selections</h1>
          {/* Put counter of submitted films here */}
          <TotalFilmsSubmitted />

          <AcceptedFilms />
        </Container>
      </main>
    </>
  );
}
