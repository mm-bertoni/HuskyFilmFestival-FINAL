import Container from 'react-bootstrap/esm/Container';
import TicketForm from '../Forms/TicketForm';
import Navbar from '../Navbar';
import '../styles/Forms.css';

export default function TicketPage() {
  return (
    <>
      <Navbar />
      <Container>
        <h1>Tickets Page</h1>
        <TicketForm />
      </Container>
    </>
  );
}