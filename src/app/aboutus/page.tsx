"use client";

import React from "react";
import { AboutUs } from "../../components/aboutus";

const AboutPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
      <AboutUs />
    </main>
  );
};

export default AboutPage;
