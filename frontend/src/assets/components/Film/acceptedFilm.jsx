import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import "../styles/acceptedFilm.css";
import PropTypes from "prop-types";

export default function AcceptedFilm({ director, title, genre }) {
  return (
    <Col className="mb-3">
      <Card className="acceptedCard mb-3" as="article">
        <Card.Body>
          <Card.Title as="h3" style={{ color: "white" }}>
            {title}
          </Card.Title>
          <Card.Text as="dl" className="cardText">
            <div>
              <dt>Director:</dt>
              <dd>Director: {director}</dd>
            </div>
            <div>
              <dt>Genre:</dt>
              <dd>Genre: {genre}</dd>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

AcceptedFilm.propTypes = {
  director: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
};
