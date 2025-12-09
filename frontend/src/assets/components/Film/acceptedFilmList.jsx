import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Film from "./acceptedFilm";

export default function AcceptedFilmsList() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reloadFilms = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/acceptedFilms`);
      console.log("What is res getting", res);

      if (!res.ok) {
        throw new Error(`Failed to fetch accepted films: ${res.status}`);
      }

      const data = await res.json();
      setFilms(data.films || []);
    } catch (err) {
      console.error("Failed to fetch accepted films:", err);
      setError("Unable to load official selections. Please try again.");
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
        <div role="status" aria-live="polite">
          <p>Loading official selections...</p>
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
        <section aria-labelledby="no-films-heading">
          <h2 id="no-films-heading">Official Selections</h2>
          <p>Official selections will be announced soon. Check back later!</p>
        </section>
      </Container>
    );
  }

  return (
    <Container as="section" aria-labelledby="accepted-films-heading">
      <header>
        <h2 id="accepted-films-heading">Official Selections</h2>
        <p aria-live="polite">
          {films.length} film{films.length === 1 ? "" : "s"} selected
        </p>
      </header>
      <div
        role="list"
        aria-label={`${films.length} officially selected film${films.length === 1 ? "" : "s"}`}
      >
        {films.map((film) => (
          <div key={film._id} role="listitem">
            <Film
              director={film.director}
              title={film.title}
              genre={film.genre}
            />
          </div>
        ))}
      </div>
    </Container>
  );
}