import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItems: Array<{
    id: string;
    name: string;
    amount: number;
    progress: number;
  }>;
  onContribute: (contributions: Record<string, number>) => void;
}

export function ContributionModal({
  isOpen,
  onClose,
  selectedItems,
  onContribute,
}: ContributionModalProps) {
  const [contributions, setContributions] = useState<Record<string, number>>(
    Object.fromEntries(selectedItems.map((item) => [item.id, 0]))
  );

  const handleContribute = () => {
    onContribute(contributions);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div className='fixed inset-0 bg-black/50' onClick={onClose} />
      <div className='bg-white p-6 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto relative'>
        <h2 className='text-xl font-bold mb-4'>Contribute to Gifts</h2>
        <button
          className='absolute top-2 right-2 text-gray-400 hover:text-gray-600'
          onClick={onClose}
          aria-label='Close'
        >
          <X size={24} />
        </button>
        {selectedItems.map((item) => (
          <div key={item.id} className='mb-4'>
            <Label htmlFor={`contribution-${item.id}`} className='block mb-2'>
              {item.name} (${item.amount.toFixed(2)})
            </Label>
            <Input
              type='number'
              id={`contribution-${item.id}`}
              min='0'
              max={item.amount}
              step='0.01'
              value={contributions[item.id]}
              onChange={(e) =>
                setContributions((prev) => ({
                  ...prev,
                  [item.id]: parseFloat(e.target.value) || 0,
                }))
              }
              className='w-full'
            />
            <div className='text-sm text-gray-500 mt-1'>
              {((contributions[item.id] / item.amount) * 100).toFixed(2)}% of
              total amount
            </div>
          </div>
        ))}
        <Button onClick={handleContribute} className='w-full mt-4'>
          Confirm Contribution
        </Button>
      </div>
    </div>
  );
}
