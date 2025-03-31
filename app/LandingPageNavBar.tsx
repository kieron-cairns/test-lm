import React from "react";
import Link from "next/link";
import "./LandingNavBar.css"

const LandingNavBar = () => (
  <nav className="flex items-center justify-between py-6 px-10 bg-white">
    <h1 className="nav-heading">Luxe Meadow</h1>
    <div className="buttons">
    <Link href="/shop" className="button-link">
      Shop
    </Link>
    <Link href="/about" className="button-link">
      About
    </Link>
  </div>
  </nav>
);

export default LandingNavBar;