import { WebSocketServer } from "ws";
import type { CustomWebSocket } from "./types";
import type { Request } from "express";
import url from "url";
import { WsError } from "./utilis/wsError";
import jwt from "jsonwebtoken";

const wss = new WebSocketServer({ port: 8000 });

wss.on("connection", (ws: CustomWebSocket, req: Request) => {
  const parsedUrl = url.parse(req.url, true);
  const token = parsedUrl.query.token as string;

  if (!token) {
    ws.send(JSON.stringify(new WsError("Unauthorized or invalid token")));
    ws.close();
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    ws.user = { id: decoded.id };

    console.log("WS Server connected... for", ws.user.id);
  } catch (err) {
    ws.send(JSON.stringify(new WsError("Invalid message format")));
    return;
  }

  ws.on("message", async (raw) => {
    let parsed;
    try {
      parsed = JSON.parse(raw.toString());
    } catch (err) {
      ws.send(JSON.stringify(new WsError("Invalid message format")));
      return;
    }
  });
});
