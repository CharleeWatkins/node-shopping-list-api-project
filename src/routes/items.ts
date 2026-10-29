import { Router, Request, Response, NextFunction } from "express";
import { items, generateId } from "../data/store";
import { Item } from "../models/item";
import { AppError } from "../middleware/errorHandler";

const router = Router();

// GET /items - Return all items
router.get("/", (_req: Request, res: Response) => {
  res.json({ success: true, data: items });
});

// POST /items - Create a new item (ADD async HERE)
router.post("/", async (req: Request, res: Response) => {
  // Safety net
  if (!req.body) {
    throw new AppError(400, "Request body is missing or invalid JSON"); // Use throw
  }

  const { name, quantity, purchased } = req.body;

  // Validation: name is required
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      success: false,
      error: "Field 'name' is required and must be a non-empty string",
    });
  }

  // Validation: quantity must be a positive number if provided
  if (quantity !== undefined && (typeof quantity !== "number" || quantity <= 0)) {
    return res.status(400).json({
      success: false,
      error: "Field 'quantity' must be a positive number",
    });
  }

  // Create the item
  const newItem: Item = {
    id: generateId(),
    name: name.trim(),
    quantity: quantity ?? 1,
    purchased: purchased ?? false,
    createdAt: new Date().toISOString(),
  };

  items.push(newItem);
  res.status(201).json({ success: true, data: newItem });
});

// GET /items/:id - Get a single item by ID
router.get("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ success: false, error: "Invalid item ID" });
  }

  const item = items.find((i) => i.id === id);

  if (!item) {
    return res.status(404).json({ success: false, error: "Item not found" });
  }

  res.json({ success: true, data: item });
});

// PUT /items/:id - Update an existing item (ADD async HERE)
router.put("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ success: false, error: "Invalid item ID" });
  }

  const item = items.find((i) => i.id === id);
  if (!item) {
    return res.status(404).json({ success: false, error: "Item not found" });
  }

  // Safety net
  if (!req.body) {
    throw new AppError(400, "Request body is missing or invalid JSON"); // Use throw
  }

  const { name, quantity, purchased } = req.body;

  if (name !== undefined && (typeof name !== "string" || name.trim() === "")) {
    return res.status(400).json({
      success: false,
      error: "Field 'name' must be a non-empty string",
    });
  }
  if (quantity !== undefined && (typeof quantity !== "number" || quantity <= 0)) {
    return res.status(400).json({
      success: false,
      error: "Field 'quantity' must be a positive number",
    });
  }
  if (purchased !== undefined && typeof purchased !== "boolean") {
    return res.status(400).json({
      success: false,
      error: "Field 'purchased' must be a boolean",
    });
  }

  if (name !== undefined) item.name = name.trim();
  if (quantity !== undefined) item.quantity = quantity;
  if (purchased !== undefined) item.purchased = purchased;

  res.json({ success: true, data: item });
});

// DELETE /items/:id - Remove an item
router.delete("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ success: false, error: "Invalid item ID" });
  }

  const index = items.findIndex((i) => i.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, error: "Item not found" });
  }

  items.splice(index, 1);
  res.status(204).send();
});

export default router;