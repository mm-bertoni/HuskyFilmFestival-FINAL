import { useState, useEffect } from "react";
import { Trash2, RefreshCw, AlertCircle, ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../authContext";
import TicketForm from "../Forms/TicketForm";



export default function AdminTicketList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [isReversed, setIsReversed] = useState(false);
  const navigate = useNavigate();
  const {logout} = useAuth();
  

  const handleLogout = async () => {
    await logout();
    navigate("/filmAdmin");
  };

  const handleFilmPage = () => {
    navigate("/loggedInAdmin");
  };

  // Fetch tickets from API (same origin)
  const fetchTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/tickets");
      if (!response.ok) throw new Error("Failed to fetch tickets");
      const data = await response.json();
      setTickets(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a ticket
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;

    setDeleting(id);
    try {
      const response = await fetch(`/api/tickets/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete ticket");

      // Remove ticket from state
      setTickets(tickets.filter((ticket) => ticket._id !== id));
    } catch (err) {
      alert("Error deleting ticket: " + err.message);
    } finally {
      setDeleting(null);
    }
  };

  //Edit
  const handleEditClick = (ticket) => {
    setEditingTicket(ticket);
    setIsEditModalOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTicket(null);
  };

  // Handle ticket update
  const handleTicketUpdate = (updatedTicket) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket._id === updatedTicket._id ? updatedTicket : ticket
      )
    );
  };

  // Handle reversing list
  const handleToggleOrder = () => {
    setTickets([...tickets].reverse());
    setIsReversed(!isReversed);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

 
  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        role="status"
        aria-live="polite"
      >
        <div className="text-center">
          <RefreshCw
            className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2"
            aria-hidden="true"
          />
          <p className="text-gray-600">Loading tickets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        role="alert"
      >
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <AlertCircle
            className="w-8 h-8 text-red-600 mx-auto mb-3"
            aria-hidden="true"
          />
          <h2 className="text-red-800 font-semibold text-center mb-2">
            Error Loading Tickets
          </h2>
          <p className="text-red-600 text-center mb-4">{error}</p>
          <button
            onClick={fetchTickets}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Calculate total revenue
  const totalRevenue = tickets.reduce(
    (sum, ticket) => sum + (ticket.totalCost || 0),
    0
  );
  const totalTicketsSold = tickets.reduce(
    (sum, ticket) => sum + (ticket.numTickets || 0),
    0
  );

  return (
    <div className="min-h-screen py-8 px-4">
      <main className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mt-4">
                Ticket Manager
              </h1>
              <p className="text-gray-600 mt-1" aria-live="polite">
                {tickets.length} {tickets.length === 1 ? "order" : "orders"}
              </p>
            </div>
            <nav aria-label="Admin actions" className="flex gap-2 flex-wrap">
              <button
                onClick={handleFilmPage}
                className="flex items-center gap-2 bg-blue-600 text-black py-2 px-4 rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Film Approval
              </button>
              <button
                onClick={handleToggleOrder}
                className="flex items-center gap-2 bg-blue-600 text-black py-2 px-4 rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label={
                  isReversed ? "Show oldest first" : "Show newest first"
                }
              >
                <ArrowUpDown className="w-4 h-4" aria-hidden="true" />
                Reverse Order
              </button>
              <button
                onClick={fetchTickets}
                className="flex items-center gap-2 bg-blue-600 text-black py-2 px-4 rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Refresh ticket list"
              >
                <RefreshCw className="w-4 h-4" aria-hidden="true" />
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-blue-600 text-black py-2 px-4 rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Logout
              </button>
            </nav>
          </div>

          {/* Summary Statistics */}
          {tickets.length > 0 && (
            <section
              aria-labelledby="summary-heading"
              className="border-t pt-4 grid grid-cols-2 gap-4"
            >
              <h2 id="summary-heading">Ticket Sales Summary</h2>
              <div>
                <span className="text-sm text-gray-600">
                  Total Tickets Sold:
                </span>
                <div
                  className="text-2xl font-bold text-blue-600"
                  aria-label={`${totalTicketsSold} tickets sold`}
                >
                  {totalTicketsSold}
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-600">Total Revenue:</span>
                <div
                  className="text-2xl font-bold text-green-600"
                  aria-label={`$${totalRevenue.toFixed(2)} total revenue`}
                >
                  ${totalRevenue.toFixed(2)}
                </div>
              </div>
              <div className="text-left">
                <span
                  className="text-sm text-gray-600 text-left"
                  aria-live="polite"
                >
                  Currently showing:{" "}
                  {isReversed ? "Newest first" : "Oldest first"}
                </span>
              </div>
            </section>
          )}
        </header>

        {/* Tickets List */}
        {tickets.length === 0 ? (
          <div
            className="bg-white rounded-lg shadow-sm p-12 text-center"
            role="status"
          >
            <p className="text-gray-500 text-lg">No tickets found</p>
          </div>
        ) : (
          <section
            aria-labelledby="tickets-heading"
            className="rounded-lg shadow-sm overflow-hidden"
          >
            <h2 id="tickets-heading">Ticket Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full" style={{ tableLayout: "auto" }}>
                <thead className="border-b border-gray-200">
                  <tr>
                    <th
                      scope="col"
                      className="text-left py-8 px-6 text-sm font-semibold text-gray-700"
                      style={{ width: "25%" }}
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-center py-8 px-6 text-sm font-semibold text-gray-700"
                      style={{ width: "25%" }}
                    >
                      Number of Tickets
                    </th>
                    <th
                      scope="col"
                      className="text-center py-8 px-6 text-sm font-semibold text-gray-700"
                      style={{ width: "20%" }}
                    >
                      Total Cost
                    </th>
                    <th
                      scope="col"
                      className="text-center py-8 px-6 text-sm font-semibold text-gray-700"
                      style={{ width: "30%" }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tickets.map((ticket) => (
                    <tr
                      key={ticket._id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="py-8 px-6 text-sm text-gray-900 font-medium">
                        {ticket.name || "N/A"}
                      </td>
                      <td className="py-8 px-6 text-sm text-gray-900 text-center">
                        <span className="inline-flex items-center justify-center min-w-8 h-8 px-3 rounded-full bg-blue-100 text-blue-800 font-semibold">
                          {ticket.numTickets || 0}
                        </span>
                      </td>
                      <td className="py-8 px-6 text-sm text-gray-900 text-center font-semibold">
                        ${(ticket.totalCost || 0).toFixed(2)}
                      </td>
                      <td className="py-8 px-6 text-center">
                        <button
                          onClick={() => handleDelete(ticket._id)}
                          disabled={deleting === ticket._id}
                          className="inline-flex items-center gap-2 text-red-600 hover:text-red-800 hover:bg-red-50 py-2 px-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                          aria-label={`Delete ticket order for ${ticket.name || "N/A"}`}
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                          {deleting === ticket._id ? "Deleting..." : "Delete"}
                        </button>
                        <button
                          onClick={() => handleEditClick(ticket)}
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 py-2 px-3 rounded-lg transition ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          aria-label={`Edit ticket order for ${ticket.name || "N/A"}`}
                        >
                          <span aria-hidden="true">✏️</span> Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
      <TicketForm
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        editTicket={editingTicket}
        onUpdate={handleTicketUpdate}
      />
    </div>
  );
}
