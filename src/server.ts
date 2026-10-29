import express from "express";
import itemsRouter from "./routes/items";
import { errorHandler } from "./middleware/errorHandler"; 

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ success: true, data: "Shopping List API is running" });
});

app.use("/items", itemsRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});