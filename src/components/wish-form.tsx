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
import { ArrowRight, Plus, Trash2, Upload } from "lucide-react";
import { Wish } from "@/types";
import { CATEGORIES, CATEGORY_TAG_LINES } from "@/const";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const wishFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  currency: z.enum(["USD", "NGN"]).nullable(),
  visibility: z.enum(["PUBLIC", "PRIVATE"]),
  category: z.enum(CATEGORIES).nullable(),
  target: z.number().min(1, "Target amount must be greater than 0").nullable(),
  endDate: z.string().min(1, "End date is required"),
  itemsEnabled: z.boolean(),
  thankYouMessage: z
    .string()
    .max(500, "Thank you message must be 500 characters or less")
    .optional(),
  items: z.array(
    z.object({
      name: z.string().min(1, "Item name is required"),
      price: z.number().min(0, "Price must be 0 or greater").nullable(),
      description: z
        .string()
        .max(200, "Item description must be 200 characters or less")
        .optional(),

      image: z
        .any()
        .refine((file) => file instanceof File, "Image is required")
        .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          "Only .jpg, .jpeg, .png and .webp formats are supported."
        )
        .optional(),
    })
  ),
});

type WishFormProps = {
  onSubmit: (data: Wish) => void;
  initialData?: Wish;
};

export function WishForm({ onSubmit, initialData }: WishFormProps) {
  const [itemsEnabled, setItemsEnabled] = useState(
    initialData?.itemsEnabled ?? true
  );

  const form = useForm<z.infer<typeof wishFormSchema>>({
    resolver: zodResolver(wishFormSchema),
    defaultValues: {
      ...initialData,
      currency: initialData?.currency,
      category: initialData?.category,
      thankYouMessage: initialData?.thankYouMessage || "",
      visibility: initialData?.visibility || "PUBLIC",
      itemsEnabled: initialData?.itemsEnabled ?? true,
      items: initialData?.items || [],
      target: initialData?.target ?? null,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const items = useWatch({
    control: form.control,
    name: "items",
  });

  const category = useWatch({
    control: form.control,
    name: "category",
  });

  useEffect(() => {
    if (category) {
      form.setValue("description", CATEGORY_TAG_LINES[category]);
    }
  }, [category, form]);

  const handleImageUpload = useCallback(
    (index: number, file: File) => {
      form.setValue(`items.${index}.image`, file);
    },
    [form]
  );

  console.log("loop");

  useEffect(() => {
    if (itemsEnabled) {
      const totalAmount = items.reduce(
        (sum, item) => sum + (Number(item.price) || 0),
        0
      );
      if (totalAmount !== form.getValues("target")) {
        form.setValue("target", totalAmount, { shouldValidate: true });
      }
    }
  }, [form, itemsEnabled, items]);

  const handleSubmit = form.handleSubmit((data) => {
    const formattedData = {
      ...data,
      target: data.itemsEnabled
        ? data.items.reduce((sum, item) => sum + (Number(item.price) || 0), 0)
        : Number(data.target),
      items: data.items.map((item) => ({
        ...item,
        price: Number(item.price),
      })),
    };
    onSubmit(formattedData);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className='space-y-8'>
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
                    {CATEGORIES.map((category) => (
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
                  placeholder='My Christmas Wish'
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
                  placeholder='Describe your wish...'
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
                    <SelectItem value='USD'>USD</SelectItem>
                    <SelectItem value='NGN'>NGN</SelectItem>
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
                  Toggle to enable or disable individual items for this wish.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    setItemsEnabled(checked);
                    if (!checked) {
                      form.setValue("target", 0, { shouldValidate: true });
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className={itemsEnabled ? "" : "opacity-50 pointer-events-none"}>
          <h3 className='text-lg font-medium mb-2'>Wish Items</h3>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className='flex flex-col gap-4 mb-4 p-4 border rounded-md bg-zinc-50'
            >
              <div className='flex gap-4'>
                <FormField
                  control={form.control}
                  name={`items.${index}.name`}
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>Item Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Item name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`items.${index}.price`}
                  render={({ field }) => (
                    <FormItem className='w-1/3'>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='Enter price'
                          value={field.value === null ? "" : field.value}
                          onChange={(e) => {
                            const value =
                              e.target.value === ""
                                ? null
                                : parseFloat(e.target.value);
                            form.setValue(`items.${index}.price`, value, {
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
                        placeholder='Describe how this item will help with your wish...'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`items.${index}.image`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Image</FormLabel>
                    <FormControl>
                      <div className='flex items-center'>
                        <Input
                          type='file'
                          accept='image/*'
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageUpload(index, file);
                            }
                          }}
                          className='hidden'
                          id={`image-upload-${index}`}
                        />
                        <label
                          htmlFor={`image-upload-${index}`}
                          className='cursor-pointer bg-gray-200 hover:bg-gray-300 p-2 rounded-md'
                        >
                          <Upload className='h-5 w-5' />
                        </label>
                        {field.value && (
                          <img
                            src={URL.createObjectURL(field.value)}
                            alt='Preview'
                            className='ml-2 h-10 w-10 object-cover rounded-md'
                          />
                        )}
                      </div>
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
            onClick={() => append({ name: "", price: null, description: "" })}
          >
            <Plus className='mr-2 h-4 w-4' /> Add Item
          </Button>
        </div>

        <FormField
          control={form.control}
          name='target'
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
                  className={itemsEnabled ? "bg-gray-100" : ""}
                />
              </FormControl>
              <FormDescription>
                {itemsEnabled
                  ? "This amount is automatically calculated from the sum of item prices."
                  : "Enter the total target amount for your wish."}
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
                <Input className='bg-zinc-50' type='date' {...field} />
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
            <FormItem className='flex bg-zinc-50 flex-row items-center justify-between'>
              <div className='space-y-0.5'>
                <FormLabel className='capitalize text-base'>
                  Visibility ({field.value.toLowerCase()})
                </FormLabel>
                <FormDescription>
                  Decide who can view this wish list. Use the toggle to make it
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
