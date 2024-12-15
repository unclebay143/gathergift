import { Wishes } from "@/types";

export const wishes: Wishes = [
  {
    _id: "1",
    visibility: "PUBLIC",
    title: "Dream Wedding",
    description:
      "Help us make our wedding day extra special with your contributions!",
    target: 1000000,
    endDate: "2024-12-31",
    items: [
      { _id: "", contributed_amount: 0, name: "Wedding Cake", amount: 50000 },
      {
        _id: "",
        contributed_amount: 0,
        name: "Venue Decoration",
        amount: 300000,
      },
    ],
    currency: "NGN",
    category: "Wedding",
    itemsEnabled: true,
    thankYouMessage: "Thank you for helping us create a memorable day!",
    isArchived: false,
  },
  {
    _id: "2",
    visibility: "PRIVATE",
    title: "Baby Shower Bliss",
    description:
      "Join us in welcoming our little one with your heartfelt gifts!",
    target: 200000,
    endDate: "2024-06-15",
    items: [
      { _id: "", contributed_amount: 0, name: "Baby Crib", amount: 80000 },
      { _id: "", contributed_amount: 0, name: "Diaper Supply", amount: 20000 },
    ],
    currency: "NGN",
    category: "BabyShower",
    itemsEnabled: true,
    isArchived: false,
  },
  {
    _id: "3",
    visibility: "PUBLIC",
    title: "Christmas Wishlist",
    description:
      "Make this Christmas magical for our family with your kind gestures!",
    target: 500000,
    endDate: "2024-12-24",
    items: [
      { _id: "", contributed_amount: 0, name: "Christmas Tree", amount: 50000 },
      { _id: "", contributed_amount: 0, name: "Holiday Feast", amount: 100000 },
    ],
    currency: "USD",
    category: "Christmas",
    itemsEnabled: false,
    thankYouMessage: "Thank you for making our holiday season magical!",
    isArchived: false,
  },
  {
    _id: "4",
    visibility: "PRIVATE",
    title: "Vacation Dream",
    description: "Help us turn our dream vacation into reality!",
    target: 3000000,
    endDate: "2025-01-15",
    items: [
      {
        _id: "",
        contributed_amount: 0,
        name: "Flight Tickets",
        amount: 1500000,
      },
      { _id: "", contributed_amount: 0, name: "Hotel Stay", amount: 1000000 },
    ],
    currency: "USD",
    category: "Vacation",
    itemsEnabled: true,
    isArchived: true,
  },
];
