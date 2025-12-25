// src/ws.ts
import { WebSocketServer } from "ws";

export function initWS(server: any) {
  const wss = new WebSocketServer({ server });

  console.log("✅ WebSocket server initialized");

  wss.on("connection", (ws) => {
    console.log("🔌 Client connected");

    ws.on("close", () => {
      console.log("❌ Client disconnected");
    });

    ws.send(JSON.stringify({ type: "CONNECTED" }));
  });
}
