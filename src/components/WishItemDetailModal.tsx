import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Item } from "@/types";
import { calculateProgressPercentage } from "@/lib/utils";

interface WishItemDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Item;
}

export function WishItemDetailModal({
  isOpen,
  onClose,
  item,
}: WishItemDetailModalProps) {
  const [isVisible, setIsVisible] = useState(isOpen);
  const { name, description, image_url, amount, contributed_amount } = item;

  const progress = calculateProgressPercentage(amount, contributed_amount);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='fixed inset-0 bg-black/50' onClick={onClose} />
      <div
        className={`bg-white p-6 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <h2 className='text-xl font-bold mb-4'>{name}</h2>
        {image_url && (
          <img
            src={image_url}
            alt={name}
            className='w-full object-cover rounded-md mb-4'
          />
        )}
        <p className='text-gray-700 mb-4'>{description}</p>
        <div className='flex justify-between items-center mb-4'>
          <span className='text-green-600 font-semibold text-lg'>
            ${amount?.toFixed(2)}
          </span>
          <div className='flex items-center'>
            <div className='w-24 bg-gray-200 rounded-full h-2.5 mr-2'>
              <div
                className='bg-blue-600 h-2.5 rounded-full'
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className='text-sm text-gray-600'>{progress}% Funded</span>
          </div>
        </div>
        <button
          className='absolute top-2 right-2 text-gray-400 hover:text-gray-600'
          onClick={onClose}
          aria-label='Close'
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
}
