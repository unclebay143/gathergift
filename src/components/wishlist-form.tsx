"use client";

import { useState, useCallback, useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, Loader, Plus, Trash2, Upload } from "lucide-react";
import type { WishList } from "@/types";
import {
  WISH_CATEGORIES,
  CATEGORY_TAG_LINES,
  CURRENCIES,
  WISH_VISIBILITIES,
} from "@/const";
import { isValidDate } from "@/lib/utils";
import Image from "next/image";
import { uploadImage } from "@/utils/image-uploader";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const wishFormSchema = z.object({
  _id: z.string().optional(),
  coverImage: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  currency: z.enum(CURRENCIES),
  visibility: z.enum(WISH_VISIBILITIES),
  category: z.enum(WISH_CATEGORIES).nullable(),
  target_amount: z
    .number()
    .min(1, "Target amount must be greater than 0")
    .nullable(),
  endDate: z.coerce.date().optional(),
  itemsEnabled: z.boolean(),
  thankYouMessage: z
    .string()
    .max(500, "Thank you message must be 500 characters or less")
    .optional(),
  items: z.array(
    z.object({
      name: z.string().min(1, "Item name is required"),
      externalLink: z.string().url().or(z.literal("")),
      amount: z.number().min(0, "Price must be 0 or greater").nullable(),
      description: z
        .string()
        .max(200, "Item description must be 200 characters or less")
        .optional(),

      image_url: z.string().optional(),
    })
  ),
});

type WishFormProps = {
  onSubmit: (
    data: Omit<WishList, "owner" | "isArchived" | "contributed_amount">
  ) => void;
  initialData?: Omit<WishList, "owner" | "isArchived" | "contributed_amount">;
};

export function WishForm({ onSubmit, initialData }: WishFormProps) {
  const hasItems =
    (initialData?.items.length || 0) > 0 && !!initialData?.items[0]?._id; // for case where wishlists with no items has contributed_amount

  const [itemsEnabled, setItemsEnabled] = useState(hasItems);

  const [isUploadingCoverImage, setIsUploadingCoverImage] = useState(false);

  const form = useForm<z.infer<typeof wishFormSchema>>({
    resolver: zodResolver(wishFormSchema),
    defaultValues: {
      ...initialData,
      coverImage: initialData?.coverImage || "",
      title: initialData?.title || "",
      thankYouMessage: initialData?.thankYouMessage || "",
      visibility: initialData?.visibility || "PUBLIC",
      items: itemsEnabled ? initialData?.items : [],
      target_amount: initialData?.target_amount ?? null,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const endDate = useWatch({
    control: form.control,
    name: "endDate",
  });

  const items = useWatch({
    control: form.control,
    name: "items",
  });

  const category = useWatch({
    control: form.control,
    name: "category",
  });

  const description = useWatch({
    control: form.control,
    name: "description",
  });

  useEffect(() => {
    if (category && !description) {
      form.setValue("description", CATEGORY_TAG_LINES[category]);
    }
  }, [category, form]);

  const handleImageUpload = useCallback(
    (index: number, imageUrl: string) => {
      form.setValue(`items.${index}.image_url`, imageUrl);
    },
    [form]
  );

  const handleImageRemove = useCallback(
    (index: number) => {
      form.setValue(`items.${index}.image_url`, "");
    },
    [form]
  );

  useEffect(() => {
    if (itemsEnabled) {
      const totalAmount = items.reduce(
        (sum, item) => sum + (Number(item.amount) || 0),
        0
      );
      if (totalAmount !== form.getValues("target_amount")) {
        form.setValue(
          "target_amount",
          totalAmount

          // Todo: validate here only when in edit mode (not create mode)
          // { shouldValidate: true }
        );
      }
    }
  }, [form, itemsEnabled, items]);

  const handleSubmit = form.handleSubmit((data) => {
    const formattedData = {
      ...data,
      target_amount: data.itemsEnabled
        ? data.items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0)
        : Number(data.target_amount),
      items: data.items.map((item) => ({
        ...item,
        amount: Number(item.amount),
      })),
    };
    onSubmit(formattedData);
  });

  useEffect(() => {
    if (typeof endDate === "string" && !isValidDate(endDate)) {
      form.setValue("endDate", undefined);
    }
  }, [endDate, form]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className='space-y-8'>
        <FormField
          control={form.control}
          name='coverImage'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <div className='flex items-center'>
                  <Input
                    type='file'
                    accept='image/*'
                    onChange={async (e) => {
                      try {
                        setIsUploadingCoverImage(true);
                        const file = e.target.files?.[0];
                        if (file) {
                          const result = await uploadImage(file);
                          const uploadedUrl = result?.[0]?.secure_url;
                          if (uploadedUrl) {
                            form.setValue("coverImage", uploadedUrl);
                            return setIsUploadingCoverImage(false);
                          }
                          setIsUploadingCoverImage(false);
                        }
                      } catch (error) {
                        console.log(error);
                        setIsUploadingCoverImage(false);
                      }
                    }}
                    className='hidden'
                    id='coverImage'
                  />

                  {field.value ? (
                    <div className='group relative h-10 w-10 rounded-md overflow-hidden border'>
                      <div className='absolute bg-zinc-100/90 animate-pulse inset-0' />
                      <Tooltip>
                        <TooltipProvider>
                          <TooltipTrigger asChild>
                            <div>
                              <button
                                onClick={() => form.setValue("coverImage", "")}
                                className='invisible w-10 h-10 group-hover:visible absolute bg-black/50 z-20 inset-0 flex items-center justify-center'
                              >
                                <Trash2 className='size-3 text-zinc-50' />
                              </button>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side='bottom' sideOffset={45}>
                            Remove image
                          </TooltipContent>
                        </TooltipProvider>
                      </Tooltip>
                      <Image
                        src={field.value}
                        alt='Preview'
                        className='object-cover'
                        fill
                      />
                    </div>
                  ) : (
                    <label
                      htmlFor='coverImage'
                      className='cursor-pointer bg-gray-200 hover:bg-gray-300 p-2 rounded-md'
                    >
                      {isUploadingCoverImage ? (
                        <Loader className='size-5 animate-spin' />
                      ) : (
                        <Upload className='size-5' />
                      )}
                    </label>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value || undefined}
              >
                <FormControl>
                  <SelectTrigger className='bg-zinc-50'>
                    <SelectValue placeholder='Select a Category' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {WISH_CATEGORIES.map((category) => (
                      <SelectItem value={category} key={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  className='bg-zinc-50'
                  placeholder='My Christmas Wishlist'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className='bg-zinc-50'
                  placeholder='Describe your wishlist...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='currency'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value || undefined}
              >
                <FormControl>
                  <SelectTrigger className='bg-zinc-50'>
                    <SelectValue placeholder='Select a currency' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Currencies</SelectLabel>
                    {CURRENCIES.map((currency) => (
                      <SelectItem
                        value={currency}
                        key={`currency-items-${currency}`}
                      >
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='itemsEnabled'
          render={({ field }) => (
            <FormItem className='flex bg-zinc-50 flex-row items-center justify-between rounded-lg border p-4'>
              <div className='space-y-0.5'>
                <FormLabel className='text-base'>Enable Items</FormLabel>
                <FormDescription>
                  Toggle to enable or disable individual items for this
                  wishlist.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    setItemsEnabled(checked);
                    if (!checked) {
                      form.setValue("target_amount", 0, {
                        shouldValidate: true,
                      });
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className={itemsEnabled ? "" : "opacity-50 pointer-events-none"}>
          <h3 className='text-lg font-medium mb-2'>Wishlist Items</h3>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className='flex flex-col gap-4 mb-4 p-4 border rounded-md bg-zinc-50'
            >
              <FormField
                control={form.control}
                name={`items.${index}.image_url`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Image</FormLabel>
                    <FormControl>
                      <div className='flex items-center'>
                        <Input
                          type='file'
                          accept='image/*'
                          onChange={async (e) => {
                            try {
                              const file = e.target.files?.[0];
                              if (file) {
                                const result = await uploadImage(file);
                                const uploadedUrl = result?.[0]?.secure_url;
                                if (uploadedUrl) {
                                  return handleImageUpload(index, uploadedUrl);
                                }
                              }
                            } catch (error) {
                              console.log(error);
                            }
                          }}
                          className='hidden'
                          id={`image-upload-${index}`}
                        />
                        {field.value ? (
                          <div className='group relative h-10 w-10 rounded-md overflow-hidden border'>
                            <div className='absolute bg-zinc-100/90 animate-pulse inset-0' />
                            <Tooltip>
                              <TooltipProvider>
                                <TooltipTrigger asChild>
                                  <div>
                                    <button
                                      onClick={() => handleImageRemove(index)}
                                      className='invisible w-10 h-10 group-hover:visible absolute bg-black/50 z-20 inset-0 flex items-center justify-center'
                                    >
                                      <Trash2 className='size-3 text-zinc-50' />
                                    </button>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent side='bottom' sideOffset={45}>
                                  Remove image
                                </TooltipContent>
                              </TooltipProvider>
                            </Tooltip>
                            <Image
                              src={field.value}
                              alt='Preview'
                              className='object-cover'
                              fill
                            />
                          </div>
                        ) : (
                          <label
                            htmlFor={`image-upload-${index}`}
                            className='cursor-pointer bg-gray-200 hover:bg-gray-300 p-2 rounded-md'
                          >
                            <Upload className='h-5 w-5' />
                          </label>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex gap-4'>
                <FormField
                  control={form.control}
                  name={`items.${index}.name`}
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>Item Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Item name'
                          {...field}
                          className='bg-zinc-50/50'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`items.${index}.amount`}
                  render={({ field }) => (
                    <FormItem className='w-1/3'>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='Enter price'
                          className='bg-zinc-50/50'
                          value={field.value === null ? "" : field.value}
                          onChange={(e) => {
                            const value =
                              e.target.value === ""
                                ? null
                                : parseFloat(e.target.value);
                            form.setValue(`items.${index}.amount`, value, {
                              shouldValidate: true,
                            });
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name={`items.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Item Description{" "}
                      <span className='text-xs text-zinc-400'>(Optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Describe how this item will help with your wishlist...'
                        className='bg-zinc-50/50'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`items.${index}.externalLink`}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>
                      Item Link{" "}
                      <span className='text-xs text-zinc-400'>(Optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='i.e Amazon, Jumia'
                        {...field}
                        className='bg-zinc-50/50'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex justify-end'>
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  onClick={() => remove(index)}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            </div>
          ))}
          <Button
            type='button'
            variant='outline'
            size='sm'
            className='mt-2'
            onClick={() =>
              append({
                name: "",
                amount: null,
                description: "",
                externalLink: "",
              })
            }
          >
            <Plus className='mr-2 h-4 w-4' /> Add Item
          </Button>
        </div>

        <FormField
          control={form.control}
          name='target_amount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Amount</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  {...field}
                  value={
                    field.value === null || field.value === 0 ? "" : field.value
                  }
                  placeholder='Enter target amount'
                  onChange={(e) => {
                    const value =
                      e.target.value === "" ? null : parseFloat(e.target.value);
                    field.onChange(value);
                  }}
                  readOnly={itemsEnabled}
                  className={itemsEnabled ? "bg-gray-100" : "bg-zinc-50"}
                />
              </FormControl>
              <FormDescription>
                {itemsEnabled
                  ? "This amount is automatically calculated from the sum of item prices."
                  : "Enter the total target amount for your wishlist."}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='endDate'
          render={({ field }) => (
            <FormItem>
              <div className='space-y-0.5'>
                <FormLabel>End Date</FormLabel>
                <FormDescription>
                  Specify the date when contributions will no longer be
                  accepted.
                </FormDescription>
              </div>

              <FormControl>
                <Input
                  className='bg-zinc-50'
                  type='date'
                  {...field}
                  value={field.value ? field.value.toString() : ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='thankYouMessage'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thank You Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Write a custom thank you message for your contributors...'
                  className='bg-zinc-50'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This message will be shown to contributors after they donate.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='visibility'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between gap-5'>
              <div className='space-y-0.5'>
                <FormLabel className='capitalize text-base'>
                  Visibility ({field.value.toLowerCase()})
                </FormLabel>
                <FormDescription>
                  Decide who can view this wishlist. Use the toggle to make it
                  public for everyone or private for personal use.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value === "PUBLIC" ? true : false}
                  onCheckedChange={(checked) => {
                    field.onChange(checked ? "PUBLIC" : "PRIVATE");
                    if (!checked) {
                      form.setValue(
                        "visibility",
                        checked ? "PUBLIC" : "PRIVATE",
                        {
                          shouldValidate: true,
                        }
                      );
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className='w-full flex items-end justify-end'>
          <Button type='submit'>
            Preview <ArrowRight className='ml-2 h-4 w-4' />
          </Button>
        </div>
      </form>
    </Form>
  );
}
