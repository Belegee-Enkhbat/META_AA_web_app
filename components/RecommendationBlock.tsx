import React, { useState } from 'react';
import { Recommendation, recCard } from '@/types/chat'; // Assuming AdCard is the correct type
import { Check, X } from 'lucide-react';

interface RecommendationsBlockProps {
  recommendations: Recommendation[]; // Now has the 'cards' property
  onApplyAll: () => void;
  onRejectAll: () => void;
  disabled: boolean;
}

// Function to initialize all card IDs to true
const initializeDefaultSelectedState = (recommendations: Recommendation[]) => {
  const defaultState: Record<string, boolean> = {};
  recommendations.forEach(rec => {
    rec.cards.forEach(card => {
      defaultState[card.id] = true;
    });
  });
  return defaultState;
};

export default function RecommendationsBlock({
  recommendations,
  onApplyAll,
  onRejectAll,
  disabled,
}: RecommendationsBlockProps) {
  const [expandedRecId, setExpandedRecId] = useState<string | null>(null);
  
  // FIX: Initialize selectedCardStates using the function to set all card IDs to true
  const [selectedCardStates, setSelectedCardStates] = useState<Record<string, boolean>>(
    initializeDefaultSelectedState(recommendations)
  );

  const toggleCardSelection = (cardId: string) => {
    setSelectedCardStates((prev) => ({
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
          // Main container for an individual recommendation
          <div key={rec.id} className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
            
            {/* Recommendation Header (Simulating the blue bar from the image) */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    {/* Display index+1 for the circle number */}
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                        {rec.id} 
                    </div>
                    <p className="font-semibold text-gray-800">{rec.title}</p>
                </div>
                {/* Display impact, using the string from your data */}
                <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">{rec.impact}</span> 
            </div>

            {/* Recommendation Description */}
            <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
            
            {/* Individual Card Items - Visible only when expanded */}
            {/* **FIX:** Checks for rec.cards existence and length to prevent rendering an empty container */}
            {expandedRecId === rec.id && rec.cards && rec.cards.length > 0 && (
                <div className="mt-4 space-y-3">
                    {/* Iterate over the cards associated with this recommendation */}
                    {rec.cards.map((card: recCard) => ( // Changed 'recCard' to 'AdCard' for typical import usage
                        <div 
                            key={card.id} 
                            className="bg-blue-50 p-4 rounded-lg border border-blue-200"
                        >
                            {/* Card Header (Main Text / Subtext) */}
                            <div className='flex justify-between items-center text-sm font-semibold text-blue-800 mb-2'>
                                <span>{card.title}</span> {/* e.g., メインテキスト */}
                                <span>{card.points}</span> {/* e.g., 1 */}
                            </div>

                            {/* Card Details and Action */}
                            <div className='flex items-center justify-between'>
                                <div className="flex items-start gap-3">
                                    {/* Custom Checkbox mimicking the image's check icon and blue background */}
                                    <div className={`w-5 h-5 rounded flex items-center justify-center text-white ${
                                        selectedCardStates[card.id] ? 'bg-blue-600' : 'bg-gray-300'
                                    }`}>
                                        <Check size={14} />
                                    </div>
                                    <div className='text-sm text-gray-700'>
                                        <p className="font-semibold">{card.subtitle}</p> {/* e.g., フォントサイズ最適化 */}
                                        <p className="font-bold my-1">{card.details}</p> {/* e.g., 14px → 20px に変更 */}
                                        <p className='text-xs text-gray-500'>{card.rationale}</p> {/* e.g., Meta推奨基準に準拠 */}
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    {/* Preview Button (Placeholder) */}
                                    <button className="text-sm py-1 px-3 rounded bg-white border border-gray-300 text-gray-700 hover:bg-gray-100">
                                        プレビュー
                                    </button>
                                    {/* Apply/Toggle Button */}
                                    <button 
                                        onClick={() => toggleCardSelection(card.id)}
                                        className={`text-sm py-1 px-3 rounded font-bold text-white transition ${
                                            selectedCardStates[card.id] ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'
                                        }`}
                                    >
                                        {selectedCardStates[card.id] ? '取消' : '適用'} {/* Added toggle logic for apply/cancel */}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {/* Toggle Button for the Recommendation */}
            {rec.cards && rec.cards.length > 0 && (
                <div className="flex justify-center mt-3 pt-3 border-t border-gray-100">
                    <button
                        className="text-sm py-1 px-4 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                        onClick={() =>
                            setExpandedRecId(expandedRecId === rec.id ? null : rec.id)
                        }>
                        {expandedRecId === rec.id ? (
                            <>
                                詳細を非表示 <span className="ml-1">▲</span>
                            </>
                        ) : (
                            <>
                                詳細を見る <span className="ml-1">▼</span>
                            </>
                        )}
                    </button>
                </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Overall Apply/Reject Buttons */}
      <div className="flex gap-4 pt-4 border-t border-gray-100">
        <button
          onClick={onApplyAll}
          disabled={disabled}
          className={`flex-1 py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
            disabled ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 shadow-md' 
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