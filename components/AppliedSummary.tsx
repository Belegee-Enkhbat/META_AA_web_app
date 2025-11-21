import { Recommendation } from "@/types/chat";

type Props = {
  applied: Recommendation[];
  rejected: Recommendation[];
};

export default function AppliedSummary({ applied, rejected }: Props) {
  const totalPoints = applied.reduce((sum, r) => sum + r.points, 0);
  return (
    <div className="applied-summary bg-green-50 border-l-4 border-green-400 rounded-lg p-4 my-2">
      <h4 className="font-bold mb-2">✅ 適用した推奨事項</h4>
      <ul className="mb-2">
        {applied.map(r => (
          <li key={r.id} className="flex justify-between">
            <span>{r.title}</span>
            <span className="text-green-700 font-bold">+{r.points}点</span>
          </li>
        ))}
      </ul>
      <div className="font-bold text-green-800">合計スコア向上: +{totalPoints}点</div>
      {rejected.length > 0 && (
        <div className="mt-2">
          <h5 className="text-red-700 font-bold">❌ 却下した推奨事項</h5>
          <ul>
            {rejected.map(r => (
              <li key={r.id} className="line-through text-gray-500">{r.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}