import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function TicketForm({ isOpen, onClose, editTicket, onUpdate }) {
  console.log("TicketForm on TicketPage:", {
    isOpen,
    editTicket,
    isOpenType: typeof isOpen,
    isOpenValue: isOpen,
    strictCheck: isOpen === false,
  });

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
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ticketData),
        });

        if (!response.ok) {
          throw new Error("Failed to update ticket");
        }

        const updatedTicket = await response.json();
        alert("Ticket updated successfully!");
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
        <Form.Label className="text-white">Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          value={ticketData.name}
          onChange={(e) =>
            setTicketData({ ...ticketData, name: e.target.value })
          }
          required
          aria-required="true"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formTicketQuantity">
        <Form.Label className="text-white">Number of Tickets</Form.Label>
        <div
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
          role="group"
          aria-labelledby="formTicketQuantity"
        >
          <Button
            variant="secondary"
            type="button"
            onClick={handleDecrease}
            style={{ backgroundColor: "#C8102E", borderColor: "#C8102E" }}
            aria-label="Decrease number of tickets"
            disabled={ticketData.numTickets <= 1}
          >
            −
          </Button>
          <span className="text-white" aria-live="polite" aria-atomic="true">
            {ticketData.numTickets}
          </span>
          <Button
            variant="secondary"
            type="button"
            onClick={handleIncrease}
            style={{ backgroundColor: "#C8102E", borderColor: "#C8102E" }}
            aria-label="Increase number of tickets"
          >
            +
          </Button>
        </div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicTotal">
        <Form.Label className="text-white">Total Cost</Form.Label>
        <Form.Control
          type="text"
          value={`$${ticketData.totalCost}`}
          readOnly
          aria-label={`Total cost: $${ticketData.totalCost}`}
          aria-live="polite"
        />
      </Form.Group>

      {editTicket ? (
        // Edit mode - show Save and Cancel buttons
        <div className="d-flex gap-2">
          <Button variant="primary" type="submit" disabled={Submitting}>
            {Submitting ? "Saving..." : "Save Changes"}
          </Button>
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
        </div>
      ) : (
        // Create mode - show Purchase button only
        <Button
          variant="primary"
          style={{
            backgroundColor: "#C8102E",
            borderColor: "#C8102E",
            fontSize: "x-large",
          }}
          type="submit"
          disabled={Submitting}
        >
          {Submitting ? "Submitting..." : "Purchase"}
        </Button>
      )}
    </Form>
  );

  if (editTicket) {
    if (!isOpen) return null;

    return (
      <Modal
        show={isOpen}
        onHide={onClose}
        centered
        aria-labelledby="edit-ticket-modal-title"
      >
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "rgb(44, 44, 44)",
            borderBottom: "1px solid #374151",
          }}
        >
          <Modal.Title id="edit-ticket-modal-title" style={{ color: "white" }}>
            Edit Ticket
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#1f2937" }}>
          {formContent}
        </Modal.Body>
      </Modal>
    );
  }

  if (isOpen === false && editTicket === null) {
    return null;
  }

  return (
    <Container>
      <h2>Purchase Tickets</h2>
      {formContent}
    </Container>
  );
}

TicketForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  editTicket: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    numTickets: PropTypes.number.isRequired,
    totalCost: PropTypes.number.isRequired,
  }),
  onUpdate: PropTypes.func.isRequired,
};
