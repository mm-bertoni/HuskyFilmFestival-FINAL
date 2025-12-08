import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

import Film from "./filmToReview";

export default function FilmReviewList() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) {
      navigate("/filmAdmin");
    }
  }, [navigate]);

  if (!localStorage.getItem("adminLoggedIn")) {
    return null;
  } */

  const reloadFilms = async () => {
    //console.log("reloadFilms triggered");
    // Testing
    setLoading(true);
    const res = await fetch(`/api/films`);
    console.log("What is res gettting", res);
    if (!res.ok) {
      console.error("Failed to fetch films", res.status);
      setLoading(false);
      return;
    }
    const data = await res.json();
    //console.log("Full data received:", data);
    setFilms(data.films || []); // Defaults to empty array if issue
    setLoading(false);
  };

  useEffect(() => {
    reloadFilms();
  }, []);

  function renderFilm(film) {
    return (
      <Film
        key={film._id}
        director={film.director}
        title={film.title}
        genre={film.genre}
        screener={film.screener}
        status={film.status}
        onReload={reloadFilms}
        // Test
      />
    );
  }

  // Diagnostic log just before render to catch non-array types
  //console.log('films before render:', films, 'isArray:', Array.isArray(films), 'toString:', Object.prototype.toString.call(films));

  if (loading) {
    return (
      <Container>
        <div className="text-white">Loading Films...</div>
      </Container>
    );
  }

  if (!films || films.length === 0) {
    return (
      <Container>
        <div className="text-white">No unreviewed films found</div>
      </Container>
    );
  }
  return <Container>{films.map(renderFilm)}</Container>;
}
