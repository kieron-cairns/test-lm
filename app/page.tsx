"use client";

import React, { useState, useEffect } from "react";
import NavBar from "./LandingPageNavBar";
import "./LandingPage.css";

export default function LandingPage() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const video = document.getElementById("box1") as HTMLVideoElement | null; // ✅ Explicitly cast as HTMLVideoElement

    if (video) {
      video.removeAttribute("controls"); // ✅ Removes controls to prevent play button
      video.muted = true; // ✅ Ensures muted (required for autoplay)

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => console.log("Autoplay successful"))
          .catch(() => {
            console.log("Autoplay blocked, retrying...");
            video.play();
          });
      }
    }
  }, []);

  const handleSubscribe = async () => {
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch(
        "https://fnlmwelcomemailsender.azurewebsites.net/api/contacts/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-functions-key": process.env.NEXT_PUBLIC_FUNCTIONS_KEY || "fallback-key",
          },
          body: JSON.stringify({ email }),
        }
      );

      const responseText = await response.text();
      console.log("Raw response:", responseText);

      if (response.ok) {
        alert("Subscription successful!");
        setEmail("");
      } else {
        let errorMessage = "Failed to subscribe.";
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = `Unexpected response: ${responseText}`;
        }
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Subscription error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <NavBar />
      <div id="main">
        <video id="box1" autoPlay loop muted playsInline>
          <source src="/images/Animated-Luxe-Meadow-White-Font_1@4x-No-Writing.mp4" type="video/mp4" />
          <div id="fallback-box1"></div>
        </video>

        <div id="box2">
          <div id="text">
            Luxe <br />
            <div id="box3">Meadow</div>
          </div>
        </div>

        <div id="shop-button-container">
          <input
            className="shop-input"
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ color: "black" }}
          />
          <button className="shop-button" onClick={handleSubscribe}>
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}