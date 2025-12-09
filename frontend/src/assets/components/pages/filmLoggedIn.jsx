import Container from "react-bootstrap/esm/Container";
import FilmList from "../Film/filmReviewList";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import {useEffect} from "react";


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
          <Link to="/logout">
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
