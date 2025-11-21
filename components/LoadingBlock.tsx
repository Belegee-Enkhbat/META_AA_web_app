import { motion, easeInOut } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function LoadingBlock({ message }: { message: string }) {
  
  // Custom transition for the bouncing dot animation
  const dotTransition = {
    duration: 0.4,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: easeInOut,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      // Styled like a focused bot message bubble
      className="flex items-center gap-3 my-3 px-5 py-3 bg-white border border-blue-200 rounded-2xl rounded-tl-none shadow-md text-gray-800 w-fit max-w-[80%]"
    >
      {/* Loading Icon */}
      <Loader2 size={18} className="animate-spin text-blue-600 shrink-0" />
      
      <div className="flex items-center gap-2">
        <span className="font-medium text-sm text-gray-700">{message}</span>
        
        {/* Custom Thinking Dots Animation */}
        <div className="flex items-end space-x-1">
          {[0, 0.15, 0.3].map((delay, index) => (
            <motion.span
              key={index}
              initial={{ y: "0%" }}
              // Animate bouncing effect
              animate={{ y: ["0%", "-50%", "0%"] }}
              transition={{ ...dotTransition, delay }}
              className="block w-1.5 h-1.5 rounded-full bg-blue-500"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}