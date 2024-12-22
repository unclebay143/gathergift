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
  Calendar,
  ChevronDown,
  DollarSign,
  Edit,
  Eye,
  EyeOff,
  FacebookIcon,
  Gift,
  InstagramIcon,
  Mail,
  MessageCircleMore,
  Plus,
  Search,
  Share2,
  TwitterIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { WishLists } from "@/types";
import relativeTime from "dayjs/plugin/relativeTime"; // ES 2015
import dayjs from "dayjs";
import {
  calculateProgressPercentage,
  formatCurrencyWithComma,
} from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAppContext } from "@/app/providers";
import axios, { AxiosResponse } from "axios";

dayjs.extend(relativeTime);
export const getWishListsQueryKey = () => ["wishlists"];
const BASE_URL = "https://gathergift.vercel.app";

export const WishListPage = () => {
  const { currentUser } = useAppContext();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlistsState, setWishlistsState] = useState<WishLists | undefined>();

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const { mutate: handleArchiveToggle } = useMutation({
    mutationFn: (id: string) => axios.put(`/api/wishlists/${id}/archive`),
    onError() {
      toast.error("Failed to archive/unarchive the Wishlist.");
    },
    async onSuccess() {
      toast.success("Wishlist archived successfully!");
      await queryClient.invalidateQueries({ queryKey: getWishListsQueryKey() });
    },
  });

  const { data: wishlists } = useQuery({
    queryFn: async (): Promise<AxiosResponse<WishLists>> =>
      axios.get("api/wishlists"),
    queryKey: getWishListsQueryKey(),
    refetchOnWindowFocus: true,
    select: ({ data }) => data.filter((wishlist) => !wishlist.isArchived),
  });

  const filteredWishes = wishlistsState?.filter(
    (wishlist) =>
      (wishlist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wishlist.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) &&
      !wishlist.isArchived
  );

  useEffect(() => {
    if (wishlists) setWishlistsState(wishlists);
  }, [wishlists]);

  const showEmptyState = wishlists?.length === 0;
  const showEmptySearchResult = !!searchTerm && filteredWishes?.length === 0;
  return (
    <>
      <div className='container w-full mx-auto px-4 py-6 lg:px-8 flex flex-col gap-8'>
        <div className='flex flex-col xl:flex-row gap-4 xl:items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
              My Wishlists
            </h1>
            <p className='text-muted-foreground'>
              Track and manage your gift wishlists?. Create new wishlist, set
              goals, and share with friends and family.
            </p>
          </div>
          {!showEmptyState && (
            <div className='flex flex-wrap items-center gap-4 w-full justify-between xl:justify-end xl:w-auto'>
              <div className='relative'>
                <Search className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400' />
                <Input
                  type='text'
                  placeholder='Search wishlists?...'
                  className='pl-8 w-[200px] md:w-[300px]'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button asChild className='bg-black hover:bg-gray-800'>
                <Link href='/wishlists/create'>
                  <Plus className='mr-2 h-4 w-4' />
                  Create new Wishlist
                </Link>
              </Button>
            </div>
          )}
        </div>

        {showEmptyState && (
          <div className='text-center py-24 border border-dashed rounded-lg'>
            <div className='w-24 h-24 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-6'>
              <Gift className='w-12 h-12 text-indigo-600 dark:text-indigo-400' />
            </div>
            <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
              No wishlists yet
            </h2>
            <p className='text-xl text-gray-600 dark:text-gray-400 mb-8'>
              Create your first wishlist and start tracking your gift ideas!
            </p>
            <Button asChild className='bg-black hover:bg-gray-800'>
              <Link href='/wishlists/create'>
                <Plus className='mr-2 h-4 w-4' />
                Create new Wishlist
              </Link>
            </Button>
          </div>
        )}

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {filteredWishes?.map((wishlist) => (
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
                    {formatCurrencyWithComma(wishlist.contributed_amount) || 0}
                  </span>
                </div>
              </CardContent>
              <CardFooter className='p-4 bg-gray-50 dark:bg-gray-800/30'>
                <div className='flex justify-between items-center w-full'>
                  <Button variant='outline' size='sm' asChild>
                    <Link
                      target='_blank'
                      href={`/${currentUser?.username}/wishlists/${wishlist._id}`}
                    >
                      View Details
                    </Link>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' size='sm'>
                        <ChevronDown className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem
                      // onClick={() => handleToggleVisibility(wishlist._id)}
                      >
                        {wishlist.visibility === "PUBLIC" ? (
                          <>
                            <EyeOff className='mr-2 h-4 w-4' />
                            Private
                          </>
                        ) : (
                          <>
                            <Eye className='mr-2 h-4 w-4' />
                            Public
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/wishlists/${wishlist._id}`}>
                          <Edit className='mr-2 h-4 w-4' />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={(e) => {
                          e.preventDefault();
                          toggleModal();
                        }}
                      >
                        <Share2 className='mr-2 h-4 w-4' />
                        Share
                      </DropdownMenuItem>
                      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogContent className='bg-white'>
                          <DialogHeader>
                            <DialogTitle>Share This Wishlist</DialogTitle>
                            <DialogDescription>
                              Share your wishlist with friends and family using
                              the options below.
                            </DialogDescription>
                          </DialogHeader>
                          <div className='space-y-4'>
                            <div className='flex gap-2 bg-gray-100 p-2 border shadow-sm rounded-xl'>
                              <Input
                                type='text'
                                value={`https://example.com/wishlists/${wishlist._id}`}
                                readOnly
                                className='w-full bg-slate-100 border-none bg-transparent shadow-none'
                              />
                              <Button
                                variant='outline'
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    "https://example.com/wishlist/1234"
                                  );
                                  toast.success("Link copied to clipboard!");
                                }}
                                className='bg-yellow-500 w-28 text-white hover:bg-yellow-600 hover:text-white'
                              >
                                <Share2 />
                                Copy Link
                              </Button>
                            </div>

                            <div className='relative'>
                              <div className='absolute inset-0 flex items-center'>
                                <div className='w-full border-t border-gray-200 dark:border-gray-800' />
                              </div>
                              <div className='relative flex justify-center text-sm'>
                                <span className='px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400'>
                                  Or share on socials
                                </span>
                              </div>
                            </div>

                            <div className='flex justify-center gap-4 items-center w-full'>
                              {/* WhatsApp */}
                              <a
                                href={`https://wa.me/?text=${encodeURIComponent(
                                  `Check out this wishlist: ${BASE_URL}/wishlists/${wishlist._id}`
                                )}`}
                                target='_blank'
                                rel='noopener'
                                aria-label='brandname'
                              >
                                <MessageCircleMore
                                  size={24}
                                  className='text-zinc-500 hover:opacity-80'
                                />
                              </a>
                              {/* Facebook */}
                              <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                  `${BASE_URL}/wishlists/${wishlist._id}`
                                )}`}
                                target='_blank'
                                rel='noopener'
                                aria-label='brandname'
                              >
                                <FacebookIcon
                                  size={24}
                                  className='text-zinc-500 hover:opacity-80'
                                />
                              </a>
                              {/* Twitter */}
                              <a
                                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                                  `${BASE_URL}/wishlists/${wishlist._id}`
                                )}&text=${encodeURIComponent(
                                  "Check out this wishlist!"
                                )}`}
                                target='_blank'
                                rel='noopener'
                                aria-label='brandname'
                              >
                                <TwitterIcon
                                  size={24}
                                  className='text-zinc-500 hover:opacity-80'
                                />
                              </a>
                              {/* Instagram  */}
                              <a
                                href={`https://instagram.com`}
                                target='_blank'
                                rel='noopener'
                                aria-label='brandname'
                              >
                                <InstagramIcon
                                  size={24}
                                  className='text-zinc-500 hover:opacity-80'
                                />
                              </a>

                              {/* mail */}
                              <a
                                href={`mailto:recipient@example.com?subject=${encodeURIComponent(
                                  "Check out this wishlist!"
                                )}&body=${encodeURIComponent(
                                  `Hi there,\n\nI wanted to share this wishlist with you: ${BASE_URL}/wishlists/${wishlist._id}`
                                )}`}
                                target='_blank'
                                rel='noopener'
                                aria-label='brandname'
                              >
                                <Mail
                                  size={24}
                                  className='text-zinc-500 hover:opacity-80'
                                />
                              </a>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className='text-red-600'
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

        {showEmptySearchResult && (
          <div className='text-center py-24 border border-dashed rounded-lg'>
            <h3 className='text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-2'>
              No wishlist found
            </h3>
            <p className='text-muted-foreground mb-4'>
              Try adjusting your search or create a new wishlist.
            </p>

            <Button asChild className='bg-black hover:bg-gray-800'>
              <Link href='/wishlists/archives'>
                <Archive className='mr-2 h-4 w-4' />
                Check archives
              </Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
