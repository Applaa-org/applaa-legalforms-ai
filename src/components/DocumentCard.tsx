import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

interface DocumentCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function DocumentCard({ id, title, description, icon, category, isSelected, onClick }: DocumentCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300
        ${isSelected 
          ? 'border-blue-500 bg-blue-50 shadow-xl' 
          : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg'
        }
      `}
      onClick={onClick}
    >
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-3">{icon}</span>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">{category}</span>
        </div>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
}