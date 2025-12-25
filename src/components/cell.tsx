type Props = {
  value: string;
  onClick: () => void;
};

export function Cell({ value, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 80,
        height: 80,
        fontSize: 32,
        cursor: "pointer",
      }}
    >
      {value !== " " ? value : ""}
    </button>
  );
}
