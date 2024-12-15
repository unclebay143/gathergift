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
  Gift,
  Plus,
  Search,
  Share2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Wishes } from "@/types";
import { wishes } from "@/utils/dummy";

export const WishesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [wishesState, setWishesState] = useState<Wishes>(wishes);

  const filteredWishes = wishesState.filter(
    (wish) =>
      (wish.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wish.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      !wish.isArchived
  );

  const handleToggleVisibility = (id: string) => {
    setWishesState((prevWishes) =>
      prevWishes.map((wish) =>
        wish._id === id
          ? {
              ...wish,
              visibility: wish.visibility === "PUBLIC" ? "PRIVATE" : "PUBLIC",
            }
          : wish
      )
    );
  };

  const handleArchive = (id: string) => {
    setWishesState((prevWishes) =>
      prevWishes.map((wish) =>
        wish._id === id ? { ...wish, isArchived: true } : wish
      )
    );
  };

  return (
    <>
      {/* <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
        <div className='aspect-video rounded-xl bg-muted/50' />
        <div className='aspect-video rounded-xl bg-muted/50' />
        <div className='aspect-video rounded-xl bg-muted/50' />
      </div>
      <div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min' /> */}
      {/* <div className='space-y-4 max-w-4xl mx-auto w-full'>
        <h3 className='font-semibold text-2xl text-zinc-900'>Wishes</h3>
        <div className='flex justify-end'>
          <Button>Create new Wish</Button>
        </div>
        <div className='gap-4 grid grid-cols-1 md:grid-cols-2 '>
          {Array.from({ length: 20 })
            .fill({ name: "Christmas Wishes" })
            .map(({ name }, idx) => {
              return (
                <div
                  className='border rounded-lg border-zinc-200 p-4 text-zinc-700 bg-white flex flex-col gap-5 hover:shadow-md shadow-emerald-300 cursor-pointer'
                  key={idx}
                >
                  <div className='flex justify-between items-center gap-2 '>
                    <h3>{name}</h3>
                    <span className='text-red-600 border rounded-lg p-2 shadow-sm'>
                      <Cake />
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <div className='text-zinc-500 text-xs flex gap-1.5 items-center'>
                      <span>12 items</span>
                      <svg
                        width='1'
                        height='12'
                        viewBox='0 0 1 12'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <rect width='1' height='12' fill='#E4E4E7' />
                      </svg>
                      <span>Oct 12, 2024</span>
                    </div>
                    <span className='text-xs sm:text-sm text-gray-600'>
                      $5,000 / <span className='text-xs'>$10,000</span>
                    </span>
                  </div>

                  <div className='flex w-full items-center gap-2'>
                    <div className='w-full bg-gray-200 rounded-full h-2'>
                      <div
                        className='bg-black h-2 rounded-full'
                        style={{ width: `${50}%` }}
                      ></div>
                    </div>
                    <span className='text-xs sm:text-sm text-gray-600'>
                      {50}%
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div> */}

      <div className='flex flex-col'>
        <div className='container w-full mx-auto px-4 py-6 lg:px-8'>
          <div className='flex flex-col lg:flex-row gap-4 lg:items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
                My Wishes
              </h1>
              <p className='text-muted-foreground'>
                Track and manage your gift wishes. Create new wishes, set goals,
                and share with friends and family.
              </p>
            </div>

            <div className='flex items-center gap-4'>
              <div className='relative'>
                <Search className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400' />
                <Input
                  type='text'
                  placeholder='Search wishes...'
                  className='pl-8 w-[200px] md:w-[300px]'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button asChild className='bg-black hover:bg-gray-800'>
                <Link href='/wishes/create'>
                  <Plus className='mr-2 h-4 w-4' />
                  Create new Wish
                </Link>
              </Button>
            </div>
          </div>

          <div className='mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
            {filteredWishes.map((wish) => (
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
                      {wish.items.length} items
                    </Badge>
                    <span className='text-sm text-muted-foreground'>
                      <Calendar className='inline mr-1 h-3 w-3' />
                      {wish.endDate}
                    </span>
                  </div>
                  <Progress
                    // value={wish.progress}
                    className='h-2 bg-indigo-100 dark:bg-indigo-950'
                  />
                  <div className='flex justify-between items-center text-sm'>
                    <span className='font-medium text-green-600 dark:text-green-400'>
                      <DollarSign className='inline mr-1 h-3 w-3' />
                      {/* {wish.current.toLocaleString()} */}
                    </span>
                    <span className='text-muted-foreground'>
                      of ${wish.target.toLocaleString()}
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
                        {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
                        <DropdownMenuItem
                          onClick={() => handleToggleVisibility(wish._id)}
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
                        <DropdownMenuItem>
                          <Share2 className='mr-2 h-4 w-4' />
                          Share Wish
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className='text-red-600'
                          onClick={() => handleArchive(wish._id)}
                        >
                          <Archive className='mr-2 h-4 w-4' />
                          Archive Wish
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredWishes.length === 0 && (
            <div className='text-center py-12'>
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

          {/* <div className='mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
            {wishes.map((wish) => (
              <Card
                key={wish.id}
                className='group overflow-hidden transition-all hover:shadow-lg'
              >
                <CardHeader className='border-b bg-gray-50/50 transition-colors group-hover:bg-gray-50'>
                  <div className='flex items-center justify-between'>
                    <CardTitle className='text-xl font-semibold'>
                      {wish.title}
                    </CardTitle>
                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary/10'>
                      🎁
                    </div>
                  </div>
                </CardHeader>
                <CardContent className='p-6'>
                  <div className='mb-4'>
                    <img
                      src={wish.image}
                      alt='Wish preview'
                      className='aspect-video w-full rounded-lg object-cover'
                      width={300}
                      height={170}
                    />
                  </div>
                  <div className='space-y-3'>
                    <div className='flex items-center justify-between text-sm'>
                      <span className='text-muted-foreground'>
                        {wish.items} items
                      </span>
                      <span className='text-muted-foreground'>{wish.date}</span>
                    </div>
                    <Progress value={wish.progress} className='h-2' />
                    <div className='flex items-center justify-between text-sm'>
                      <span className='font-medium text-green-600'>
                        ${wish.current.toLocaleString()}
                      </span>
                      <span className='text-muted-foreground'>
                        of ${wish.target.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className='flex items-center justify-between w-full gap-1'>
                    <div className='flex items-center'>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant='ghost'
                            className='h-8 w-8 rounded-full text-zinc-600'
                          >
                            <EllipsisVertical />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          align='start'
                          className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg flex flex-col gap-3'
                        >
                          <div className='flex justify-between cursor-default gap-5 select-none items-center rounded-sm text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'>
                            <p className='flex flex-col'>
                              Archive
                              <span className='text-xs text-zinc-500'>
                                Soft delete this wish list.
                              </span>
                            </p>
                            <Switch />
                          </div>
                          <div className='flex justify-between cursor-default gap-5 select-none items-center rounded-sm text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'>
                            <p className='flex flex-col'>
                              Visibility
                              <span className='text-xs text-zinc-500'>
                                Remove it from community view.
                              </span>
                            </p>
                            <Switch />
                          </div>
                        </PopoverContent>
                      </Popover>

                      <Button
                        variant='ghost'
                        className='h-8 w-8 rounded-full text-zinc-600'
                      >
                        <Settings />
                      </Button>
                    </div>
                    <Button
                      variant='ghost'
                      className='h-8 w-8 rounded-full text-zinc-600'
                    >
                      <ExternalLink />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div> */}
        </div>
      </div>
    </>
  );
};
