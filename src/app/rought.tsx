"use client";

import { useState } from "react";
import {
  Plus,
  ChevronDown,
  Gift,
  Calendar,
  DollarSign,
  Search,
} from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Link from "next/link";

// Sample data - replace with your actual data
const wishes = [
  {
    id: 1,
    title: "Christmas Wishes",
    description: "Gifts for family and friends",
    items: 12,
    date: "Dec 25, 2024",
    current: 5000,
    target: 10000,
    progress: 50,
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 2,
    title: "Birthday Bash",
    description: "My 30th birthday celebration",
    items: 8,
    date: "Aug 15, 2024",
    current: 2000,
    target: 5000,
    progress: 40,
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 3,
    title: "Dream Vacation",
    description: "Saving for a trip to Bali",
    items: 5,
    date: "Jun 1, 2025",
    current: 3000,
    target: 8000,
    progress: 37.5,
    image: "/placeholder.svg?height=100&width=200",
  },
];

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWishes = wishes.filter(
    (wish) =>
      wish.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wish.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 transition-all duration-500'>
      <div className='container px-4 py-8 mx-auto'>
        <div className='flex flex-col md:flex-row items-center justify-between mb-8 gap-4'>
          <div className='space-y-1'>
            <h1 className='text-4xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent'>
              My Wishes
            </h1>
            <p className='text-muted-foreground max-w-2xl'>
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
            <Button
              asChild
              className='bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-200'
            >
              <Link href='/dashboard/wishes/create'>
                <Plus className='mr-2 h-4 w-4' />
                New Wish
              </Link>
            </Button>
          </div>
        </div>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {filteredWishes.map((wish) => (
            <Card
              key={wish.id}
              className='overflow-hidden transition-all duration-300 hover:shadow-xl group dark:bg-gray-800/50 backdrop-blur-sm hover:scale-[1.02]'
            >
              <CardHeader className='p-0'>
                <div className='relative'>
                  <img
                    src={wish.image}
                    alt={wish.title}
                    className='w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105'
                  />
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
                    {wish.items} items
                  </Badge>
                  <span className='text-sm text-muted-foreground'>
                    <Calendar className='inline mr-1 h-3 w-3' />
                    {wish.date}
                  </span>
                </div>
                <Progress
                  value={wish.progress}
                  className='h-2 bg-indigo-100 dark:bg-indigo-950'
                />
                <div className='flex justify-between items-center text-sm'>
                  <span className='font-medium text-green-600 dark:text-green-400'>
                    <DollarSign className='inline mr-1 h-3 w-3' />
                    {wish.current.toLocaleString()}
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
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit Wish</DropdownMenuItem>
                      <DropdownMenuItem>Share Wish</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className='text-red-600'>
                        Delete Wish
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
            <Button
              asChild
              className='bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white'
            >
              <Link href='/dashboard/wishes/create'>
                <Plus className='mr-2 h-4 w-4' />
                Create New Wish
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
