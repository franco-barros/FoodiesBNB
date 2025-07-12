"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProfileProps {
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
}

const Profile: React.FC<ProfileProps> = ({ name, email, avatarUrl, bio }) => {
  return (
    <motion.section
      className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {avatarUrl ? (
        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
          <Image
            src={avatarUrl}
            alt={`${name} avatar`}
            fill
            style={{ objectFit: "cover" }}
            loading="lazy"
            sizes="96px"
          />
        </div>
      ) : (
        <div className="w-24 h-24 rounded-full bg-gray-300 mb-4 flex items-center justify-center text-gray-600 text-3xl font-bold">
          {name.charAt(0).toUpperCase()}
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-1 text-red-600">{name}</h2>
      <p className="text-gray-600 mb-4">{email}</p>

      {bio && <p className="text-gray-700">{bio}</p>}
    </motion.section>
  );
};

export default Profile;
