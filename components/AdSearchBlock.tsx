import { AdCard } from "@/types/chat";
import { motion } from "framer-motion";
import { Search, CheckCircle2, BarChart3, Calendar, MousePointerClick, Sparkles } from "lucide-react";

type Props = {
  ads: AdCard[];
  selected: string[];
  onSelect: (id: string) => void;
  onConfirm: () => void;
};

export default function AdSearchBlock({ ads, selected, onSelect, onConfirm }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden w-full">
      
      {/* Header */}
      <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-700">
          <Search size={18} className="text-blue-500" />
          <h4 className="font-bold text-sm">検索結果: {ads.length}件</h4>
        </div>
        <div className="text-xs text-gray-400 flex items-center gap-1">
          <MousePointerClick size={14} />
          分析したいクリエイティブを選択
        </div>
      </div>

      {/* Grid */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ads.map((ad) => {
          const isSelected = selected.includes(ad.id);

          return (
            <motion.div
              key={ad.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(ad.id)}
              className={`
                relative group cursor-pointer rounded-xl border transition-all duration-200 overflow-hidden
                ${isSelected 
                  ? "border-blue-500 ring-2 ring-blue-500 ring-offset-2 bg-blue-50/30" 
                  : "border-gray-200 hover:border-blue-300 hover:shadow-md bg-white"
                }
              `}
            >
              {/* Selection Indicator */}
              <div className={`absolute top-2 right-2 z-10 transition-opacity duration-200 ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`}>
                 <CheckCircle2 className={`${isSelected ? "text-blue-600 fill-white" : "text-gray-400"}`} />
              </div>

              {/* Content Container */}
              <div className="p-3">
                {/* Brand & Date Row */}
                <div className="flex justify-between items-start mb-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{ad.brand}</div>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                        <Calendar size={10} />
                        {ad.dateDisplay}
                    </div>
                </div>

                {/* Title / Visual Placeholder */}
                <div className="flex gap-3">
                    {/* Fake Thumbnail */}
                    <div className={`w-16 h-16 rounded-lg shrink-0 flex items-center justify-center ${isSelected ? 'bg-blue-200' : 'bg-gray-100'}`}>
                        <span className="text-2xl">🖼️</span>
                    </div>
                    
                    <div>
                        <div className="font-bold text-sm text-gray-800 leading-snug line-clamp-2 mb-2">
                            {ad.title}
                        </div>
                        
                        {/* Metrics Badge */}
                        <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ${isSelected ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                            <BarChart3 size={12} />
                            {ad.engagement} <span className="text-[10px] opacity-70">Eng.</span>
                        </div>
                    </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
        <div className="text-sm font-medium text-gray-600">
          <span className={selected.length > 0 ? "text-blue-600 font-bold" : ""}>{selected.length}</span> 
          <span className="text-xs ml-1 text-gray-500">件選択中</span>
        </div>

        <button
          onClick={onConfirm}
          disabled={selected.length === 0}
          className={`
            flex items-center gap-2 px-5 py-2 rounded-lg font-bold text-sm transition-all shadow-sm
            ${selected.length > 0 
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-md active:scale-95" 
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          <Sparkles size={16} />
          分析を開始
        </button>
      </div>
    </div>
  );
}