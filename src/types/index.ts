export type Item = {
  name: string;
  price: number | null;
  image?: File;
  description?: string;
};

export type Items = Item[];

export type Wish = {
  title: string;
  description: string;
  target: number;
  endDate: string;
  items: Items;
  currency: "NGN" | "USD" | null;
  category: "Wedding" | "Christmas" | null;
  itemsEnabled: boolean;
  thankYouMessage?: string;
};

export type Wishes = Wish[];
