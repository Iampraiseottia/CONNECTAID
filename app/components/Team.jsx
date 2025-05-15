import TeamMember from "../components/TeamMember";

import { motion } from "motion/react";

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "OTTIA PRAISE BETECK",
      position: "CEO & President",
      image: "/team/cute.jpg",
      socialLink: "https://www.linkedin.com/in/ottia-praise",
    },
    {
      id: 2,
      name: "NKUM STANCO",
      position: "Resource Manager",
      image: "/team/team-2.png",
      socialLink: "https://www.linkedin.com/in/ottia-praise",
    },
    {
      id: 3,
      name: "AJONG CALEB",
      position: "Head Of Medical Campaigns",
      image: "/team/team-3.png",
      socialLink: "https://www.linkedin.com/in/ottia-praise", 
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="text-emerald-600 font-semibold block mb-2 text-3xl ">
            Expert Team
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 py-2 dark:text-gray-800">
            Meet our amazing team
          </h2>
        </motion.div>

        {/* Team Members Grid */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap -mx-4"
        >
          {teamMembers.map((member) => (
            <TeamMember
              key={member.id}
              name={member.name}
              position={member.position}
              image={member.image}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
