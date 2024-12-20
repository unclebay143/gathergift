"use client";

import { useState } from "react";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { WishList } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useAppContext } from "@/app/providers";
import { WishForm } from "@/components/wishlist-form";
import { WishPreview } from "@/components/wishlist-preview";

export function CreateUpdateWish({ action }: { action: string }) {
  const { currentUser } = useAppContext();

  const router = useRouter();
  const [step, setStep] = useState(1);
  const [wishData, setWishData] = useState<Omit<
    WishList,
    "contributed_amount" | "owner" | "isArchived" | "_id"
  > | null>(null);

  const isCreating = action === "create";
  const isCreateScreen = step === 1;
  const isPreviewScreen = step === 2;

  const { mutate, isPending } = useMutation({
    mutationFn: async (
      data: Omit<
        WishList,
        "contributed_amount" | "owner" | "isArchived" | "_id"
      >
    ) =>
      (await axios.post("/api/wishlists", data)) as {
        data: { wishlist: WishList };
      },
    onSuccess({ data }) {
      toast.success("Wishlist created successfully.");
      const wishListId = data.wishlist._id;
      // Todo: make username dynamic `/[username]/wishlists/wishListId`
      router.push(`/${currentUser?.username}/wishlists/${wishListId}`);
    },
    onError(error) {
      console.log(error);
      toast.error("Error creating wishlist");
    },
  });

  const handleSubmit = (
    data: Omit<WishList, "contributed_amount" | "owner" | "isArchived" | "_id">
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
        <div className='space-y-1 mb-6'>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent'>
            {isCreating ? "Create New Wishlist" : "Update Wishlist"}
          </h1>
          <p className='text-muted-foreground'>
            {isCreating
              ? "Create a new wishlist to share with others."
              : "Update your existing wishlist."}
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

        {isCreateScreen && (
          <WishForm
            onSubmit={handleSubmit}
            {...(!!wishData ? { initialData: wishData } : {})}
          />
        )}

        {isPreviewScreen && !!wishData && <WishPreview wishData={wishData} />}
      </div>
      <div className='mt-6 flex justify-between'>
        {step > 1 && (
          <Button onClick={() => setStep(step - 1)} variant='outline'>
            <ArrowLeft className='mr-2 h-4 w-4' /> Back
          </Button>
        )}

        {isPreviewScreen && !!wishData && (
          <Button
            onClick={() => handleSubmit(wishData)}
            className='ml-auto'
            disabled={isPending}
          >
            {isPending ? (
              "Please wait..."
            ) : (
              <>{isPreviewScreen ? "Create Wishlist" : "Update Wishlist"}</>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
