import Button from "react-bootstrap/Button";
import BootstrapCard from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Card({ title, image, link }) {
  return (
    <BootstrapCard style={{ width: "20rem" }}>
      <BootstrapCard.Img variant="top" src={image} />
      <BootstrapCard.Body>
        <BootstrapCard.Title>{title}</BootstrapCard.Title>
        <Link to={link}>
          <Button
            variant="primary"
            style={{ backgroundColor: "#C8102E", borderColor: "#C8102E" }}
          >
            Click Here
          </Button>
        </Link>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Card;
