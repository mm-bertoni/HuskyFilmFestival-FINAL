import Button from "react-bootstrap/Button";
import BootstrapCard from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Card({ title, image, link, alt }) {
  return (
    <BootstrapCard style={{ width: "20rem" }}>
      <BootstrapCard.Img variant="top" src={image} alt={alt} />
      <BootstrapCard.Body>
        <BootstrapCard.Title as="h3">{title}</BootstrapCard.Title>
        <Button
          as={Link}
          to={link}
          variant="primary"
          style={{ backgroundColor: "#C8102E", borderColor: "#C8102E" }}
          aria-label={`${title} - Click to learn more`}
        >
          Click Here
        </Button>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Card;
