import { IncomingMessage, ServerResponse } from "node:http";
import { items, generateId } from "../data/store";
import { Item } from "../models/item";
import { sendError } from "../middleware/errorHandler";

export async function handleItemRoutes(req: IncomingMessage, res: ServerResponse) {
  const method = req.method;
  const url = req.url || "";
  
  // Route matching (replaces Express router)
  const match = url.match(/^\/items\/(\d+)$/);
  const id = match ? Number(match[1]) : null;

  // 1. GET /items
  if (url === "/items" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ success: true, data: items }));
  }

  // 2. POST /items
  if (url === "/items" && method === "POST") {
    let body = "";
    // In raw Node, you have to manually grab the body data chunk by chunk
   req.on("data", (chunk: any) => { body += chunk.toString(); });
    req.on("end", () => {
      try {
        if (!body) throw new Error("Request body is missing");
        const { name, quantity, purchased } = JSON.parse(body);

        if (!name || typeof name !== "string") {
          return sendError(res, 400, "Field 'name' is required");
        }

        const newItem: Item = {
          id: generateId(),
          name: name.trim(),
          quantity: quantity ?? 1,
          purchased: purchased ?? false,
          createdAt: new Date().toISOString(),
        };

        items.push(newItem);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, data: newItem }));
      } catch (err: any) {
        sendError(res, 400, err.message || "Invalid JSON");
      }
    });
    return;
  }

  // 3. GET /items/:id
  if (id !== null && method === "GET") {
    const item = items.find((i) => i.id === id);
    if (!item) return sendError(res, 404, "Item not found");
    
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ success: true, data: item }));
  }

  // 4. PUT /items/:id
  if (id !== null && method === "PUT") {
    const itemIndex = items.findIndex((i) => i.id === id);
    if (itemIndex === -1) return sendError(res, 404, "Item not found");

    let body = "";
    req.on("data", (chunk) => { body += chunk.toString(); });
    req.on("end", () => {
      try {
        const { name, quantity, purchased } = JSON.parse(body);
        
        if (name !== undefined) items[itemIndex].name = name;
        if (quantity !== undefined) items[itemIndex].quantity = quantity;
        if (purchased !== undefined) items[itemIndex].purchased = purchased;

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, data: items[itemIndex] }));
      } catch (err) {
        sendError(res, 400, "Invalid JSON");
      }
    });
    return;
  }

  // 5. DELETE /items/:id
  if (id !== null && method === "DELETE") {
    const index = items.findIndex((i) => i.id === id);
    if (index === -1) return sendError(res, 404, "Item not found");

    items.splice(index, 1);
    res.writeHead(204); // 204 No Content
    return res.end();
  }

  // 6. 404 Fallback for unmatched routes
  sendError(res, 404, "Route not found");
}