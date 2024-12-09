import { useEffect, useState } from "react";
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
  initialContributions: Record<string, number>;
}

export function ContributionModal({
  isOpen,
  onClose,
  selectedItems,
  onContribute,
  initialContributions,
}: ContributionModalProps) {
  const [contributions, setContributions] = useState<Record<string, number>>(
    Object.fromEntries(selectedItems.map((item) => [item.id, 0]))
  );

  useEffect(() => {
    if (isOpen) {
      setContributions(() => {
        const newContributions = { ...initialContributions };
        selectedItems.forEach((item) => {
          if (!(item.id in newContributions)) {
            newContributions[item.id] = 0;
          }
        });
        // Remove contributions for items that are no longer selected
        Object.keys(newContributions).forEach((id) => {
          if (!selectedItems.some((item) => item.id === id)) {
            delete newContributions[id];
          }
        });
        return newContributions;
      });
    }
  }, [isOpen, selectedItems, initialContributions]);

  const handleContribute = () => {
    const nonZeroContributions = Object.entries(contributions).reduce(
      (acc, [id, amount]) => {
        if (amount > 0) {
          acc[id] = amount;
        }
        return acc;
      },
      {} as Record<string, number>
    );
    onContribute(nonZeroContributions);
    onClose();
  };

  const handleInputChange = (id: string, value: string) => {
    const numValue = value === "" ? 0 : parseFloat(value);
    setContributions((prev) => ({ ...prev, [id]: numValue }));
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
              // max={1000} // we can have a settings for this "Receive payment when full percentage reached"
              value={
                contributions[item.id] === 0
                  ? ""
                  : contributions[item.id]?.toString() || ""
              }
              onChange={(e) => handleInputChange(item.id, e.target.value)}
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
