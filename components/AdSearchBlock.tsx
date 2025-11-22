'use client';
import { Variants } from "framer-motion";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AdCard } from "@/types/chat";
import {
  Search,
  CheckCircle2,
  BarChart3,
  Calendar,
  MousePointerClick,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Filter,
  AlertTriangle,
} from "lucide-react";

type Props = {
  ads: AdCard[];
  selected: string[];
  onSelect: (id: string) => void;
  onConfirm: () => void;
};

const CARDS_PER_PAGE = 3;

// --- Bigger smoother animation ---

const slideVariants = (direction: number): Variants => ({
  initial: {
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    position: "absolute",
    width: "100%",
  },
  animate: {
    x: 0,
    opacity: 1,
    position: "relative",
    transition: { duration: 0.45, ease: "easeOut" }, // ✅ 'easeOut' is a valid literal
  },
  exit: {
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    position: "absolute",
    transition: { duration: 0.4, ease: "easeInOut" }, // ✅ valid literal
  },
});


export default function AdSearchBlock({ ads, selected, onSelect, onConfirm }: Props) {
  const [pageData, setPageData] = useState({ page: 0, direction: 0 });
  const currentPage = pageData.page;
  const [dateFilter, setDateFilter] = useState("all");

  const [now] = useState<number>(() => Date.now());
  const getFilterTimestamp = useCallback((filter: string) => {
    switch (filter) {
      case "last-7-days": return now - 7 * 24 * 60 * 60 * 1000;
      case "last-30-days": return now - 30 * 24 * 60 * 60 * 1000;
      case "this-year": return new Date(new Date().getFullYear(), 0, 1).getTime();
      default: return 0;
    }
  }, [now]);

  const filteredAds = useMemo(() => {
    const minTimestamp = getFilterTimestamp(dateFilter);
    return ads
      .filter((ad) => (ad.timestamp ?? 0) >= minTimestamp)
      .sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0));
  }, [ads, dateFilter, getFilterTimestamp]);

  useEffect(() => {
    if (pageData.page !== 0) {
      setPageData({ page: 0, direction: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateFilter, filteredAds.length]);

  const totalPages = Math.ceil(filteredAds.length / CARDS_PER_PAGE);

  const displayedAds = useMemo(() => {
    const start = currentPage * CARDS_PER_PAGE;
    return filteredAds.slice(start, start + CARDS_PER_PAGE);
  }, [filteredAds, currentPage]);

  const handlePrev = () =>
    setPageData(prev => ({ page: Math.max(0, prev.page - 1), direction: -1 }));

  const handleNext = () =>
    setPageData(prev => ({ page: Math.min(totalPages - 1, prev.page + 1), direction: 1 }));

  const confirmedSelection = useMemo(() => {
    const ids = filteredAds.map(a => a.id);
    return selected.filter(id => ids.includes(id));
  }, [selected, filteredAds]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden w-full max-w-6xl mx-auto font-sans">

      {/* Header */}
      <div className="p-5 border-b border-gray-100 bg-gray-50/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-gray-700">
          <Search size={18} className="text-blue-500" />
          <h4 className="font-bold text-sm">
            検索結果: <span className="text-blue-600">{filteredAds.length}</span>件
          </h4>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex text-xs text-gray-400 items-center gap-1">
            <MousePointerClick size={14} /> クリエイティブを選択
          </div>

          <div className="relative">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-9 text-xs font-medium text-gray-700 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
            >
              <option value="all">全期間</option>
              <option value="last-7-days">過去 7 日</option>
              <option value="last-30-days">過去 30 日</option>
              <option value="this-year">今年</option>
            </select>
            <Filter size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="flex items-center p-6">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="p-3 mr-3 rounded-full bg-gray-100 hover:bg-gray-200 transition hover:scale-110 active:scale-95 disabled:opacity-30"
        >
          <ChevronLeft size={22} />
        </button>

        <div className="flex-1 relative overflow-hidden min-h-[280px]">
          {filteredAds.length === 0 ? (
            <div className="text-center p-5 text-gray-500 flex flex-col items-center">
              <AlertTriangle size={26} className="text-yellow-500 mb-3" />
              <p className="font-medium">条件に一致するクリエイティブはありません。</p>
            </div>
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentPage}
                variants={slideVariants(pageData.direction)}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute top-0 left-0 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {displayedAds.map(ad => {
                  const isSelected = confirmedSelection.includes(ad.id);

                  return (
                    <motion.div
                      key={ad.id}
                      onClick={() => onSelect(ad.id)}
                      whileHover={{ scale: 1.05, y: -4 }}
                      whileTap={{ scale: 0.96 }}
                      className={`
                        relative rounded-2xl mt-4 border shadow-md min-h-[200px] cursor-pointer transition-all overflow-hidden group
                        ${isSelected
                          ? "border-blue-500 ring-2 ring-blue-500 bg-blue-50/40"
                          : "border-gray-200 bg-white hover:shadow-xl hover:border-blue-300"}
                      `}
                    >
                      <div className="space-y-2.5">
                      <div className={`absolute top-3 right-3 z-10 ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-70"}`}>
                        <CheckCircle2 className={`w-7 h-7 ${isSelected ? "text-blue-600" : "text-gray-400"}`} />
                      </div>

                      <div className="p-4 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-3">
                          <div className="text-sm font-semibold text-gray-600 uppercase truncate max-w-[65%]">{ad.brand}</div>
                          
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                            <Calendar size={11} />
                            {ad.dateDisplay}
                          </div>
                        <div className="flex gap-4 mt-3">
                          <div className={`w-16 h-16 rounded-lg flex items-center justify-center text-xl ${isSelected ? "bg-blue-200" : "bg-gray-100"}`}>
                            🖼️
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-base text-gray-800 leading-snug line-clamp-2 mb-2">
                              {ad.title}
                            </div>

                            
                          </div>
                          
                        </div>
                        <div className={`inline-flex mt-2 items-center gap-1.5 px-2.5 py-1 rounded-md text-xs ${isSelected ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                              <BarChart3 size={13} /> {ad.engagement} <span className="text-[10px] opacity-60">Eng.</span>
                            </div>
                      </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages - 1}
          className="p-3 ml-3 rounded-full bg-gray-100 hover:bg-gray-200 transition hover:scale-110 active:scale-95 disabled:opacity-30"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Footer */}
      <div className="p-5 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
        <div className="text-xs font-medium text-gray-500">
          {currentPage + 1} / {totalPages} ページ •  
          <span className={`ml-1 ${confirmedSelection.length ? "text-blue-600 font-bold" : ""}`}>
            {confirmedSelection.length}
          </span> 件選択中
        </div>

        <button
          onClick={onConfirm}
          disabled={confirmedSelection.length === 0}
          className={`
            flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm shadow-md
            ${confirmedSelection.length
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 active:scale-95"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"}
          `}
        >
          <Sparkles size={16} /> 分析を開始
        </button>
      </div>
    </div>
  );
}
