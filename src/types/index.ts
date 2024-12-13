import { CATEGORIES, CATEGORY_TAG_LINES } from "@/const";

export type Item = {
  name: string;
  price: number | null;
  image?: File;
  description?: string;
};
export type Items = Item[];

export type Categories = (typeof CATEGORIES)[number];

export type Wish = {
  visibility: "PUBLIC" | "PRIVATE";
  title: string;
  description: string;
  target: number;
  endDate: string;
  items: Items;
  currency: "NGN" | "USD" | null;
  category: Categories | null;
  itemsEnabled: boolean;
  thankYouMessage?: string;
};

export type Wishes = Wish[];
