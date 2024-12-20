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

export function CreateUpdateWish({
  actionOrWishId,
  wishlistToEdit,
}: {
  actionOrWishId: string;
  wishlistToEdit: WishList | null;
}) {
  const { currentUser } = useAppContext();

  const router = useRouter();
  const [step, setStep] = useState(1);
  const [wishlistData, setWishlistData] = useState<Omit<
    WishList,
    "contributed_amount" | "owner" | "isArchived"
  > | null>(wishlistToEdit);

  const isCreateMode = actionOrWishId === "create";
  const isCreateScreen = step === 1;
  const isPreviewScreen = step === 2;

  const { mutate: createWishList, isPending: isCreatingWishList } = useMutation(
    {
      mutationFn: async (
        data: Omit<WishList, "contributed_amount" | "owner" | "isArchived">
      ) =>
        (await axios.post("/api/wishlists", data)) as {
          data: { wishlist: WishList };
        },
      onSuccess({ data }) {
        toast.success("Wishlist created successfully.");
        const wishListId = data.wishlist._id;
        router.push(`/${currentUser?.username}/wishlists/${wishListId}`);
      },
      onError(error) {
        console.log(error);
        toast.error("Error creating wishlist");
      },
    }
  );

  const { mutate: updateWishList, isPending: isUpdatingWishList } = useMutation(
    {
      mutationFn: async (
        data: Omit<WishList, "contributed_amount" | "owner" | "isArchived">
      ) =>
        (await axios.put(`/api/wishlists/${actionOrWishId}`, data)) as {
          data: { wishlist: WishList };
        },
      onSuccess() {
        toast.success("Wishlist updated.");
        router.push(`/${currentUser?.username}/wishlists/${actionOrWishId}`);
      },
      onError(error) {
        console.log(error);
        toast.error("Error updating wishlist");
      },
    }
  );
  const handleSubmit = (
    data: Omit<WishList, "contributed_amount" | "owner" | "isArchived">
  ) => {
    setWishlistData(data);
    if (step < 2) {
      setStep(step + 1);
    } else {
      if (isCreateMode) {
        createWishList(data);
      } else {
        updateWishList({ ...data, _id: wishlistToEdit?._id });
      }
    }
  };

  return (
    <div className='relative container bg-white rounded-lg mx-auto px-12 py-8 min-h-[90vh] flex justify-between flex-col'>
      <div>
        <div className='space-y-1 mb-6'>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent'>
            {isCreateMode ? "Create New Wishlist" : "Update Wishlist"}
          </h1>
          <p className='text-muted-foreground'>
            {isCreateMode
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
            {...(!!wishlistData ? { initialData: wishlistData } : {})}
          />
        )}

        {isPreviewScreen && !!wishlistData && (
          <WishPreview wishlistData={wishlistData} />
        )}
      </div>
      <div className='mt-6 flex justify-between'>
        {step > 1 && (
          <Button onClick={() => setStep(step - 1)} variant='outline'>
            <ArrowLeft className='mr-2 h-4 w-4' /> Back
          </Button>
        )}

        {isPreviewScreen && !!wishlistData && (
          <Button
            onClick={() => handleSubmit(wishlistData)}
            className='ml-auto'
            disabled={isCreatingWishList || isUpdatingWishList}
          >
            {isCreatingWishList || isUpdatingWishList ? (
              "Please wait..."
            ) : (
              <>{isCreateMode ? "Create Wishlist" : "Update Wishlist"}</>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
