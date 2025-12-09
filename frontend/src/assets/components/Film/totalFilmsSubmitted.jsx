import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import FilmStatAggregator from "../Film/filmStatAggregator";
import { useState, useEffect } from "react";

export default function TotalFilmsSubmitted() {
  const [filmCount, setFilmCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // To update the film count
  const updateStat = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/countFilms`);
      if (!res.ok) {
        throw new Error("Failed to fetch film count");
      }
      const data = await res.json();
      setFilmCount(data.filmCount);
    } catch (err) {
      console.error("Failed to fetch sum:", err);
      setError("Unable to load film count. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateStat();
  }, []);

  if (loading) {
    return (
      <Container>
        <div role="status" aria-live="polite">
          <p>Loading film count...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div role="alert" aria-live="assertive">
          <p className="text-danger">{error}</p>
          <button onClick={updateStat} className="btn btn-primary">
            Retry
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <section aria-labelledby="film-stats-heading">
        <h2 id="film-stats-heading">Total Films Submitted:</h2>
        <div aria-live="polite" aria-atomic="true">
          <FilmStatAggregator stat={filmCount} type="" />
        </div>
      </section>
    </Container>
  );
}
