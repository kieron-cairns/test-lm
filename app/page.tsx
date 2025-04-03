"use client";

import React, { useState, useEffect } from "react";
import NavBar from "./LandingPageNavBar";
import Image from "next/image";
import "./LandingPage.css";

// Declare BatteryManager if not already present
interface BatteryManager {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
  addEventListener: (event: string, callback: EventListener) => void;
  removeEventListener: (event: string, callback: EventListener) => void;
}

// Define a custom type for Navigator that includes the getBattery method
interface BatteryNavigator extends Navigator {
  getBattery?: () => Promise<BatteryManager>;
}

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);

  // Detecting if the device is in Low Power Mode
  useEffect(() => {
    const checkBatteryStatus = async () => {
      // Cast navigator to our custom type
      const batteryNavigator = navigator as BatteryNavigator;
      
      // Check if the getBattery method exists
      if (batteryNavigator.getBattery) {
        const battery = await batteryNavigator.getBattery();
        setIsLowPowerMode(battery.level <= 0.2 || battery.charging === false);
      }
    };

    checkBatteryStatus();

    // Optional: Listen for changes in battery status (if the browser supports it)
    const batteryListener = async () => {
      const batteryNavigator = navigator as BatteryNavigator;
      if (batteryNavigator.getBattery) {
        const battery = await batteryNavigator.getBattery();
        setIsLowPowerMode(battery.level <= 0.2 || battery.charging === false);
      }
    };

    window.addEventListener("batterychange", batteryListener);

    return () => {
      window.removeEventListener("batterychange", batteryListener);
    };
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

      const responseText = await response.text(); // Read response as text
      console.log("Raw response:", responseText);

      if (response.ok) {
        alert("Subscription successful!");
        setEmail("");
      } else {
        let errorMessage = "Failed to subscribe.";
        try {
          const errorData = JSON.parse(responseText); // Try parsing JSON
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
        {isLowPowerMode ? (
          <Image
            id="box1"
            src="/images/Animated-Luxe-Meadow-White-Font_1@4x-No-Writing.gif"
            alt="Luxe Meadow GIF"
            width={600} // Provide appropriate width and height
            height={400}
            priority
          />
        ) : (
          <video id="box1" autoPlay muted playsInline>
            <source
              src="/images/Animated-Luxe-Meadow-White-Font_1@4x-No-Writing.mp4"
              type="video/mp4"
            />
            <div id="fallback-box1"></div>
          </video>
        )}
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