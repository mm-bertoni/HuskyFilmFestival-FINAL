import Container from "react-bootstrap/Container";
import "../styles/filmStatAggregator.css";
import PropTypes from "prop-types";

export default function FilmStatAggregator({ stat = "0", type = "" }) {
  const statLabel = type ? `Total ${type} Submissions` : "Total Submissions";
  const statValue = typeof stat === "number" ? stat : parseInt(stat, 10) || 0;

  return (
    <Container
      className="statContainer"
      as="section"
      aria-labelledby="stat-heading"
    >
      <h2 id="stat-heading">{statLabel}</h2>
      <p className="statText" aria-live="polite" aria-atomic="true">
        <span className="visually-hidden">{statLabel}: </span>
        <span className="stat-number">{statValue}</span>
      </p>
    </Container>
  );
}

FilmStatAggregator.propTypes = {
  stat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
};
