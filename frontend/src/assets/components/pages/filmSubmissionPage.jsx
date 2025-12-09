import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import FilmForm from "../Forms/filmForm";
import Navbar from "../Navbar";

export default function FilmSubmissionPage() {
  return (
    <>
      <Navbar />
      <main>
        <Container>
          <h1>Submit Your Film</h1>
          <FilmForm />
        </Container>
      </main>
    </>
  );
}
