import { useState } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { Checkbox } from "./ui/Checkbox";
import { WishItemDetailModal } from "./WishItemDetailModal";

interface WishItemProps {
  id: string;
  name: string;
  description: string;
  image: string;
  amount: number;
  progress: number;
  isSelected: boolean;
  isExpanded: boolean;
  onSelect: () => void;
  onExpand: () => void;
}

export function WishItem({
  id,
  name,
  description,
  image,
  isSelected,
  isExpanded,
  amount,
  progress,
  onSelect,
  onExpand,
}: WishItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='border rounded-md p-4 mb-4 bg-zinc-50'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-center mb-2 sm:mb-0'>
          <Checkbox
            checked={isSelected}
            onChange={onSelect}
            id={`checkbox-${id}`}
            label={name}
          />
        </div>
        <div className='flex flex-wrap items-center gap-2 sm:gap-4 justify-between'>
          <div className='flex items-center gap-2 sm:gap-4'>
            <span className='text-green-600 font-semibold text-sm sm:text-base'>
              ${amount?.toFixed(2)}
            </span>
            <div className='flex items-center'>
              <div className='w-16 sm:w-20 bg-gray-200 rounded-full h-2 mr-2'>
                <div
                  className='bg-blue-600 h-2 rounded-full'
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className='text-xs sm:text-sm text-gray-600'>
                {progress}%
              </span>
            </div>
          </div>
          <div className='flex items-center gap-2 sm:gap-4'>
            <button
              onClick={onExpand}
              className='text-blue-500 hover:text-blue-700'
            >
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className='text-blue-500 hover:text-blue-700'
            >
              <Info size={16} />
            </button>
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className='mt-2'>
          <img
            src={image}
            alt={name}
            className='w-full h-48 object-cover rounded-md mb-2'
          />
          <p className='text-gray-700 text-sm'>{description}</p>
        </div>
      )}
      <WishItemDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        name={name}
        description={description}
        image={image}
        amount={amount}
        progress={progress}
      />
    </div>
  );
}
