import {
  Gift,
  Users,
  CreditCard,
  Bell,
  Share2,
  Zap,
  Smile,
  Lock,
} from "lucide-react";

// const features = [
//   {
//     icon: Gift,
//     title: "Customizable Wishlists",
//     description:
//       "Create detailed wishlists for any occasion, from birthdays to holidays like christmas.",
//   },
//   {
//     icon: Users,
//     title: "Group Gifting",
//     description:
//       "Collaborate with friends and family to contribute towards larger gifts.",
//   },
//   {
//     icon: CreditCard,
//     title: "Secure Payments",
//     description:
//       "Safely contribute to wishlists with our secure payment system.",
//   },
//   {
//     icon: Bell,
//     title: "Real-time Notifications",
//     description: "Stay updated on contributions and messages from gift-givers.",
//   },
// ];

const features = [
  {
    icon: Gift,
    title: "Customizable Wishlists",
    description:
      "Create detailed wishlists for any occasion, from birthdays to holidays.",
  },
  {
    icon: Users,
    title: "Group Gifting",
    description:
      "Collaborate with friends and family to contribute towards larger gifts.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description:
      "Safely contribute to wishlists with our secure payment system.",
  },
  {
    icon: Bell,
    title: "Real-time Notifications",
    description: "Stay updated on contributions and messages from gift-givers.",
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description:
      "Share your wishlist across various social platforms with just a click.",
  },
  {
    icon: Lock,
    title: "Privacy Controls",
    description:
      "Manage who can view and contribute to your wishlists with flexible privacy settings.",
  },
  {
    icon: Zap,
    title: "Instant Updates",
    description: "See contributions and changes to your wishlist in real-time.",
  },
  {
    icon: Smile,
    title: "Gift Recommendations",
    description:
      "Get smart gift suggestions based on your interests and previous wishlists.",
  },
];

export default function Features() {
  return (
    <div className='py-12' id='features'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='lg:text-center'>
          <h2 className='text-base text-red-600 font-semibold tracking-wide uppercase'>
            Features
          </h2>
          <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
            A better way to give gifts
          </p>
          <p className='mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto'>
            GatherGift brings people together to make gift-giving a truly
            special experience.
          </p>
        </div>

        {/* <div className='mt-10'>
          <dl className='space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10'>
            {features.map((feature) => (
              <div
                key={feature.title}
                className='relative border rounded-md p-6'
              >
                <dt>
                  <div className='absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white'>
                    <feature.icon className='h-6 w-6' aria-hidden='true' />
                  </div>
                  <p className='ml-16 text-lg leading-6 font-medium text-gray-900'>
                    {feature.title}
                  </p>
                </dt>
                <dd className='mt-2 ml-16 text-base text-gray-500'>
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div> */}

        <div className='mt-12'>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
            {features.map((feature) => (
              <div key={feature.title} className='pt-6 text-center'>
                <div className='flow-root rounded-lg bg-white px-6 pb-8'>
                  <div className='-mt-6'>
                    <div className='flex justify-center items-center'>
                      <span className='rounded-md bg-red-500 p-3 shadow-lg'>
                        <feature.icon
                          className='h-6 w-6 text-white'
                          aria-hidden='true'
                        />
                      </span>
                    </div>
                    <h3 className='mt-8 text-lg font-medium text-gray-900 tracking-tight'>
                      {feature.title}
                    </h3>
                    <p className='mt-5 text-base text-gray-500'>
                      {feature.description}
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
}
