import { ListTodo, Share2, GiftIcon } from "lucide-react";

const steps = [
  {
    icon: ListTodo,
    title: "Create Your Wishlist",
    description:
      "List your desired gifts and share your story on a dedicated page.",
  },
  {
    icon: Share2,
    title: "Share with Others",
    description:
      "Invite friends and family to view and contribute towards your wishes.",
  },
  {
    icon: GiftIcon,
    title: "Receive Your Gifts",
    description:
      "Watch as your wishes become reality through group contributions.",
  },
];

export default function HowItWorks() {
  return (
    <div className='py-12' id='how-it-works'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='lg:text-center'>
          <h2 className='text-base text-red-600 font-semibold tracking-wide uppercase'>
            How It Works
          </h2>
          <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
            Three simple steps to joy
          </p>
          <p className='mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto'>
            GatherGift makes it easy to create, share, and fulfill wishlists.
          </p>
        </div>

        <div className='mt-10'>
          <div className='space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10'>
            {steps.map((step, index) => (
              <div key={step.title} className='relative'>
                <div className='flex flex-col items-center text-center'>
                  <div className='flex items-center justify-center h-16 w-16 rounded-md bg-red-500 text-white text-2xl font-bold mb-4'>
                    {index + 1}
                  </div>
                  <step.icon
                    className='h-8 w-8 text-green-600 mb-4'
                    aria-hidden='true'
                  />
                  <h3 className='text-lg leading-6 font-medium text-gray-900 mb-2'>
                    {step.title}
                  </h3>
                  <p className='text-base text-gray-500'>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
