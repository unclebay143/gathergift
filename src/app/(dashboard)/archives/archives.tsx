"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Archive,
  ArchiveIcon,
  Calendar,
  ChevronDown,
  DollarSign,
  Gift,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { WishLists } from "@/types";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import {
  calculateProgressPercentage,
  formatCurrencyWithComma,
} from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import axios from "axios";
import { useDashboardLoader } from "@/app/providers";

dayjs.extend(relativeTime);

const getArchiveWishlistsQueryKey = () => ["archive-wishlists"];
export const ArchivePage = () => {
  const queryClient = useQueryClient();
  const { setVisibility } = useDashboardLoader();

  const { isLoading, data: wishlists } = useQuery({
    queryFn: async () => {
      const res = await fetch("api/wishlists");
      const data: WishLists = await res.json();
      const nonArchivedWishlists = data.filter(
        (wishlist) => wishlist.isArchived
      );
      return nonArchivedWishlists as WishLists;
    },
    queryKey: getArchiveWishlistsQueryKey(),
    refetchOnWindowFocus: true,
  });

  const { mutate: handleArchiveToggle } = useMutation({
    mutationFn: (id: string) => axios.put(`/api/wishlists/${id}/archive`),
    onError() {
      toast.error("Failed to archive/unarchive the wishlist.");
    },
    async onSuccess() {
      toast.success("Wishlist Archived successfully!");
      await queryClient.invalidateQueries({
        queryKey: getArchiveWishlistsQueryKey(),
      });
    },
  });

  useEffect(() => {
    setVisibility(isLoading);
  }, [isLoading, setVisibility]);

  const showEmptyState = wishlists?.length === 0;
  return (
    <>
      <div className='container w-full mx-auto px-4 py-6 lg:px-8 flex flex-col gap-8'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
            My Archives
          </h1>
          <p className='text-muted-foreground'>
            Keep your past wishlists organized and cherish memories of fulfilled
            goals!
          </p>
        </div>

        {showEmptyState && (
          <div className='text-center py-24 border border-dashed rounded-lg'>
            <div className='w-24 h-24 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-6'>
              <ArchiveIcon className='w-12 h-12 text-indigo-600 dark:text-indigo-400' />
            </div>
            <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
              No archives yet
            </h2>
            <p className='text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto'>
              Your archives are empty for now. Once you fulfill and archive a
              wishlist, it will appear here. milestones.
            </p>
          </div>
        )}

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {wishlists?.map((wishlist) => (
            <Card
              key={wishlist._id}
              className='overflow-hidden transition-all duration-300 hover:shadow-xl group dark:bg-gray-800/50 backdrop-blur-sm '
            >
              <CardHeader className='p-0'>
                <div className='relative'>
                  <div className='h-40'>
                    {wishlist.coverImage && (
                      <img
                        src={wishlist.coverImage}
                        alt={wishlist.title}
                        className='w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105'
                      />
                    )}
                  </div>
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                  <div className='absolute bottom-4 left-4 right-4'>
                    <CardTitle className='text-2xl font-bold text-white mb-1'>
                      {wishlist.title}
                    </CardTitle>
                    <CardDescription className='text-gray-200'>
                      {wishlist.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='p-4 space-y-4'>
                <div className='flex justify-between items-center'>
                  <Badge
                    variant='secondary'
                    className='bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                  >
                    <Gift className='mr-1 h-3 w-3' />
                    {wishlist?.items?.length || "0"} items
                  </Badge>
                  <span className='text-sm text-muted-foreground flex items-center'>
                    <Calendar className='inline mr-1 h-3 w-3' />
                    {dayjs(wishlist.endDate).fromNow()}
                  </span>
                </div>
                <Progress
                  value={calculateProgressPercentage(
                    wishlist.target_amount,
                    wishlist.contributed_amount
                  )}
                  className='h-2 bg-indigo-100 dark:bg-indigo-950'
                />
                <div className='flex justify-between items-center text-sm'>
                  <span className='text-muted-foreground'>
                    {calculateProgressPercentage(
                      wishlist.target_amount,
                      wishlist.contributed_amount
                    )}
                    % of ${formatCurrencyWithComma(wishlist.target_amount)}
                  </span>
                  <span className='font-medium text-green-600 dark:text-green-400'>
                    <DollarSign className='inline mr-1 h-3 w-3' />
                    {formatCurrencyWithComma(wishlist.contributed_amount)}
                  </span>
                </div>
              </CardContent>
              <CardFooter className='p-4 bg-gray-50 dark:bg-gray-800/30'>
                <div className='flex justify-between items-center w-full'>
                  <Tooltip>
                    <TooltipProvider>
                      <TooltipTrigger asChild>
                        <div>
                          <Button variant='outline' size='sm' disabled>
                            View Details
                          </Button>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent sideOffset={8} side='bottom'>
                        Unarchive wishlist to manage
                      </TooltipContent>
                    </TooltipProvider>
                  </Tooltip>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' size='sm'>
                        <ChevronDown className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem
                        className='text-red-600 cursor-pointer'
                        onClick={() => handleArchiveToggle(wishlist._id!)}
                      >
                        <Archive className='mr-2 h-4 w-4' />
                        {wishlist.isArchived ? "Unarchive" : "Archive"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};
