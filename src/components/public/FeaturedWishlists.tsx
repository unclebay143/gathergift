import { WishCard } from "../WishCard";

export const featuredWishlists = [
  {
    id: "1",
    name: "John's Birthday Bonanza",
    description: "Help John celebrate his",
    progress: 75,
    amount: 45000,
    currency: "$",
    image:
      "https://th.bing.com/th/id/R.f75acc02108ae48f5d83cb0937396756?rik=h2U2ft6aLlgP%2bQ&riu=http%3a%2f%2fbeststandupmixersforbaking.com%2fwp-content%2fuploads%2f2020%2f08%2fSpecial-Birthday-Cakes-1.jpg&ehk=UmV%2fN%2fPhoBDrjOhH3NGNKmUWq%2fkTFjebr1Q0%2fes0rzU%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: "2",
    name: "Emma's Dream Vacation",
    description: "Contribute to Emma's dream of a once-in-a-lifetime getaway.",
    progress: 50,
    image:
      "https://www.horizonfcu.org/site_content/site_assets/images/vacation.jpg",
    amount: 5000,
    currency: "$",
  },
  {
    id: "3",
    name: "Family Johnson's New Home",
    description:
      "Support the Johnson family as they settle into their beautiful new home.",
    progress: 30,
    amount: 1000,
    currency: "$",
    image:
      "https://riverfrontestates.ca/wp-content/uploads/2016/05/New-Construction-Homes.jpg",
  },
  {
    id: "4",
    name: "Sarah's Graduation Celebration",
    description:
      "Make Sarah's graduation memorable with meaningful contributions.",
    progress: 60,
    amount: 5000,
    currency: "$",
    image:
      "https://th.bing.com/th/id/OIP.gsmjak3N_nQkK-IkI6Ro_QHaE8?rs=1&pid=ImgDetMain",
  },
  {
    id: "5",
    name: "Mike's Tech Gadget Wishlist",
    description:
      "Help Mike upgrade his tech collection with the latest gadgets.",
    progress: 40,
    amount: 5000000,
    currency: "#",
    image:
      "https://th.bing.com/th/id/R.1042e9ead940740a5adb1502ec2dac6d?rik=jFp8ooaQOWE7xg&pid=ImgRaw&r=0",
  },
  {
    id: "6",
    name: "Lisa's Wedding Registry",
    description:
      "Join Lisa in celebrating her special day with curated wedding gifts.",
    progress: 80,
    amount: 5000000,
    currency: "#",
    image:
      "https://th.bing.com/th/id/R.bf291f7eb119568717ddbeffff829f91?rik=P0FobOMV4pD83g&pid=ImgRaw&r=0",
  },
];

export default function FeaturedWishlists() {
  return (
    <div className='flex flex-wrap justify-center gap-6 max-w-7xl mx-auto lg:justify-start'>
      {featuredWishlists.map((wishlist) => (
        <WishCard data={wishlist} key={wishlist.id} />
      ))}
    </div>
  );
}
