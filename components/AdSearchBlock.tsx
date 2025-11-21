import { AdCard } from "@/types/chat";

type Props = {
  ads: AdCard[];
  selected: string[];
  onSelect: (id: string) => void;
  onConfirm: () => void;
};

export default function AdSearchBlock({ ads, selected, onSelect, onConfirm }: Props) {
  return (
    <div className="ad-search-results bg-white p-4 rounded-lg border my-2">
      <h4 className="font-bold mb-2">広告検索結果</h4>
      <div className="ad-cards-grid grid grid-cols-1 md:grid-cols-2 gap-4">
        {ads.map(ad => (
          <div
            key={ad.id}
            className={`ad-card border rounded-lg p-3 cursor-pointer ${selected.includes(ad.id) ? "bg-blue-100 border-blue-600" : ""}`}
            onClick={() => onSelect(ad.id)}
          >
            <div className="font-bold">{ad.title}</div>
            <div className="text-sm text-gray-500">{ad.brand}</div>
            <div className="text-xs text-gray-400">{ad.dateDisplay}</div>
            <div className="text-xs text-gray-400">{ad.engagement} エンゲージメント</div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <span>{selected.length} 選択済み</span>
        <button className="apply-btn" onClick={onConfirm} disabled={selected.length === 0}>分析を開始</button>
      </div>
    </div>
  );
}