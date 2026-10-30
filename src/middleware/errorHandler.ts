import { ServerResponse } from "node:http";

export function sendError(res: ServerResponse,  statusCode: number, message: string): void {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify({success: false, error: message }));
}