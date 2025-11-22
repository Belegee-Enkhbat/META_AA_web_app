import React, { useState } from 'react';
import { Recommendation, AdCard } from '@/types/chat';
import { Check, X } from 'lucide-react';
import { adCards } from '@/service/staticData'; // your static ad cards

interface RecommendationsBlockProps {
  recommendations: Recommendation[];
  onApplyAll: () => void;
  onRejectAll: () => void;
  disabled: boolean;
}

export default function RecommendationsBlock({
  recommendations,
  onApplyAll,
  onRejectAll,
  disabled,
}: RecommendationsBlockProps) {
  const [expandedRecId, setExpandedRecId] = useState<string | null>(null);
  const [selectedCards, setSelectedCards] = useState<Record<string, boolean>>({});

  const toggleCard = (cardId: string) => {
    setSelectedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 space-y-4">
      <h3 className="text-xl font-bold text-gray-800">
        推奨事項 ({recommendations.length} 件)
      </h3>

      <div className="space-y-3">
        {recommendations.map((rec) => (
          <div key={rec.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div
              className="cursor-pointer"
              
            >
              <p className="font-semibold text-gray-700">{rec.title}</p>
              <p className="text-xs text-gray-500 mt-1">{rec.description}</p>
            </div>

            <button
              className="text-xs text-blue-600 hover:text-blue-800 transition"
              onClick={() =>
                setExpandedRecId(expandedRecId === rec.id ? null : rec.id)
              }>
                
              {expandedRecId === rec.id ? '閉じる' : '詳細を見る'}
            </button>

            {/* Show checkboxes when expanded */}
            {expandedRecId === rec.id && (
              <div className="mt-2 space-y-2 border-t border-gray-200 pt-2">
                {adCards.map((card: AdCard) => (
                  <label
                    key={card.id}
                    className="flex items-center gap-2 text-sm text-gray-700 bg-white p-2 rounded hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={!!selectedCards[card.id]}
                      onChange={() => toggleCard(card.id)}
                      className="w-4 h-4 accent-green-600"
                    />
                    {card.title}
                  </label>
                ))}
              </div>
            )}
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
