import Button from 'react-bootstrap/Button';
import BootstrapCard from 'react-bootstrap/Card';  // Rename the import

function Card({ title, image }) {  // Also fix: should be one object, not two
  return (
    <BootstrapCard style={{ width: '20rem' }}>
      <BootstrapCard.Img variant="top" src={image} />
      <BootstrapCard.Body>
        <BootstrapCard.Title>{title}</BootstrapCard.Title>
        <Button variant="primary">Go somewhere</Button>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
}

export default Card;