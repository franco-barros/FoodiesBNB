"use client";

import React from "react";
import { Profile } from "../../components/profile";

const ProfilePage: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Profile
        name="Franco Barros"
        email="franco.barros@example.com"
        avatarUrl="/images/comida1.png" // Asegurate que la imagen exista en /public/images/
        bio="Apasionado desarrollador fullstack, amante de la comida y la tecnología."
      />
    </main>
  );
};

export default ProfilePage;
