import { useState } from "react";
import { Board } from "./components/board";
import { useGameSocket } from "./hooks/useGameSocket";




export default function App() {
  const { game, symbol, createGame, joinGame, makeMove, error } =
    useGameSocket();


  const [code, setCode] = useState("");

  if (!game) {
    return (
      <div>
        <h1>Tic Tac Toe</h1>

        <button onClick={createGame}>Create Game</button>

        <div>
          <input
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
          />
          <button onClick={() => joinGame(code)}>Join</button>
        </div>

        {error && <p>{error}</p>}
      </div>
    );
  }

  const g = game;

  const isMyTurn = game.turn === symbol;

  function getStatusText() {
    if (g.status === "waiting") {
      return "Waiting for opponent to join...";
    }

    if (g.status === "playing") {
      return g.turn === symbol
        ? "Your turn"
        : "Opponent's turn";
    }

    if (g.status === "finished") {
      if (g.isDraw) return "Game ended in a draw";
      return g.winner === symbol
        ? "You won 🎉"
        : "You lost 😢";
    }

    return "";
  }

  return (
    <div>
      <h2>Game Code: {game.code}</h2>
      <h3>You are: {symbol}</h3>

      <Board
        board={game.board}
        onMove={makeMove}
        disabled={!isMyTurn || game.status !== "playing"}
      />



      <p style={{ fontWeight: "bold" }}>
        {game.status === "waiting" && "Waiting for opponent to join..."}
        {game.status === "playing" &&
          (game.turn === symbol ? "Your turn" : "Opponent's turn")}
        {game.status === "finished" &&
          (game.isDraw
            ? "Game ended in a draw"
            : game.winner === symbol
              ? "You won 🎉"
              : "You lost 😢")}
      </p>


      {game.status === "finished" && (
        <h2>
          {game.isDraw
            ? "Draw"
            : `Winner: ${game.winner}`}
        </h2>
      )}
    </div>
  );
}
