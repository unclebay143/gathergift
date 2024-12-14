import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { EllipsisVertical, ExternalLink, Plus, Settings } from "lucide-react";

import Link from "next/link";
import React from "react";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const wishes = [
  {
    id: 1,
    title: "Christmas Wishes",
    items: 12,
    date: "Oct 12, 2024",
    current: 5000,
    target: 10000,
    progress: 50,
    image:
      "https://th.bing.com/th/id/R.f75acc02108ae48f5d83cb0937396756?rik=h2U2ft6aLlgP%2bQ&riu=http%3a%2f%2fbeststandupmixersforbaking.com%2fwp-content%2fuploads%2f2020%2f08%2fSpecial-Birthday-Cakes-1.jpg&ehk=UmV%2fN%2fPhoBDrjOhH3NGNKmUWq%2fkTFjebr1Q0%2fes0rzU%3d&risl=&pid=ImgRaw&r=0",
  },
];
const Page = () => {
  // const isMobile = useIsMobile();

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
          <div className='flex flex-col sm:flex-row gap-4  sm:items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
                Wishes
              </h1>
              <p className='text-muted-foreground'>
                Manage and track your gift wishes
              </p>
            </div>
            <Button asChild className='bg-black hover:bg-gray-800'>
              <Link href='/wishes/create'>
                <Plus className='mr-2 h-4 w-4' />
                Create new Wish
              </Link>
            </Button>
          </div>

          <div className='mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
