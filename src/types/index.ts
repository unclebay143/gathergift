import { CURRENCIES, WISH_CATEGORIES, WISH_VISIBILITIES } from "@/const";

export type User = {
  _id: string;
  photo: string;
  firstName: string;
  lastName: string;
  username: string;
} | null;

export type Item = {
  _id?: string;
  wishlist?: string;
  name: string;
  description?: string;
  image_url?: string;
  amount: number;
  contributed_amount?: number;
};
export type Items = Item[];

export type Categories = (typeof WISH_CATEGORIES)[number];
export type WishlistVisibility = (typeof WISH_VISIBILITIES)[number];

export type WishList = {
  _id?: string;
  owner: User;
  coverImage?: string;
  visibility: WishlistVisibility;
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

export type WishLists = WishList[];

export type Currency = (typeof CURRENCIES)[number];
