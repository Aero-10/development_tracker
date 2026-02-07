import express from "express";
import Item from "../models/Item.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Get all items for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const items = await Item
      .find({ userId: req.user.userId })
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Create new item
router.post("/", auth, async (req, res) => {
  try {
    const newItem = await Item.create({
      ...req.body,
      userId: req.user.userId
    });

    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// Update item
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Item.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// Delete item
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Item.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!deleted) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
