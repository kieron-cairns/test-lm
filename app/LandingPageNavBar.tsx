import React, { useEffect, useRef } from "react";
import Link from "next/link";
import "./LandingNavBar.css";

const LandingNavBar = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null); // Specify the correct type for the ref

  useEffect(() => {
    const delay = 2000; // Delay in milliseconds (e.g., 2000ms = 2 seconds)

    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play(); // Now TypeScript knows videoRef.current is a video element
      }
    }, delay);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  return (
    <nav className="flex items-center justify-between py-9 px-10 bg-white">
      <div className="video-container">
        <video
          ref={videoRef}
          src="/Luxe-Meadow-Black-No-Writing-Animate-MP4.mp4"
          muted
          playsInline
          preload="auto"
          width={100}
          height={200}
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