type Props = { score: number; accountId: string };

export default function ScoreBlock({ score, accountId }: Props) {
  return (
    <div className="opportunity-score-display flex gap-6 items-center bg-white p-6 rounded-lg border my-4">
      <div className="score-circle-meta relative w-[120px] h-[120px]">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#e0e0e0" strokeWidth="8"/>
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke="#0066cc"
            strokeWidth="8"
            strokeDasharray="339.3"
            strokeDashoffset={339.3 - (339.3 * score / 100)}
            transform="rotate(-90 60 60)"
          />
        </svg>
       <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="score-num text-3xl font-bold text-blue-600">{score}</span>
        <span className="score-label text-xs text-gray-500">ポイント</span>
        </div>
      </div>
      <div>
        <h3 className="font-bold text-lg mb-1">最適化スコア</h3>
        <p className="text-gray-700 mb-1">パフォーマンスの向上に役立つ推奨事項を適用しましょう。</p>
        <p className="text-xs text-gray-400">アカウントID: {accountId}</p>
      </div>
    </div>
  );
}