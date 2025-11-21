import { ComparisonResult } from "@/types/chat";

type Props = {
  result: ComparisonResult;
  onNext: () => void;
};

export default function ComparisonBlock({ result, onNext }: Props) {
  return (
    <div className="comparison-report bg-white p-4 rounded-lg border my-2">
      <h4 className="font-bold mb-2">🔄 比較分析レポート</h4>
      <table className="w-full text-sm mb-2">
        <thead>
          <tr>
            <th>項目</th>
            <th>トレンド</th>
            <th>あなたの広告</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>フォーマット</td>
            <td>{result.trend.format}</td>
            <td>{result.yourAd.format}</td>
          </tr>
          <tr>
            <td>ターゲット層</td>
            <td>{result.trend.target}</td>
            <td>{result.yourAd.target}</td>
          </tr>
          <tr>
            <td>メッセージタイプ</td>
            <td>{result.trend.message}</td>
            <td>{result.yourAd.message}</td>
          </tr>
          <tr>
            <td>配信プラットフォーム</td>
            <td>{result.trend.platform}</td>
            <td>{result.yourAd.platform}</td>
          </tr>
        </tbody>
      </table>
      <div className="mb-2">
        <strong>💡 改善推奨事項</strong>
        <ul>
          {result.recommendations.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      </div>
      <button className="apply-btn" onClick={onNext}>改善提案を作成</button>
    </div>
  );
}