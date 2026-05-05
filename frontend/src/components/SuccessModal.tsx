import { CheckCircle, X } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  greeting: string;
}

export default function SuccessModal({
  isOpen,
  onClose,
  title,
  greeting,
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fade-in">
        <div className="flex justify-between items-start mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <h2 className="text-2xl font-bold text-[#46614b] mb-4">{title}</h2>

        <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
          {greeting}
        </p>

        <div className="mt-8">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-[#46614b] via-[#5c7b63] to-[#3d5340] text-white py-3 rounded-lg font-semibold hover:from-[#3d5340] hover:via-[#4f6a55] hover:to-[#2f4232] transition shadow-lg hover:shadow-xl"
          >
            Close
          </button>
        </div>

        <div className="mt-4 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded"></div>
      </div>
    </div>
  );
}
