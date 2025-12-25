import { useEffect, useRef, useState } from "react";
import type { GameState } from "../types/game";

const WS_URL = import.meta.env.VITE_WS_URL;

export function useGameSocket() {
  const wsRef = useRef<WebSocket | null>(null);

  const [playerId] = useState(() => {
    const stored = localStorage.getItem("playerId");
    if (stored) return stored;

    const id = crypto.randomUUID();
    localStorage.setItem("playerId", id);
    return id;
  });

  const [symbol, setSymbol] = useState<"X" | "O" | null>(null);
  const [game, setGame] = useState<GameState | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "INIT", playerId }));
    };

    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);

      switch (msg.type) {
        case "GAME_CREATED":
          setSymbol("X");
          setGame({
            code: msg.code,
            board: "         ",
            turn: "X",
            status: "waiting",
            isDraw: false,
          } as GameState);
          break;

        case "GAME_JOINED":
          setSymbol(msg.symbol);
          setGame(msg.state);
          break;

        case "STATE":
          setGame(msg.state);
          break;

        case "ERROR":
          setError(msg.message);
          break;
      }
    };

    return () => ws.close();
  }, [playerId]);

  const createGame = () => {
    wsRef.current?.send(JSON.stringify({ type: "CREATE_GAME" }));
  };

  const joinGame = (code: string) => {
    wsRef.current?.send(JSON.stringify({ type: "JOIN_GAME", code }));
  };

  const makeMove = (index: number) => {
    wsRef.current?.send(JSON.stringify({ type: "MOVE", index }));
  };

  return {
    game,
    symbol,
    error,
    createGame,
    joinGame,
    makeMove,
  };
}
