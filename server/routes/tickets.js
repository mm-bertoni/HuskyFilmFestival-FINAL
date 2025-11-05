import express from "express";
import { connectDB } from "../connect.js";

const router = express.Router();

// GET all tickets
router.get("/", async (req, res) => {
  try {
    const db = await connectDB();
    const tickets = await db.collection("tickets").find({}).toArray();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new ticket
router.post("/", async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db.collection("tickets").insertOne(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
