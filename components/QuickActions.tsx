type Props = {
  onSelect: (key: string) => void;
};

export default function QuickActions({ onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
      <button className="quick-action-btn" onClick={() => onSelect("media")}>
        📊 Media Operation Support AI × Optimization Score
      </button>
      <button className="quick-action-btn" onClick={() => onSelect("variation")}>
        💡 Variation Proposal ← Ad Creative Library API
      </button>
      <button className="quick-action-btn" onClick={() => onSelect("meta")}>
        📈 Meta AA Agent
      </button>
    </div>
  );
}