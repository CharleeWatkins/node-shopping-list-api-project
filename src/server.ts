import { createServer } from "node:http";
import { handleItemRoutes } from "./routes/items";
import { sendError } from "./middleware/errorHandler";

const PORT = 3000;

const server = createServer((req, res) => {
  // Handle root health check
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ success: true, data: "Shopping List API is running" }));
  }

  // Pass all other requests to our router
  if (req.url?.startsWith("/items")) {
    handleItemRoutes(req, res).catch((err) => {
      sendError(res, 500, "Internal Server Error");
    });
  } else {
    sendError(res, 404, "Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});