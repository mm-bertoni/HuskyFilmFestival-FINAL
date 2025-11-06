import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";

export default function TicketForm({ isOpen, onClose, editTicket, onUpdate }) {
  const [ticketData, setTicketData] = useState({
    name: "",
    numTickets: 1,
    totalCost: 5,
  });
  const ticketPrice = 5;

  const [Submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editTicket) {
      setTicketData({
        name: editTicket.name,
        numTickets: editTicket.numTickets,
        totalCost: editTicket.totalCost,
      });
    } else {
      setTicketData({ name: "", numTickets: 1, totalCost: 5 });
    }
  }, [editTicket]);

  const handleIncrease = () => {
    setTicketData((prev) => ({
      ...prev,
      numTickets: prev.numTickets + 1,
      totalCost: (prev.numTickets + 1) * ticketPrice,
    }));
  };

  const handleDecrease = () => {
    setTicketData((prev) => ({
      ...prev,
      numTickets: prev.numTickets > 1 ? prev.numTickets - 1 : 1,
      totalCost: (prev.numTickets > 1 ? prev.numTickets - 1 : 1) * ticketPrice,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editTicket) {
        const response = await fetch(`/api/tickets/${editTicket._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ticketData),
        });

        if (!response.ok) {
          throw new Error('Failed to update ticket');
        }

        const updatedTicket = await response.json();
        alert('Ticket updated successfully!');
        onUpdate(updatedTicket); 
        onClose(); 

      } else {
        const response = await fetch("/api/tickets", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ticketData),
        });

        console.log(response);

        if (!response.ok) {
          throw new Error("Failed to purchase tickets");
        }

        alert("Tickets purchased successfully!");
        console.log("Ticket Purchase:", ticketData);

        setTicketData({ name: "", numTickets: 1, totalCost: 5 });
      }
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // The form content (reusable)
  const formContent = (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          value={ticketData.name}
          onChange={(e) => setTicketData({ ...ticketData, name: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
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

      {editTicket ? (
        // Edit mode - show Save and Cancel buttons
        <div className="d-flex gap-2">
          <Button variant="primary" type="submit" disabled={Submitting}>
            {Submitting ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      ) : (
        // Create mode - show Purchase button only
        <Button variant="primary" type="submit" disabled={Submitting}>
          {Submitting ? 'Submitting...' : 'Purchase'}
        </Button>
      )}
    </Form>
  );

  // If editing, show as modal
  if (isOpen && editTicket) {
    return (
      <Modal show={isOpen} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formContent}
        </Modal.Body>
      </Modal>
    );
  }

  // Otherwise, show as regular form in container
  return (
    <Container>
      {formContent}
    </Container>
  );
}