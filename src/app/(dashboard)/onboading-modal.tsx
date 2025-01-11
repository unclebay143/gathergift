"use client";

import React, { useEffect, useState } from "react";
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
  FormLabel,
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
import { FLUTTER_WAVE_DEFAULT_MOBILE_NUMBER } from "@/service/flutterwave/sub-account.client";

export const onboardingFormSchema = z.object({
  username: z.string().trim().min(3, "Must be at least 3 characters"),
  phone: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
});
export const OnboardingModal = () => {
  const { currentUser } = useAppContext();
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState(1);

  const isStep1 = step === 1;
  const isStep2 = step === 2;
  const isStep3 = step === 3;

  const isOnboarded = !!currentUser?.username;

  const form = useForm<z.infer<typeof onboardingFormSchema>>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      username: currentUser?.username ?? "",
      phone: currentUser?.phone ?? "",
      firstName: currentUser?.firstName ?? "",
      lastName: currentUser?.lastName ?? "",
    },
  });

  const { mutate, isPending: isOnboardingPending } = useMutation({
    mutationFn: ({
      phone,
      ...restOfData
    }: {
      username: string;
      phone?: string;
    }) =>
      axios.post("/api/users/onboard", {
        phone: phone || FLUTTER_WAVE_DEFAULT_MOBILE_NUMBER,
        ...restOfData,
      }),
    onSuccess() {
      setOpen(false);
      toast.success("Profile updated.");
    },
    onError(error: { response: { data: { alreadyExist: boolean } } }) {
      if (error.response?.data?.alreadyExist) {
        toast.error("Username already exist.");
      } else {
        toast.error("An unknown error occurred.");
      }
    },
  });

  const handleNext = () => {
    if (isStep1) {
      if (!form.getValues("username")) {
        return form.setError("username", {
          type: "required",
          message: "Required",
        });
      }
      if (form.getValues("username").length < 3) {
        return form.setError("username", {
          type: "min",
          message: "Must be at least 3 characters",
        });
      }
      return setStep(2);
    }

    if (isStep2) {
      if (!form.getValues("firstName")) {
        return form.setError("firstName", {
          type: "required",
          message: "Required",
        });
      }

      if (!form.getValues("lastName")) {
        return form.setError("lastName", {
          type: "required",
          message: "Required",
        });
      }
      return setStep(3);
    }
  };

  const handleSubmit = form.handleSubmit((data) => {
    if (isStep3) {
      mutate(data);
    }
  });

  useEffect(() => {
    if (currentUser) {
      form.setValue("username", currentUser?.username);
    }
  }, [currentUser, form]);

  if (isOnboarded) {
    return null;
  }

  return (
    <Dialog open={open}>
      <DialogContent className='bg-white' overlayClassName='backdrop-blur-sm'>
        <DialogHeader>
          <DialogTitle>
            Set your {isStep1 && "Username"}
            {isStep2 && "Full Name"}
            {isStep3 && "Phone"}
          </DialogTitle>
          <DialogDescription>
            {isStep1 &&
              "Choose a unique username—it can't be changed later. Click continue to proceed!"}
            {isStep2 &&
              "Enter your first and last name exactly as they appear on your bank withdrawal details."}
            {isStep3 &&
              "Our payment providers need this for contact regarding contributions. It defaults to '010101010' if left blank and can be updated in your settings anytime."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-2 items-end'
          >
            <div className='w-full'>
              {isStep1 && (
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
              )}
              {isStep2 && (
                <div className='space-y-4'>
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormField
                      control={form.control}
                      name='firstName'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className='bg-zinc-50 w-full'
                              placeholder='Alon'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormItem>

                  <FormItem>
                    <FormLabel>Last Name (surname)</FormLabel>
                    <FormField
                      control={form.control}
                      name='lastName'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className='bg-zinc-50 w-full'
                              placeholder='Musk'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormItem>
                </div>
              )}
              {isStep3 && (
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className='bg-zinc-50 w-full'
                          placeholder='i.e +23480XXXXXXXX'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <div>
              {!isStep3 && (
                <Button
                  disabled={isOnboardingPending}
                  type='button'
                  onClick={handleNext}
                >
                  Continue
                  <ArrowRight />
                </Button>
              )}

              {isStep3 && (
                <Button disabled={isOnboardingPending} type='submit'>
                  {isOnboardingPending ? "Please wait..." : "Complete 🎉"}
                  {isOnboardingPending && (
                    <LoaderCircle className='animate-spin' />
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
