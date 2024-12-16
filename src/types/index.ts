import { CURRENCIES, WISH_CATEGORIES, WISH_VISIBILITIES } from "@/const";

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
  visibility: (typeof WISH_VISIBILITIES)[number];
  title: string;
  endDate?: Date;
  description: string;
  items: Items;
  currency: (typeof CURRENCIES)[number];
  category: Categories | null;
  itemsEnabled: boolean;
  thankYouMessage?: string;
  isArchived: boolean;
  target_amount: number;
  contributed_amount: number;
};

export type Wishes = Wish[];
