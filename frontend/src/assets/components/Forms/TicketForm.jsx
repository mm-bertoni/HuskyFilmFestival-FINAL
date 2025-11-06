import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";

export default function TicketForm() {
  const [ticketData, setTicketData] = useState({ name: "", numTickets: 1, totalCost: 5 });
  const ticketPrice = 5;

  const handleIncrease = () => {
    setTicketData(prev => ({
      ...prev,
      numTickets: prev.numTickets + 1,
      totalCost: (prev.numTickets + 1) * ticketPrice
    }));
  };

  const handleDecrease = () => {
    setTicketData(prev => ({
      ...prev,
      numTickets: prev.numTickets > 1 ? prev.numTickets - 1 : 1,
      totalCost: (prev.numTickets > 1 ? prev.numTickets - 1 : 1) * ticketPrice
    }));
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    console.log("Ticket Purchase:", ticketData);
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={ticketData.name}
            onChange={(e) => setTicketData({ ...ticketData, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTickets">
          <Form.Label>Number of Tickets</Form.Label>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Button variant="secondary" type="button" onClick={handleDecrease}>−</Button>
            <span>{ticketData.numTickets}</span>
            <Button variant="secondary" type="button" onClick={handleIncrease}>+</Button>
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTotal">
          <Form.Label>Total Cost</Form.Label>
          <Form.Control type="text" value={`$${ticketData.totalCost}`} readOnly />
        </Form.Group>

        <Button variant="primary" type="submit">
          Purchase
        </Button>
      </Form>
    </Container>
  );
}
