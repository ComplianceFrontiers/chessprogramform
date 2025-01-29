/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import "./unsubscribe.scss";

const Unsubscribe = () => {
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [email_requestChecked, setemail_requestChecked] = useState(false);
  const [message, setMessage] = useState("");
  const [fetchLoading, setFetchLoading] = useState(false); // For fetch button
  const [unsubscribeLoading, setUnsubscribeLoading] = useState(false); // For unsubscribe button
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleFetchUserData = async () => {
    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    setFetchLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `https://backend-chess-tau.vercel.app/get_masterlist_by_email?email=${email}`
      );
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setemail_requestChecked(!data.email_request); // Reverse logic
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "No record found for this email.");
      }
    } catch (error) {
      setMessage("Failed to fetch data. Please try again.");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    if (!email || !userData) {
      setMessage("Please enter a valid email and fetch the data.");
      return;
    }

    setUnsubscribeLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "https://backend-chess-tau.vercel.app/update_masterlist_by_email",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            email_request: email_requestChecked ? false : userData.email_request,
          }),
        }
      );

      if (response.ok) {
        setIsModalOpen(true); // Open the modal on success
        setMessage("");
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "Failed to save changes.");
      }
    } catch (error) {
      setMessage("Failed to save changes. Please try again.");
    } finally {
      setUnsubscribeLoading(false);
    }
  };

  return (
    <div className="unsubscribe-container">
      <div className="header">
        <img src="/images/chessproo.png" alt="Logo" className="logo" />
        <h2 className="unsubscribe-title">Unsubscribe</h2>
        <p className="farewell-message">We Were Sorry To See You Go</p>
      </div>

      <div className="email-section">
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          required
        />
        <button onClick={handleFetchUserData} disabled={fetchLoading}>
          {fetchLoading ? "Fetching Data..." : "Fetch Subscription Data"}
        </button>
      </div>

      {userData && (
        <div className="subscription-section">
          {userData.email_request && (
            <>
              <p>If you want to unsubscribe, check the box below:</p>
              <label>
                <input
                  type="checkbox"
                  checked={email_requestChecked}
                  onChange={() => setemail_requestChecked(!email_requestChecked)}
                />
                Unsubscribe from Chess Champs
              </label>
            </>
          )}
          {!userData.email_request && (
            <label>You Have Not Subscribed To Our Services</label>
          )}
          {userData.email_request && (
            <button onClick={handleSaveChanges} disabled={unsubscribeLoading}>
              {unsubscribeLoading ? "Un-Subscribing..." : "Un-Subscribe"}
            </button>
          )}
        </div>
      )}

      {message && <p className="message">{message}</p>}

      {/* Custom Modal */}
      {isModalOpen && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <h2>Unsubscribed Successfully</h2>
            <p>You have been successfully unsubscribed from our service.</p>
            <button onClick={() => setIsModalOpen(false)}>Ok</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Unsubscribe;
