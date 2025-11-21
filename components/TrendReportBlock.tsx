import { TrendReport } from "@/types/chat";

type Props = {
  report: TrendReport;
  onCompare: () => void;
  onSkip: () => void;
};

export default function TrendReportBlock({ report, onCompare, onSkip }: Props) {
  return (
    <div className="trend-analysis-report bg-white p-4 rounded-lg border my-2">
      <h4 className="font-bold mb-2">📊 トレンド分析レポート</h4>
      <div className="mb-2">{report.summary}</div>
      <ul className="mb-2">
        {report.metrics.map((m, i) => (
          <li key={i}>{m.label}: {m.value}</li>
        ))}
      </ul>
      <div className="mb-2">
        <strong>主要インサイト</strong>
        <ul>
          {report.insights.map((ins, i) => <li key={i}>{ins}</li>)}
        </ul>
      </div>
      <div className="mb-2">
        <strong>配信プラットフォーム分布</strong>
        <ul>
          {report.platforms.map((p, i) => <li key={i}>{p.name}: {p.percent}%</li>)}
        </ul>
      </div>
      <div className="flex gap-2 mt-2">
        <button className="apply-btn" onClick={onCompare}>比較分析を開始</button>
        <button className="reject-btn" onClick={onSkip}>改善提案へスキップ</button>
      </div>
    </div>
  );
}