import { Recommendation } from "@/types/chat";

type Props = {
  rec: Recommendation;
  onExpand: () => void;
  onApply: () => void;
  onReject: () => void;
};

export default function SimpleRecommendation({ rec, onExpand, onApply, onReject }: Props) {
  return (
    <div className="simple-recommendation bg-white border rounded-lg p-4 my-2">
      <div className="flex items-center justify-between mb-2">
        <div className="font-bold">{rec.title}</div>
        <span className="bg-green-100 text-green-700 px-2 py-1 rounded">{rec.impact}</span>
      </div>
      <div className="text-gray-700 mb-2">{rec.description}</div>
      <ul className="list-disc pl-5 text-sm text-gray-500 mb-2">
        {rec.reasons.map((r, i) => <li key={i}>{r}</li>)}
      </ul>
      <div className="flex gap-2">
        <button className="expand-details-btn" onClick={onExpand}>詳細を表示 ▼</button>
        <button className="apply-btn" onClick={onApply}>✓ 適用</button>
        <button className="reject-btn" onClick={onReject}>✗ 却下</button>
      </div>
    </div>
  );
}