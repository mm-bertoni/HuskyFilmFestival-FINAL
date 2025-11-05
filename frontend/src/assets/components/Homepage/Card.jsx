import Button from "react-bootstrap/Button";
import BootstrapCard from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function Card({ title, image, link }) {
  return (
    <BootstrapCard style={{ width: "20rem" }}>
      <BootstrapCard.Img variant="top" src={image} />
      <BootstrapCard.Body>
        <BootstrapCard.Title>{title}</BootstrapCard.Title>
        <Link to={link}>
          <Button variant="primary">Click Here</Button>
        </Link>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
}

export default Card;
