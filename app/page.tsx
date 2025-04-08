"use client";

import React, { useState, useEffect } from "react";
import NavBar from "./LandingPageNavBar";
import Image from "next/image";
import "./LandingPage.css";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [gifSrc, setGifSrc] = useState("");

  useEffect(() => {
    setIsClient(true);
    setGifSrc(`/images/Animated-Luxe-Meadow-White-Font_1@4x-No-Writing.gif?${Date.now()}`);
  }, []);

  const handleSubscribe = async () => {
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setHasSubmitted(true);

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

      if (response.ok) {
        setIsSuccess(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismissSuccess = () => {
    setIsSuccess(false); // Dismiss the success message
  };

  return (
    <div>
      <NavBar />
      <div id="main">
        <div id="box1">
          {isClient && (
            <Image
              src={gifSrc}
              alt="Luxe Meadow GIF"
              priority
              fill
              style={{ objectFit: "contain" }}
            />
          )}
        </div>

        <div id="box2">
          <div id="text">
            Luxe <br />
            <div id="box3">Meadow</div>
          </div>
        </div>

        <div id="shop-button-container">
          {!hasSubmitted && (
            <>
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
            </>
          )}

          {isLoading && (
            <div className="loader-container">
              <Image
                src="/images/loader.gif"
                alt="Loading..."
                width={50}
                height={50}
              />
            </div>
          )}

          {!isLoading && isSuccess && (
            <div className="success-box">
              <Image
                src="/images/Luxe-Meadow-Black-Font@4x.png"
                alt="Luxe Meadow"
                width={150}
                height={150}
                style={{ objectFit: "contain" }}
              />
              <p className="success-message">Thanks for subscribing!</p>
              <button className="dismiss-button" onClick={handleDismissSuccess}>
                Dismiss
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Styling for loader and success box */}
      <style jsx>{`
        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100px;
        }

        .success-box {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .success-message {
          font-size: 1.1rem;
          margin-top: 12px;
          color: #222;
        }

        .dismiss-button {
          margin-top: 12px;
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }

        .dismiss-button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
}