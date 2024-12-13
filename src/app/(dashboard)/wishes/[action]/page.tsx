"use client";

import { useState } from "react";
import * as React from "react";
import { useRouter } from "next/navigation";
import { WishForm } from "@/components/wish-form";
import { WishPreview } from "@/components/wish-preview";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Wish } from "@/types";

export default function CreateUpdateWishPage({
  params,
}: {
  params: React.Usable<{ action: string }>;
}) {
  const { action } = React.use(params);
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [wishData, setWishData] = useState<Wish>({
    title: "",
    description: "",
    target: 0,
    endDate: "",
    items: [],
    currency: null,
    category: null,
    itemsEnabled: false,
    visibility: "PUBLIC",
    thankYouMessage: "",
  });

  const isCreating = action === "create";
  const isCreateScreen = step === 1;
  const isPreviewScreen = step === 2;

  const handleSubmit = (data: Wish) => {
    console.log(data);
    setWishData(data);
    if (step < 2) {
      setStep(step + 1);
    } else {
      // send the data to API
      console.log("Submitting wish:", data);
      router.push("/wishes");
    }
  };

  return (
    <div className='relative container mx-auto px-4 py-8 min-h-[90vh] flex justify-between flex-col'>
      <div>
        <h1 className='text-3xl font-bold mb-6'>
          {isCreating ? "Create New Wish" : "Update Wish"}
        </h1>
        <div className='mb-6'>
          <div className='flex items-center'>
            <div
              className={`h-1 w-1/2 ${
                isCreateScreen ? "bg-primary" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`h-1 w-1/2 ${
                isPreviewScreen ? "bg-primary" : "bg-gray-200"
              }`}
            ></div>
          </div>
          <div className='flex justify-between mt-2'>
            <span
              className={cn(
                "text-sm font-medium",
                !isCreateScreen && "opacity-50"
              )}
            >
              Details
            </span>
            <span
              className={cn(
                "text-sm font-medium",
                !isPreviewScreen && "opacity-50"
              )}
            >
              Preview
            </span>
          </div>
        </div>
        {isCreateScreen ? (
          <WishForm onSubmit={handleSubmit} initialData={wishData} />
        ) : (
          <WishPreview wishData={wishData} />
        )}
      </div>
      <div className='mt-6 flex justify-between'>
        {step > 1 && (
          <Button onClick={() => setStep(step - 1)} variant='outline'>
            <ArrowLeft className='mr-2 h-4 w-4' /> Back
          </Button>
        )}

        {isPreviewScreen && (
          <Button onClick={() => handleSubmit(wishData)} className='ml-auto'>
            {isPreviewScreen ? "Create Wish" : "Update Wish"}
          </Button>
        )}
      </div>
    </div>
  );
}
