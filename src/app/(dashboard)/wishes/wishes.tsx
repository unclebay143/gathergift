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
} from "@/components/ui/dialog"

import Link from "next/link";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Wishes } from "@/types";
import relativeTime from "dayjs/plugin/relativeTime"; // ES 2015
import dayjs from "dayjs";
import { LoaderScreen } from "@/components/LoaderScreen";
import {
  calculateProgressPercentage,
  formatCurrencyWithComma,
} from "@/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

dayjs.extend(relativeTime);
const queryKey = ["wishes"];

export const WishesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };


  // const [wishes, setWishes] = useState<Wishes>([]);
  const queryClient = useQueryClient();

  const { data: wishes, isLoading } = useQuery({
    queryFn: async () => {
      const res = await fetch("api/wishes");
      const data: Wishes = await res.json();
      const nonArchivedWishes = data.filter((wish) => !wish.isArchived);
      return nonArchivedWishes as Wishes;
    },
    queryKey,
    refetchOnWindowFocus: true,
  });

  const [
    isSearchMode,
    // setIsSearchMode
  ] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");

  const showEmptyState = wishes?.length === 0;

  // const filteredWishes = wishes?.filter(
  //   (wish) =>
  //     (wish.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       wish.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
  //     !wish.isArchived
  // );

  const handleArchiveToggle = async (id: string) => {
    try {
      const response = await fetch(`/api/wishes/${id}/archive`, {
        method: "PUT",
      });

      if (!response.ok) {
        toast.error("Failed to archive/unarchive the wish.");
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ['wishes'] });

      toast.success("Wish Archived successfully!");
    } catch (error) {
      console.error("Error archiving/unarchiving the wish:", error);
      toast.error("An error occurred while archiving the wish.");
    }
  };

  if (isLoading) {
    return <LoaderScreen />;
  }
  return (
    <>
      <div className='container w-full mx-auto px-4 py-6 lg:px-8 flex flex-col gap-8'>
        <div className='flex flex-col xl:flex-row gap-4 xl:items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
              My Wishes
            </h1>
            <p className='text-muted-foreground'>
              Track and manage your gift wishes?. Create new wishes, set goals,
              and share with friends and family.
            </p>
          </div>
          {!showEmptyState && (
            <div className='flex items-center gap-4 w-full justify-between xl:justify-end xl:w-auto'>
              <div className='relative'>
                <Search className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400' />
                <Input
                  type='text'
                  placeholder='Search wishes?...'
                  className='pl-8 w-[200px] md:w-[300px]'
                  // value={searchTerm}
                  // onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button asChild className='bg-black hover:bg-gray-800'>
                <Link href='/wishes/create'>
                  <Plus className='mr-2 h-4 w-4' />
                  Create new Wish
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
              No wishes yet
            </h2>
            <p className='text-xl text-gray-600 dark:text-gray-400 mb-8'>
              Create your first wish and start tracking your gift ideas!
            </p>
            <Button asChild className='bg-black hover:bg-gray-800'>
              <Link href='/wishes/create'>
                <Plus className='mr-2 h-4 w-4' />
                Create new Wish
              </Link>
            </Button>
          </div>
        )}

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {wishes?.map((wish) => (
            <Card
              key={wish._id}
              className='overflow-hidden transition-all duration-300 hover:shadow-xl group dark:bg-gray-800/50 backdrop-blur-sm '
            >
              <CardHeader className='p-0'>
                <div className='relative'>
                  <div className='h-40'>
                    {wish.coverImage && (
                      <img
                        src={wish.coverImage}
                        alt={wish.title}
                        className='w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105'
                      />
                    )}
                  </div>
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                  <div className='absolute bottom-4 left-4 right-4'>
                    <CardTitle className='text-2xl font-bold text-white mb-1'>
                      {wish.title}
                    </CardTitle>
                    <CardDescription className='text-gray-200'>
                      {wish.description}
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
                    {wish?.items?.length || "0"} items
                  </Badge>
                  <span className='text-sm text-muted-foreground flex items-center'>
                    <Calendar className='inline mr-1 h-3 w-3' />
                    {dayjs(wish.endDate).fromNow()}
                  </span>
                </div>
                <Progress
                  value={calculateProgressPercentage(
                    wish.target_amount,
                    wish.contributed_amount
                  )}
                  className='h-2 bg-indigo-100 dark:bg-indigo-950'
                />
                <div className='flex justify-between items-center text-sm'>
                  <span className='text-muted-foreground'>
                    {calculateProgressPercentage(
                      wish.target_amount,
                      wish.contributed_amount
                    )}
                    % of ${formatCurrencyWithComma(wish.target_amount)}
                  </span>
                  <span className='font-medium text-green-600 dark:text-green-400'>
                    <DollarSign className='inline mr-1 h-3 w-3' />
                    {formatCurrencyWithComma(wish.contributed_amount)}
                  </span>
                </div>
              </CardContent>
              <CardFooter className='p-4 bg-gray-50 dark:bg-gray-800/30'>
                <div className='flex justify-between items-center w-full'>
                  <Button variant='outline' size='sm'>
                    View Details
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' size='sm'>
                        <ChevronDown className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem
                      // onClick={() => handleToggleVisibility(wish._id)}
                      >
                        {wish.visibility === "PUBLIC" ? (
                          <>
                            <EyeOff className='mr-2 h-4 w-4' />
                            Hide Wish
                          </>
                        ) : (
                          <>
                            <Eye className='mr-2 h-4 w-4' />
                            Show Wish
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className='mr-2 h-4 w-4' />
                        Edit Wish
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onSelect={(e) => {
                          e.preventDefault();
                          toggleModal();
                        }}
                      >
                        <Share2 className="mr-2 h-4 w-4" />
                        Share Wish
                      </DropdownMenuItem>


                        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogContent className="bg-white">
                          <DialogHeader>
                            <DialogTitle>Share This Wish</DialogTitle>
                            <DialogDescription>
                              Share your wish with friends and family using the options below.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            
                            <p className="text-gray-600">
                              Copy the link to share or choose from the social media options.
                            </p>
                            <div className="flex gap-2 bg-gray-100 p-2 rounded-xl">
                              <Input
                                type="text"
                                value={`https://example.com/wishes/${wish._id}`} 
                                readOnly
                                className="w-full bg-slate-100"
                              />
                              <Button
                                variant="outline"  onClick={() => {
                                  navigator.clipboard.writeText("https://example.com/wish/1234");
                                  toast.success("Link copied to clipboard!");
                                }}
                                className="bg-yellow-400 w-28 text-white hover:bg-yellow-600"
                              >
                                <Share2 />
                                Copy Link
                              </Button>
                            </div>

                            <div className="flex justify-center gap-4 items-center w-full">
                              {/* WhatsApp */}
                              <a
                                href={`https://wa.me/?text=${encodeURIComponent(`Check out this wish: https://example.com/wishes/${wish._id}`)}`}
                                target="_blank"
                                rel="noopener"
                                aria-label="brandname"
                              >
                                <MessageCircleMore size={24} className="text-green-500 hover:opacity-80" />
                              </a>
                              {/* Facebook */}
                              <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://example.com/wishes/${wish._id}`)}`}
                                target="_blank"
                                rel="noopener"
                                aria-label="brandname"
                              >
                                <FacebookIcon size={24} className="text-blue-700 hover:opacity-80" />
                              </a>
                              {/* Twitter */}
                              <a
                                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://example.com/wishes/${wish._id}`)}&text=${encodeURIComponent("Check out this wish!")}`}
                                target="_blank"
                                rel="noopener"
                                aria-label="brandname"
                              >
                                <TwitterIcon size={24} className="text-blue-500 hover:opacity-80" />
                              </a>
                              {/* Instagram  */}
                              <a
                                href={`https://instagram.com`}
                                target="_blank"
                                rel="noopener"
                                aria-label="brandname"
                              >
                                <InstagramIcon size={24} className="text-pink-500 hover:opacity-80" />
                              </a>

                              {/* mail */}
                              <a
                                href={`mailto:recipient@example.com?subject=${encodeURIComponent("Check out this wish!")}&body=${encodeURIComponent(`Hi there,\n\nI wanted to share this wish with you: https://example.com/wishes/${wish._id}`)}`}
                                target="_blank"
                                rel="noopener"
                                aria-label="brandname"
                              >
                                <Mail size={24} className="text-green-500 hover:opacity-80" />
                              </a>
                            </div>

                            
                          </div>
                        </DialogContent>
                      </Dialog>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className='text-red-600'
                        onClick={() => handleArchiveToggle(wish._id)}
                      >
                        <Archive className='mr-2 h-4 w-4' />
                        {wish.isArchived ? "Unarchive Wish" : "Archive Wish"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {isSearchMode && wishes?.length === 0 && (
          <div className='text-center py-24 border border-dashed rounded-lg'>
            <h3 className='text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-2'>
              No wishes found
            </h3>
            <p className='text-muted-foreground mb-4'>
              Try adjusting your search or create a new wish.
            </p>

            <Button asChild className='bg-black hover:bg-gray-800'>
              <Link href='/wishes/create'>
                <Plus className='mr-2 h-4 w-4' />
                Create new Wish
              </Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
