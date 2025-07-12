"use client";

import React, { useState, useEffect } from "react";
import { Greeting } from "../components/animatedgreeting";
import { Login } from "../components/login";

export default function Page() {
  const [showGreeting, setShowGreeting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, 3000); // 3 segundos

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showGreeting ? (
        <Greeting />
      ) : (
        <div>
          <Login />
        </div>
      )}
    </>
  );
}
