import express from "express";
import { getDB } from "../db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Helper to get the tickets collection
function getTicketsCollection() {
  const db = getDB();
  return db.collection("tickets"); // Make sure the collection name matches your Atlas collection
}

// CREATE a ticket
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required" });
  }

  try {
    const result = await getTicketsCollection().insertOne({
      title,
      description,
    });
    res.status(201).json({ id: result.insertedId, title, description });
  } catch (err) {
    console.error("Error creating ticket:", err.message);
    res.status(500).json({ error: "Failed to create ticket" });
  }
});

// READ all tickets
router.get("/", async (req, res) => {
  try {
    const tickets = await getTicketsCollection().find().toArray();
    res.json(tickets);
  } catch (err) {
    console.error("Error fetching tickets:", err.message);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
});

// READ one ticket by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await getTicketsCollection().findOne({
      _id: new ObjectId(id),
    });
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });
    res.json(ticket);
  } catch (err) {
    console.error("Error fetching ticket:", err.message);
    res.status(500).json({ error: "Failed to fetch ticket" });
  }
});

// UPDATE a ticket by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const result = await getTicketsCollection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { title, description } },
      { returnDocument: "after" }
    );

    if (!result.value)
      return res.status(404).json({ error: "Ticket not found" });
    res.json(result.value);
  } catch (err) {
    console.error("Error updating ticket:", err.message);
  }
});
