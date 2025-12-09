import Container from "react-bootstrap/Container";
import "../styles/filmStatAggregator.css"; // Importing CSS styling
import PropTypes from "prop-types";

export default function FilmStatAggregator({ stat = "0", type = "" }) {
  return (
    <Container className="statContainer">
      <h2 className="statText">Total Submissions {type}: </h2>
      <h3 className="statText">{stat}</h3>
    </Container>
  );
}

FilmStatAggregator.propTypes = {
  stat: PropTypes.string,
  type: PropTypes.string,
};
