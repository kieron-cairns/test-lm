import React, { useEffect, useRef } from "react";
import "./LandingNavBar.css";

const LandingNavBar: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null); // ✅ Correct TypeScript typing

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.removeAttribute("controls"); // ✅ Removes controls
      video.muted = true; // ✅ Ensures muted (required for autoplay)

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => console.log("Navbar video autoplay successful"))
          .catch(() => {
            console.log("Navbar video autoplay blocked, retrying...");
            video.play();
          });
      }
    }
  }, []);

  return (
    <nav className="flex items-center justify-between py-9 px-10 bg-white">
      <div className="video-container">
        <video
          ref={videoRef}
          src="/Luxe-Meadow-Black-No-Writing-Animate-MP4.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          width={100}
          height={200}
        />
      </div>

      <h1 className="nav-heading">Luxe Meadow</h1>

      <div className="buttons">
        {/* Add navigation links here if needed */}
      </div>
    </nav>
  );
};

export default LandingNavBar;