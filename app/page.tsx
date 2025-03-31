"use client";

import React, { useState } from "react";
import NavBar from "./LandingPageNavBar";
import "./LandingPage.css";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  // const functionsKey = process.env.NEXT_PUBLIC_FUNCTIONS_KEY ?? '';
  const handleSubscribe = async () => {
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch(
        "",
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
        <div id="box1"></div>
        <div id="box2">
          <div id="text">
            Luxe <br /> Meadow
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