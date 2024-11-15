/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from 'react';
import './unsubscribe.scss';

const Unsubscribe = () => {
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState<any>(null); // To store user data fetched from the API
  const [appChecked, setAppChecked] = useState(false);
  const [tournamentChecked, setTournamentChecked] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleFetchUserData = async () => {
    if (!email) {
      setMessage('Please enter a valid email.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`https://backend-chess-tau.vercel.app/get_forms_byemail?email=${email}`);
      if (response.ok) {
        const data = await response.json();
        setUserData(data);

        // Set checkbox status based on the user data
        setAppChecked(data.app || false);
        setTournamentChecked(data.tournament || false);
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'No record found for this email.');
      }
    } catch (error) {
      setMessage('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    if (!email || !userData) {
      setMessage('Please enter a valid email and fetch the data.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('https://backend-chess-tau.vercel.app/signup_bulk_email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name:userData.name,
          phone: userData.phone,  // Pass the phone number from the fetched data
          app: appChecked,
          tournament: tournamentChecked,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || 'Changes saved successfully.');
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'Failed to save changes.');
      }
    } catch (error) {
      setMessage('Failed to save changes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="unsubscribe-container">
      <h2>Unsubscribe</h2>
      
      <div className="email-section">
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          required
        />
        <button onClick={handleFetchUserData} disabled={loading}>
          {loading ? 'Fetching Data...' : 'Fetch Subscription Data'}
        </button>
      </div>

      {userData && (
        <div className="subscription-section">
          <p>If you want to unsubscribe, uncheck the boxes below:</p>

          <label>
            <input
              type="checkbox"
              checked={appChecked}
              onChange={() => setAppChecked(!appChecked)}
            />
            Subscribe to App Notifications
          </label>

          <label>
            <input
              type="checkbox"
              checked={tournamentChecked}
              onChange={() => setTournamentChecked(!tournamentChecked)}
            />
            Subscribe to Tournament Updates
          </label>

          <button onClick={handleSaveChanges} disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Unsubscribe;
