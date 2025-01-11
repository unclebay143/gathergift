"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/types";

type Props = { initialData: User };

export const wishFormSchema = z.object({
  username: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string(),
});

export const SettingsDashboard = ({ initialData }: Props) => {
  const form = useForm<z.infer<typeof wishFormSchema>>({
    resolver: zodResolver(wishFormSchema),
    defaultValues: {
      ...initialData,
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className='relative container bg-white rounded-lg mx-auto px-12 py-8 min-h-[90vh] flex justify-between flex-col'>
      <div>
        <div className='space-y-1 mb-6'>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent'>
            Profile data
          </h1>
          <p className='text-muted-foreground'>
            Update your existing wishlist.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={handleSubmit} className='space-y-8'>
            <FormField
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input
                      className='bg-zinc-50'
                      placeholder='i.e Alon'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input
                      className='bg-zinc-50'
                      placeholder='i.e Musk'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile number</FormLabel>
                  <FormDescription>
                    Our payment providers need this for contact regarding
                    contributions. It defaults to &apos;010101010&apos; if left
                    blank and can be updated in your settings anytime.
                  </FormDescription>

                  <FormControl>
                    <Input
                      className='bg-zinc-50'
                      placeholder='i.e +23480XXXXXXXX'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input disabled className='bg-zinc-50' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      className='bg-zinc-50'
                      placeholder='johndoe@gmail.com'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};
