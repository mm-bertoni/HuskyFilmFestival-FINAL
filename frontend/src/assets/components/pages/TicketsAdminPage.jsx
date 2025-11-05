import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Navbar from "./Navbar"; // your existing Navbar

export default function TicketsPageAdmin() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tickets from backend
  useEffect(() => {
    async function fetchTickets() {
      try {
        const response = await fetch("http://localhost:3000/tickets");
        if (!response.ok) throw new Error("Failed to fetch tickets");
        const data = await response.json();
        setTickets(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTickets();
  }, []);

  return (
    <>
      <Navbar />
      <Container className="mt-4">
        <h1>Tickets Admin</h1>

        {loading ? (
          <p>Loading tickets...</p>
        ) : tickets.length === 0 ? (
          <p>No tickets found.</p>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Number of Tickets</th>
                <th>Total Cost</th>
                <th>Purchased At</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket._id}>
                  <td>{ticket.name}</td>
                  <td>{ticket.numTickets}</td>
                  <td>${ticket.totalCost}</td>
                  <td>
                    {ticket.createdAt
                      ? new Date(ticket.createdAt).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
}
