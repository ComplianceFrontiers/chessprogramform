"use client";
import React, { useState } from 'react';
import './subscribe.scss';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Please enter a valid email.');
      return;
    }

    try {
      const response = await fetch('https://backend-chess-tau.vercel.app/signup_bulk_email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, subscriber: true }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || 'Subscription successful!');
        setIsSubscribed(true);  // Set to subscribed
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'An error occurred.');
      }
    } catch (error) {
      setMessage('Failed to subscribe. Please try again.');
    }
  };

  const handleUnsubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubscribed(false);
    setMessage('You have unsubscribed.');
  };

  return (
    <div className="subscribe-container">
      <h2>Subscribe to Chess Champs</h2>
      <form onSubmit={isSubscribed ? handleUnsubscribe : handleSubscribe}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubscribed} // Disable input if already subscribed
        />
        <button type="submit">{isSubscribed ? 'Unsubscribe' : 'Subscribe'}</button>
      </form>
      {message && <p className={message.includes('successful') ? '' : 'error'}>{message}</p>}
    </div>
  );
};

export default Subscribe;
