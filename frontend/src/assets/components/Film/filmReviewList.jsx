import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Film from "./filmToReview";

export default function FilmReviewList() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reloadFilms = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/films`);
      console.log("What is res getting", res);

      if (!res.ok) {
        throw new Error(`Failed to fetch films: ${res.status}`);
      }

      const data = await res.json();
      setFilms(data.films || []); // Defaults to empty array if issue
    } catch (err) {
      console.error("Failed to fetch films:", err);
      setError("Unable to load films. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reloadFilms();
  }, []);

  if (loading) {
    return (
      <Container>
        <div className="text-white" role="status" aria-live="polite">
          <span aria-label="Loading">Loading films...</span>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div role="alert" aria-live="assertive">
          <p className="text-danger">{error}</p>
          <button onClick={reloadFilms} className="btn btn-primary">
            Retry
          </button>
        </div>
      </Container>
    );
  }

  if (!films || films.length === 0) {
    return (
      <Container>
        <div className="text-white" role="status">
          <p>No films awaiting review</p>
        </div>
      </Container>
    );
  }

  return (
    <Container as="section" aria-labelledby="film-list-heading">
      <h2 id="film-list-heading" className="visually-hidden">
        Films Awaiting Review
      </h2>
      <div
        role="list"
        aria-label={`${films.length} film${films.length === 1 ? "" : "s"} awaiting review`}
      >
        {films.map((film) => (
          <div key={film._id} role="listitem">
            <Film
              director={film.director}
              title={film.title}
              genre={film.genre}
              screener={film.screener}
              status={film.status}
              onReload={reloadFilms}
            />
          </div>
        ))}
      </div>
    </Container>
  );
}
