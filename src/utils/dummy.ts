import { Wishes } from "@/types";

export const wishes: Wishes = [
  {
    _id: "1",
    visibility: "PUBLIC",
    owner: "",
    contributed_amount: 200,
    title: "Dream Wedding",
    description:
      "Help us make our wedding day extra special with your contributions!",
    target_amount: 20,
    endDate: new Date("2024-12-31"),
    items: [
      {
        wish: "",
        image_url:
          "https://gathergift.vercel.app/_next/image?url=https%3A%2F%2Friverfrontestates.ca%2Fwp-content%2Fuploads%2F2016%2F05%2FNew-Construction-Homes.jpg&w=1920&q=75",
        contributed_amount: 100,
        _id: "7",
        name: "Wedding Cake",
        amount: 50000,
      },
      {
        wish: "",
        image_url:
          "https://gathergift.vercel.app/_next/image?url=https%3A%2F%2Friverfrontestates.ca%2Fwp-content%2Fuploads%2F2016%2F05%2FNew-Construction-Homes.jpg&w=1920&q=75",
        contributed_amount: 100,
        _id: "6",
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
    owner: "",
    contributed_amount: 2000,
    title: "Baby Shower Bliss",
    description:
      "Join us in welcoming our little one with your heartfelt gifts!",
    target_amount: 200000,
    endDate: new Date("2024-06-15"),
    items: [
      {
        wish: "",
        image_url:
          "https://gathergift.vercel.app/_next/image?url=https%3A%2F%2Friverfrontestates.ca%2Fwp-content%2Fuploads%2F2016%2F05%2FNew-Construction-Homes.jpg&w=1920&q=75",
        contributed_amount: 100,
        _id: "5",
        name: "Baby Crib",
        amount: 80000,
      },
      {
        wish: "",
        image_url:
          "https://gathergift.vercel.app/_next/image?url=https%3A%2F%2Friverfrontestates.ca%2Fwp-content%2Fuploads%2F2016%2F05%2FNew-Construction-Homes.jpg&w=1920&q=75",
        contributed_amount: 100,
        _id: "44",
        name: "Diaper Supply",
        amount: 20000,
      },
    ],
    currency: "NGN",
    category: "BabyShower",
    itemsEnabled: true,
    isArchived: false,
  },
  {
    _id: "3",
    visibility: "PUBLIC",
    owner: "",
    contributed_amount: 10,
    title: "Christmas Wishlist",
    description:
      "Make this Christmas magical for our family with your kind gestures!",
    target_amount: 500000,
    endDate: new Date("2024-12-24"),
    items: [
      {
        wish: "",
        image_url:
          "https://gathergift.vercel.app/_next/image?url=https%3A%2F%2Friverfrontestates.ca%2Fwp-content%2Fuploads%2F2016%2F05%2FNew-Construction-Homes.jpg&w=1920&q=75",
        contributed_amount: 100,
        _id: "",
        name: "Christmas Tree",
        amount: 50000,
      },
      {
        wish: "",
        image_url:
          "https://gathergift.vercel.app/_next/image?url=https%3A%2F%2Friverfrontestates.ca%2Fwp-content%2Fuploads%2F2016%2F05%2FNew-Construction-Homes.jpg&w=1920&q=75",
        contributed_amount: 100,
        _id: "3",
        name: "Holiday Feast",
        amount: 100000,
      },
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
    owner: "",
    contributed_amount: 0,
    title: "Vacation Dream",
    description: "Help us turn our dream vacation into reality!",
    target_amount: 3000000,
    endDate: new Date("2025-01-15"),
    items: [
      {
        wish: "",
        image_url:
          "https://gathergift.vercel.app/_next/image?url=https%3A%2F%2Friverfrontestates.ca%2Fwp-content%2Fuploads%2F2016%2F05%2FNew-Construction-Homes.jpg&w=1920&q=75",
        contributed_amount: 100,
        _id: "1",
        name: "Flight Tickets",
        amount: 1500000,
      },
      {
        wish: "",
        image_url:
          "https://gathergift.vercel.app/_next/image?url=https%3A%2F%2Friverfrontestates.ca%2Fwp-content%2Fuploads%2F2016%2F05%2FNew-Construction-Homes.jpg&w=1920&q=75",
        contributed_amount: 100,
        _id: "2",
        name: "Hotel Stay",
        amount: 1000000,
      },
    ],
    currency: "USD",
    category: "Vacation",
    itemsEnabled: true,
    isArchived: true,
  },
];
