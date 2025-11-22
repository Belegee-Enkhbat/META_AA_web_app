import React from 'react';
import { Recommendation } from '@/types/chat';
import { Check, X } from 'lucide-react';

interface RecommendationsBlockProps {
  recommendations: Recommendation[];
  onApplyAll: () => void;
  onRejectAll: () => void;
  disabled: boolean;
}

export default function RecommendationsBlock({ recommendations, onApplyAll, onRejectAll, disabled }: RecommendationsBlockProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 space-y-4">
      <h3 className="text-xl font-bold text-gray-800">推奨事項 ({recommendations.length} 件)</h3>
      <div className="space-y-3">
        {recommendations.map((rec) => (
          <div key={rec.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="font-semibold text-gray-700">{rec.title}</p>
            <p className="text-xs text-gray-500 mt-1">{rec.description}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-4 pt-4 border-t border-gray-100">
        <button
          onClick={onApplyAll}
          disabled={disabled}
          className={`flex-1 py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
            disabled ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700 shadow-md'
          }`}
        >
          <Check size={20} /> すべて適用
        </button>
        <button
          onClick={onRejectAll}
          disabled={disabled}
          className={`flex-1 py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
            disabled ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600 shadow-md'
          }`}
        >
          <X size={20} /> すべて見送り
        </button>
      </div>
    </div>
  );
}