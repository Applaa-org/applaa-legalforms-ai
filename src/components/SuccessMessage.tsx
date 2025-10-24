import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface SuccessMessageProps {
  message: string;
  onClose: () => void;
}

export default function SuccessMessage({ message, onClose }: SuccessMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white rounded-2xl p-8 text-center max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="w-16 h-16 text-green-500" />
          </motion.div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{message}</h3>
        <p className="text-gray-600">Your document is ready for download.</p>
        <button
          onClick={onClose}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Got it!
        </button>
      </motion.div>
    </motion.div>
  );
}