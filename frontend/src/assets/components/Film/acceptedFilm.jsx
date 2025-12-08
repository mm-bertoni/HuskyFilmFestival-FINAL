//import Container from 'react-bootstrap/Container';
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
//import ReviewForm from '../Forms/reviewForm';
import "../styles/acceptedFilm.css";
import PropTypes from "prop-types";

export default function FilmToReview({ director, title, genre }) {
  return (
    <Col>
      <Card style={{ width: "18rem" }} className="acceptedCard gy-1">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text className="cardText">Director: {director}</Card.Text>
          <Card.Text className="cardText">Genre: {genre}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

FilmToReview.propTypes = {
  director: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
};
