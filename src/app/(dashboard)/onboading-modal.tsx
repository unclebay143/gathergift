"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useAppContext } from "../providers";

export const onboardingFormSchema = z.object({
  username: z.string().trim().min(3, "Must be at least 3 characters"),
});
export const OnboardingModal = () => {
  const { currentUser } = useAppContext();
  const hasUsername = !!currentUser?.username;

  const [open, setOpen] = useState(true);
  const form = useForm<z.infer<typeof onboardingFormSchema>>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      username: "",
    },
  });

  const { mutate, isPending: isOnboardingPending } = useMutation({
    mutationFn: (username: string) =>
      axios.post("/api/users/onboard", { username }),
    onSuccess() {
      setOpen(false);
      toast.success("Username updated.");
    },
    onError(error: { response: { data: { alreadyExist: boolean } } }) {
      if (error.response?.data?.alreadyExist) {
        toast.error("Username already exist.");
      } else {
        toast.error("An unknown error occurred.");
      }
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    mutate(data.username);
  });

  if (hasUsername) {
    return null;
  }

  return (
    <Dialog open={open}>
      <DialogContent className='bg-white' overlayClassName='backdrop-blur-sm'>
        <DialogHeader>
          <DialogTitle>Set your Username</DialogTitle>
          <DialogDescription>
            Choose a unique username—it can&apos;t be changed later. Click
            continue to proceed!
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-2 items-end'
          >
            <div className='w-full'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className='bg-zinc-50 w-full'
                        placeholder='Enter unique username'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Button disabled={isOnboardingPending} type='submit'>
                {isOnboardingPending ? "Please wait..." : "Continue"}

                {isOnboardingPending ? (
                  <LoaderCircle className='animate-spin' />
                ) : (
                  <ArrowRight />
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
