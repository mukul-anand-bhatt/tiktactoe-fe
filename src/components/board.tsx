import { Cell } from "./cell";

type Props = {
  board: string;
  onMove: (i: number) => void;
  disabled: boolean;
};

export function Board({ board, onMove, disabled }: Props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 80px)",
        gap: 4,
      }}
    >
      {board.split("").map((cell, i) => (
        <Cell
          key={i}
          value={cell}
          onClick={() => !disabled && onMove(i)}
        />
      ))}
    </div>
  );
}
