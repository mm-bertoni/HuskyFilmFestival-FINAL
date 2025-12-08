import Container from "react-bootstrap/esm/Container";
import FilmList from "../Film/filmReviewList";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function FilmLoggedIn() {
  return (
    <>
      <Container>
        <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
          <h1>Review Films</h1>
          <Link to="/adminTickets">
            <Button
              variant="primary"
              style={{ backgroundColor: "#C8102E", borderColor: "#C8102E" }}
            >
              Ticket Page
            </Button>
          </Link>
        </div>
        <FilmList />
      </Container>
    </>
  );
}
