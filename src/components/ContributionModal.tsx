import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Currency, Items } from "@/types";
import { MAP_CURRENCIES_TO_SYMBOLS } from "@/const";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";

const ContributorMessage = ({
  handleBack,
  handleConfirm,
  onMessageChange,
}: {
  handleBack: () => void;
  handleConfirm: () => void;
  onMessageChange: (message: string) => void;
}) => {
  return (
    <div>
      <Label className='text-xl font-bold mb-4'>Personalized Message</Label>
      <div className='space-y-2'>
        <Label htmlFor='contributionAmount' className='mb-2'>
          Add a custom message for the receiver{" "}
          <span className='text-xs text-zinc-400'>(Optional)</span>
        </Label>
        <Textarea onChange={(e) => onMessageChange(e.target.value)} />
      </div>
      <div className='flex justify-between items-center'>
        <Button className='mt-4' variant='ghost' size='sm' onClick={handleBack}>
          Go Back
        </Button>
        <Button className='mt-4' size='sm' onClick={handleConfirm}>
          Make payment
        </Button>
      </div>
    </div>
  );
};

interface ContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItems: Items;
  onContribute: (contributions: Record<string, number>) => void;
  initialContributions: Record<string, number>;
  currency: Currency;
}

export function ContributionModal({
  isOpen,
  onClose,
  selectedItems,
  onContribute,
  initialContributions,
  currency,
}: ContributionModalProps) {
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const [contributions, setContributions] = useState<Record<string, number>>(
    Object.fromEntries(selectedItems.map((item) => [item._id, 0]))
  );

  useEffect(() => {
    if (isOpen) {
      setContributions(() => {
        const newContributions = { ...initialContributions };
        selectedItems.forEach((item) => {
          if (!(item._id! in newContributions)) {
            newContributions[item._id!] = 0;
          }
        });
        // Remove contributions for items that are no longer selected
        Object.keys(newContributions).forEach((id) => {
          if (!selectedItems.some((item) => item._id === id)) {
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

  const handleNavigation = () => (step === 1 ? setStep(2) : setStep(1));

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div className='fixed inset-0 bg-black/50' onClick={onClose} />
      <div className='bg-white p-6 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto relative'>
        {step === 1 && (
          <>
            <h2 className='text-xl font-bold mb-4'>Contribute to Gifts</h2>
            <button
              className='absolute top-2 right-2 text-gray-400 hover:text-gray-600'
              onClick={onClose}
              aria-label='Close'
            >
              <X size={24} />
            </button>
            <form onSubmit={handleNavigation}>
              {selectedItems.map((item) => (
                <div key={item._id} className='mb-4'>
                  <Label
                    htmlFor={`contribution-${item._id}`}
                    className='block mb-2'
                  >
                    {item.name} ({MAP_CURRENCIES_TO_SYMBOLS[currency]}{" "}
                    {item.amount.toFixed(2)})
                  </Label>
                  <Input
                    required
                    type='number'
                    id={`contribution-${item._id}`}
                    // max={1000} // Todo: we can have a settings for this "Receive payment when full percentage reached"
                    value={
                      contributions[item._id!] === 0
                        ? ""
                        : contributions[item._id!]?.toString() || ""
                    }
                    onChange={(e) =>
                      handleInputChange(item._id!, e.target.value)
                    }
                  />
                  <div className='text-sm text-gray-500 mt-1'>
                    {((contributions[item._id!] / item.amount) * 100).toFixed(
                      2
                    )}
                    % of total amount
                  </div>
                </div>
              ))}
              <Button type='submit' className='w-full mt-4'>
                Continue
              </Button>
            </form>
          </>
        )}
        {step === 2 && (
          <ContributorMessage
            handleBack={handleNavigation}
            handleConfirm={handleContribute}
            onMessageChange={setMessage}
          />
        )}
      </div>
    </div>
  );
}

export const OutRightContributionModal = ({
  onClose,
  target_amount,
  isOpen,
  currency,
}: {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  target_amount: number;
}) => {
  const [contributionAmount, setContributionAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);

  const handleContribute = () => {
    console.log({ contributionAmount, currency, message });
  };

  const handleNavigation = () => (step === 1 ? setStep(2) : setStep(1));

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div className='fixed inset-0 bg-black/50' onClick={onClose} />
      <div
        className={cn(
          "bg-white p-6 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto relative",
          step === 2 && "max-w-lg"
        )}
      >
        {step === 1 && (
          <form onClick={handleNavigation}>
            <h2 className='text-xl font-bold mb-4'>Contribute to Gifts</h2>
            <button
              className='absolute top-2 right-2 text-gray-400 hover:text-gray-600'
              onClick={onClose}
              aria-label='Close'
            >
              <X size={24} />
            </button>

            <div className='mb-4'>
              <Label htmlFor='contributionAmount' className='block mb-2'>
                Amount
              </Label>
              <Input
                type='number'
                id='contributionAmount'
                // max={1000} // Todo: we can have a settings for this "Receive payment when full percentage reached"
                value={
                  contributionAmount === 0
                    ? ""
                    : contributionAmount?.toString() || ""
                }
                onChange={(e) => setContributionAmount(Number(e.target.value))}
              />
              <div className='text-sm text-gray-500 mt-1'>
                {((contributionAmount / target_amount) * 100).toFixed(2)}% of
                total amount
              </div>
            </div>

            <Button type='submit' className='w-full mt-4'>
              Continue
            </Button>
          </form>
        )}

        {step === 2 && (
          <ContributorMessage
            handleBack={handleNavigation}
            handleConfirm={handleContribute}
            onMessageChange={setMessage}
          />
        )}
      </div>
    </div>
  );
};
