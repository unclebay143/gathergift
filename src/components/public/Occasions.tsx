import React from "react";

import {
  Gift,
  Cake,
  BellRingIcon as Ring,
  GraduationCapIcon as Graduation,
  Baby,
} from "lucide-react";

const giftTypes = [
  {
    icon: Cake,
    title: "Birthday Gifts",
    description:
      "Create a wishlist for your special day and let friends and family contribute to make it unforgettable.",
  },
  {
    icon: Ring,
    title: "Wedding Gifts",
    description:
      "Build your dream wedding registry and allow loved ones to contribute to your new life together.",
  },
  {
    icon: Graduation,
    title: "Graduation Gifts",
    description:
      "Celebrate academic achievements with a wishlist that helps kickstart the next chapter in life.",
  },
  {
    icon: Baby,
    title: "Baby Shower Gifts",
    description:
      "Prepare for your little one's arrival by creating a wishlist of essential items and meaningful gifts.",
  },
];

export const Occasions = () => {
  return (
    <div className='relative py-16 sm:py-24 lg:py-32'>
      <div className='mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='text-base font-semibold uppercase tracking-wider text-red-600'>
          Celebrate Every Occasion
        </h2>
        <p className='mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl'>
          Perfect for Any Gift-Giving Moment
        </p>
        <p className='mx-auto mt-5 max-w-prose text-xl text-gray-500'>
          GatherGift makes it easy to create and manage wishlists for all of
          life's special moments.
        </p>
        <div className='mt-12'>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
            {giftTypes.map((giftType) => (
              <div key={giftType.title} className='pt-6'>
                <div className='flow-root rounded-lg bg-white px-6 pb-8'>
                  <div className='-mt-6'>
                    <div>
                      <span className='inline-flex items-center justify-center rounded-md bg-red-500 p-3 shadow-lg'>
                        <giftType.icon
                          className='h-6 w-6 text-white'
                          aria-hidden='true'
                        />
                      </span>
                    </div>
                    <h3 className='mt-8 text-lg font-medium text-gray-900 tracking-tight'>
                      {giftType.title}
                    </h3>
                    <p className='mt-5 text-base text-gray-500'>
                      {giftType.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
