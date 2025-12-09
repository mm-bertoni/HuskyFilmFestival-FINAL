import Container from "react-bootstrap/esm/Container";
import FilmList from "../Film/filmReviewList";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";

export default function FilmLoggedIn() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) {
      navigate("/filmAdmin");
    }
  }, [navigate]);

  if (!localStorage.getItem("adminLoggedIn")) {
    return null;
  }

  return (
    <>
      <main>
        <Container>
          <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
            <h1>Review Films</h1>
            <nav aria-label="Admin actions">
              <Button
                as={Link}
                to="/adminTickets"
                variant="primary"
                style={{ backgroundColor: "#C8102E", borderColor: "#C8102E" }}
                className="me-2"
              >
                View Tickets
              </Button>
              <Button
                as={Link}
                to="/logout"
                variant="primary"
                style={{ backgroundColor: "#C8102E", borderColor: "#C8102E" }}
              >
                Log Out
              </Button>
            </nav>
          </div>
          <FilmList />
        </Container>
      </main>
    </>
  );
}