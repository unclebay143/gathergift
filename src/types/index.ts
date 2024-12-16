import { WISH_CATEGORIES } from "@/const";

export type Item = {
  _id?: string;
  wish?: string;
  name: string;
  description?: string;
  image_url?: string;
  amount: number;
  contributed_amount?: number;
};
export type Items = Item[];

export type Categories = (typeof WISH_CATEGORIES)[number];

export type Wish = {
  _id: string;
  owner: string;
  coverImage?: string;
  visibility: "PUBLIC" | "PRIVATE";
  title: string;
  endDate?: Date;
  description: string;
  items: Items;
  currency: "NGN" | "USD";
  category: Categories | null;
  itemsEnabled: boolean;
  thankYouMessage?: string;
  isArchived: boolean;
  target_amount: number;
  contributed_amount: number;
};

export type Wishes = Wish[];
