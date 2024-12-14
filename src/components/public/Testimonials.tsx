const testimonials = [
  {
    content:
      "GatherGift made my daughter's birthday so special. Everyone could contribute, and she got the bike she always wanted!",
    author: "Sarah M.",
    role: "Happy Parent",
    image: "https://api.dicebear.com/9.x/micah/svg?seed=Rykereqsdkkllpp",
  },
  {
    content:
      "As a college student, GatherGift helped me get the laptop I needed for my studies. My family and friends all chipped in!",
    author: "Alex K.",
    role: "Grateful Student",
    image: "https://api.dicebear.com/9.x/micah/svg?seed=Ryker",
  },
  {
    content:
      "Our wedding registry on GatherGift was a hit! It was so easy for guests to contribute, and we got everything we needed for our new home.",
    author: "Emma and John",
    role: "Newlyweds",
    image: "https://api.dicebear.com/9.x/micah/svg?seed=Rykerr",
  },
];

export default function Testimonials() {
  return (
    <section className='py-12 bg-white overflow-hidden md:py-20 lg:py-24'>
      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='relative'>
          <h2 className='text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
            Hear from our happy users
          </h2>
          <p className='mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500'>
            GatherGift has brought joy to countless people. Here&apos;s what
            they have to say:
          </p>
        </div>
        <div className='mt-20'>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8'>
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.author}
                className='bg-green-50 rounded-lg shadow-lg overflow-hidden'
              >
                <div className='p-8'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                      <img
                        className='h-12 w-12 rounded-full'
                        src={testimonial.image}
                        alt=''
                        width={48}
                        height={48}
                      />
                    </div>
                    <div className='ml-4'>
                      <div className='text-lg font-medium text-gray-900'>
                        {testimonial.author}
                      </div>
                      <div className='text-base font-medium text-red-600'>
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <div className='mt-4 text-base text-gray-500'>
                    &quot;{testimonial.content}&quot;
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
