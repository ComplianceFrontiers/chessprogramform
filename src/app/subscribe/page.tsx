"use client";
import React, { useState } from 'react';
import './subscribe.scss';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [app, setApp] = useState(false);
  const [tournament, setTournament] = useState(false);
  const [message, setMessage] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !name || !phone) {
      setMessage('Please enter valid email, name, and phone.');
      return;
    }

    try {
      const response = await fetch('https://backend-chess-tau.vercel.app/signup_bulk_email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          name, 
          phone, 
          app, 
          tournament
        }),
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
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isSubscribed}
        />
        <input
          type="text"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          disabled={isSubscribed}
        />
        <label>
          <input
            type="checkbox"
            checked={app}
            onChange={(e) => setApp(e.target.checked)}
            disabled={isSubscribed}
          />
          App Subscription
        </label>
        <label>
          <input
            type="checkbox"
            checked={tournament}
            onChange={(e) => setTournament(e.target.checked)}
            disabled={isSubscribed}
          />
          Tournament Updates
        </label>
        <button type="submit" disabled={isSubscribed}>
          {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
        </button>
      </form>
      {message && <p className={message.includes('successful') ? '' : 'error'}>{message}</p>}
    </div>
  );
};

export default Subscribe;
