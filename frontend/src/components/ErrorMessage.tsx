import { AlertCircle, X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
}

export default function ErrorMessage({ message, onClose }: ErrorMessageProps) {
  return (
    <div className="fixed top-20 right-4 z-50 max-w-md animate-slide-in">
      <div className="bg-red-500/10 border-2 border-red-500 rounded-xl p-4 backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
          <div className="flex-1">
            <p className="text-red-500 font-medium">{message}</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-red-500 hover:text-red-400 transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
