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
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export function CreateUpdateWish({ action }: { action: string }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [wishData, setWishData] = useState<
    Omit<Wish, "contributed_amount" | "wish" | "owner" | "isArchived" | "_id">
  >({
    title: "",
    description: "",
    target_amount: 0,
    endDate: new Date(),
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

  const { mutate, isPending } = useMutation({
    mutationFn: async (
      data: Omit<
        Wish,
        "contributed_amount" | "wish" | "owner" | "isArchived" | "_id"
      >
    ) =>
      (await axios.post("/api/wishes", data)) as { data: { wishlist: Wish } },
    onSuccess({ data }) {
      toast.success("Wish created successfully.");
      const wishListId = data.wishlist;
      console.log(wishListId);
      // Todo: redirect to wish page itself `/[username]/wishes/wishListId`
      router.push("/wishes");
    },
    onError(error) {
      console.log(error);
      toast.error("Error creating wish");
    },
  });

  const handleSubmit = (
    data: Omit<
      Wish,
      "contributed_amount" | "wish" | "owner" | "isArchived" | "_id"
    >
  ) => {
    setWishData(data);
    if (step < 2) {
      setStep(step + 1);
    } else {
      mutate(data);
    }
  };

  return (
    <div className='relative container bg-white rounded-lg mx-auto px-12 py-8 min-h-[90vh] flex justify-between flex-col'>
      <div>
        {/* <h1 className='text-3xl font-bold mb-6'>
          {isCreating ? "Create New Wish" : "Update Wish"}
        </h1> */}

        <div className='space-y-1 mb-6'>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent'>
            {isCreating ? "Create New Wish" : "Update Wish"}
          </h1>
          <p className='text-muted-foreground'>
            {isCreating
              ? "Create a new wish to share with others."
              : "Update your existing wish."}
          </p>
        </div>
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
          <Button
            onClick={() => handleSubmit(wishData)}
            className='ml-auto'
            disabled={isPending}
          >
            {isPending ? (
              "Please wait..."
            ) : (
              <>{isPreviewScreen ? "Create Wish" : "Update Wish"}</>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
