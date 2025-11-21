'use client';
import { motion } from "framer-motion";

type Props = {
  onSelect: (key: string) => void;
};

// Define the data for the quick actions
const ACTION_FLOWS = [
  { 
    key: "media", 
    icon: "📊", 
    label: "Media Optimization Score", 
    description: "広告アカウントの最適化スコアを確認し、具体的な改善施策を提示します。" 
  },
  { 
    key: "variation", 
    icon: "💡", 
    label: "Creative Variation Proposal", 
    description: "Ad Creative Libraryからトレンドを分析し、クリエイティブの改善提案を行います。" 
  },
  { 
    key: "meta", 
    icon: "📈", 
    label: "Meta AA Agent (Advanced)", 
    description: "Meta Advanced Analyticsを活用し、より深い広告効果の分析レポートを作成します。" 
  },
];

// Animation settings for the staggered grid entry
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Smooth delay between cards
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function QuickActions({ onSelect }: Props) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {ACTION_FLOWS.map((flow) => (
        <motion.div
          key={flow.key}
          variants={itemVariants}
          // Micro-interactions on hover and tap
          whileHover={{ 
            scale: 1.02, 
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(flow.key)}
          className="p-5 bg-white border border-gray-100 rounded-xl shadow-lg cursor-pointer transition-all duration-200 hover:border-blue-500/50"
        >
          {/* Icon Badge */}
          <div className="text-3xl mb-3 w-10 h-10 flex items-center justify-center bg-blue-50 rounded-lg text-blue-600 shadow-sm">
            {flow.icon}
          </div>

          {/* Label */}
          <h3 className="font-bold text-gray-800 text-lg mb-1">{flow.label}</h3>
          
          {/* Description */}
          <p className="text-sm text-gray-500">
            {flow.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}