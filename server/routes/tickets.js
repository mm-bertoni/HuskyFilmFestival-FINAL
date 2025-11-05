import express from "express";
import { connectDB } from "../connect.js";

const router = express.Router();

// GET all tickets
router.get("/", async (req, res) => {
  try {
    const db = await connectDB();
    const tickets = await db.collection("Tickets").find({}).toArray();
    res.json(tickets);
  } catch (err) {
    console.error("Error fetching tickets:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET a single ticket by ID
router.get("/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const { ObjectId } = await import("mongodb");
    const ticket = await db.collection("Tickets").findOne({ 
      _id: new ObjectId(req.params.id) 
    });
    
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    
    res.json(ticket);
  } catch (err) {
    console.error("Error fetching ticket:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST a new ticket
router.post("/", async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db.collection("Tickets").insertOne(req.body);
    
    // Return the created ticket with its new _id
    const newTicket = { _id: result.insertedId, ...req.body };
    res.status(201).json(newTicket);
  } catch (err) {
    console.error("Error creating ticket:", err);
    res.status(500).json({ error: err.message });
  }
});

// PUT (update) a ticket
router.put("/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const { ObjectId } = await import("mongodb");
    const { _id, ...updateData } = req.body; // Remove _id from update data
    
    const result = await db.collection("Tickets").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    
    res.json({ message: "Ticket updated successfully" });
  } catch (err) {
    console.error("Error updating ticket:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE a ticket
router.delete("/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const { ObjectId } = await import("mongodb");
    
    const result = await db.collection("Tickets").deleteOne({ 
      _id: new ObjectId(req.params.id) 
    });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    
    res.json({ message: "Ticket deleted successfully" });
  } catch (err) {
    console.error("Error deleting ticket:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;