
import Image from "next/image";
import Link from "next/link";

import { Reply } from "lucide-react";

const DonationList = () => {
  const donations = [
    {
      id: 1,
      image: "/gallery/gallery-1.png",
      category: "FOOD",
      progress: 43.36,
      backgroundColor: "bg-emerald-600", 
      title:
        "Together we can end hunger — Donate today and make a long lasting impacts in lives of people and communities!",
      description:
        "Your contribution can help fill empty plates and hearts. By donating, you support families and people in desperate need, ensuring everyone has access to nutritious meals and a brighter future.",
      totalAmt: "20, 000, 000 Francs<",
      raisedAmt: "8, 650, 000 Francs",
      donationSlug: "/donation-details-1",
    },
    {
      id: 2,
      image: "/gallery/gallery-2.png",
      category: "EDUCATION",
      progress: 20.77,
      backgroundColor: "bg-emerald-600",
      title:
        "Empower minds, change futures — Your donation can provide education and hope to children in need!",
      description:
        "Support our mission to provide quality education for underprivileged children. Your generous donations help fund school supplies, scholarships, & resources, ensuring every child has the opportunity to learn and thrive.",
      totalAmt: "$750, 000",
      donationSlug: "/donation-details-2",
      raisedAmt: "$155, 750",
      donationSlug: "/donation-details-2",
    },
    {
      id: 3,
      image: "/gallery/gallery-3.png",
      category: "MEDICAL",
      progress: 68,
      backgroundColor: "bg-emerald-600",
      title:
        "Heal lives, restore hope — Your donation can provide essential medical care to those in need!",
      description:
        " Join our mission to provide vital medical assistance to under-served communities. Your generous donations help fund treatments, medications, and healthcare services, ensuring everyone has access to the care they deserve.",
      totalAmt: "$3, 000, 000",
      raisedAmt: "$2, 050, 284",
      donationSlug: "/donation-details-3",
    },
    {
      id: 4,
      image: "/gallery/donationList-2.png",
      category: "WATER",
      progress: 55,
      backgroundColor: "bg-emerald-600",
      title:
        "Quench thirst, transform lives—your donation can provide clean water to communities in need!",
      description:
        "Help us bring clean, safe drinking water to those who lack access. Your generous donations support water projects, ensuring healthier communities and a brighter future for families everywhere",
      totalAmt: "$55, 000",
      raisedAmt: "$40, 090",
      donationSlug: "/donation-details-4",
    },
    {
      id: 5,
      image: "/gallery/donateList-1.png",
      category: "HOMELESS",
      progress: 55,
      backgroundColor: "bg-emerald-600",
      title:
        "Give hope, change lives—your donation can provide shelter and support for the homeless today!",
      description:
        "Join our mission to help the homeless find stability and support. Your generous donations provide essential services, shelter, and resources, empowering individuals to rebuild their lives and regain dignity.",
      totalAmt: "$312, 000",
      raisedAmt: "$63, 100",
      donationSlug: "/donation-details-5",
    },
    {
      id: 6,
      image: "/gallery/gallery-4.png",
      category: "EXTREME CASES",
      progress: 72.89,
      backgroundColor: "bg-emerald-600",
      title:
        "Act now, save lives—your donation can support those facing extreme hardships and urgent needs!",
      description:
        "Help us provide immediate assistance to individuals in extreme situations. Your generous donations fund critical resources, emergency aid, and support services, ensuring that no one faces their struggles alone.",
      totalAmt: "$10, 000, 000",
      raisedAmt: "$782, 000",
      donationSlug: "/donation-details-6",
    },
  ];

  return (
    <section className="my-16 pt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {donations.map((donation) => (
            <div
              key={donation.id}
              className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative">
                <Link href={donation.donationSlug}>
                  <div className="aspect-w-16 aspect-h-10 relative">
                    <Image
                      src={donation.image}
                      alt="Donation campaign"
                      className="w-full object-cover"
                      width={400}
                      height={250}
                      layout="responsive"
                    />
                  </div>
                </Link>
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-md text-white"
                  style={{ backgroundColor: "#00856F" }}
                >
                  <p className="text-sm font-medium">{donation.category}</p>
                </div>
                <div className="absolute bottom-0 right-0 bg-yellow-400 text-black font-bold px-3 py-1">
                  {donation.progress}%
                </div>
              </div>

              <div className="flex-1 p-5 leading-8 ">
                <h3 className="text-xl font-bold mb-4">
                  <Link
                    href={donation.donationSlug}
                    className="text-gray-800 hover:text-emerald-600"
                  >
                    {donation.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">{donation.description}</p>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${donation.progress}%`,
                      backgroundColor: "#00856F",
                    }}
                  ></div>
                </div>

                <div className="flex justify-between items-center mb-5">
                  <div className="flex gap-5">
                    <div>
                      <p className="text-gray-700 font-medium">
                        {donation.totalAmt}
                      </p>
                      <h4 className="text-sm text-gray-600">Goals</h4>
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium">
                        {donation.raisedAmt}
                      </p>
                      <h4 className="text-sm text-gray-600">Raised</h4>
                    </div>
                  </div>
                  <button className="text-gray-500 rounded-full border border-gray-300 p-2 hover:bg-gray-100">
                    <Reply size={18} />
                  </button>
                </div>

                <Link
                  href="/donate-payment"
                  className="block w-full py-3 px-4 text-center rounded-md font-medium text-white transition duration-300 hover:bg-emerald-700 hover:opacity-90 ease-in-out"
                  style={{ backgroundColor: "#00856F" }}
                >
                  Donate Now ➡️
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonationList;
