"use client";

import React from "react";
import Image from "next/image";
import "./LandingNavBar.css";

const LandingNavBar = () => {
  return (
    <nav className="flex items-center justify-between py-9 px-10 bg-white">
      <div className="video-container">
        <Image
          src="/Luxe-Meadow-Black-No-Writing-Animated.gif"
          alt="Luxe Meadow Logo"
          width={100}
          height={100}
          priority
          style={{ objectFit: "contain" }}
        />
      </div>

      <h1 className="nav-heading">Luxe Meadow</h1>

      <div className="buttons">
        {/* <Link href="/about" className="button-link">
          About
        </Link> */}
      </div>
    </nav>
  );
};

export default LandingNavBar;